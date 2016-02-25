#!/bin/bash
 
function tools.create.nginx.service {

TODO=.todo
HELP=.help

function check_requirements {
	if [ ! -f /etc/debian_version ]; then
		quit 1 "This script is for debian"
	fi
	WHO=$(whoami)
	if [ ! $WHO == "root" ]; then
		quit 1 "This script must be run as root"
	fi
}

function indic {
	if [ ! -z "$1" ]; then
		echo
		echo -e "\e[34m"$1"\e[0m"
	fi
}

function tell {
	if [ ! -z "$1" ]; then
		echo -e "\e[33m"$1"\e[0m"
	fi
}

function confirm {
	if [ -z $AUTOMODE ]; then
		read -r -e -p $'\e[1m\e[31mContinue?\e[0m '
		if [[ ! $REPLY =~ ^[Yy]$ ]] && [ ! -z $REPLY ]
		then
		    quit 1
		fi
	fi
}

function ask {
	if [ -z $AUTOMODE ]; then
		DONE=false
		if [ ! -z "$2" ]; then
			OPT=" -i $2"
		else
			OPT=""
		fi
		until $DONE; do
		read -r -e -p "$1 
"$OPT 
		if [ ! -z "$REPLY" ]; then
			DONE=true
		fi
		done
	else
		if [ -z "$2" ]; then
			tell "The question below cant be answered : "
			tell "$1"
			exit 1;
		fi

		if [ "$2" == "0" ]; then
			REPLY="no"
		else
			REPLY=$2
		fi 

	fi
}


function quit {
	indic "$2"
	exit "$1"
}

if [ ! -z $1 ] && [ $1 == '-h' ]; then
	echo ""
	cat $HELP
	echo ""
	exit 0;
fi

if [ ! -z $1 ] && [ $1 == '-t' ]; then
	echo ""
	cat $TODO
	echo ""
	exit 0;
fi

if [ ! -z $1 ] && [ $1 == '-a' ]; then
	AUTOMODE=true
fi

if [ ! -z $1 ] && [ ! $1 == '-a' ]; then
	tell "Re-run with -a"
	exit 1;
fi

check_requirements
indic "Nginx (Web server) -- Website installation"

CURRENT_DIR=$(pwd)
TEMPLATE_DIR=$CURRENT_DIR/templates
SCRIPT_DIR=$CURRENT_DIR/scripts
FRAGMENTS_DIR=$TEMPLATE_DIR/fragments

if [ ! -d $TEMPLATE_DIR ]; then
	indic "Incomplete package (templates directory is missing)."
	indic "Abort."
	exit 1;
fi

NGINX_ALL_VHOSTS='/etc/nginx/sites-available'
NGINX_ENABLED_VHOSTS='/etc/nginx/sites-enabled'
NGINX_SSLPATH=/etc/nginx/ssl
NGINX_USER='www-data'
SED=`which sed`
NGINX=`which nginx`
INFOFILE=apps.info

REQUIRED_PACKAGE="nginx-full openssl"
#grep 
apt-get install -y $REQUIRED_PACKAGE 

ask "What is the domain name of your service? (toto.com, abcd.org, etc.)" "$2"
DOM=$(echo $REPLY | awk '{print tolower($0)}')

tell "Is the domain valid? -- $DOM"
PATTERN="^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$";
if [[ $DOM =~ $PATTERN ]]; then
	DOMAIN=`echo $DOM | tr '[A-Z]' '[a-z]'`
	tell "Yes!"
else
	quit 1 "Invalid domain name"
fi
SERVER_NAME="www.$DOMAIN $DOMAIN"

ask "Specify the directory where you want your files to be located (if the directory does not exist it will be created)" "$3"
DATA_SRC=$(readlink -f "$REPLY")
until [ ! $(echo $DATA_SRC | grep -P "^/root") ]; do
	tell "Directory can NOT be located in root directory."
	ask "Specify the directory where your files are located (if you have no files yet, specify any repository you like)"
	DATA_SRC=$(readlink -f "$REPLY")
done

#Check directory src for new domain
if [ ! -d "$DATA_SRC" ]; then
  tell "New directory -- Creating"
  mkdir -p $DATA_SRC
  # load the template index.html file
  tell "We are feeding the new directory with a temporary html page"
  cp $TEMPLATE_DIR/index.html.template $DATA_SRC/index.html
  $SED -i "s/SITE/$DOMAIN/g" $DATA_SRC/index.html
  $SED -i "s#LOCATION#$DATA_SRC#g" $DATA_SRC/index.html
  MESSAGE="Directory $DATA_SRC has been created for $DOMAIN"
else
  MESSAGE="Found directory $DATA_SRC for $DOMAIN"
fi

tell "$MESSAGE"

ask "Which user account will own theses files? (You can specify a new user account that will be created on the fly)" "$4"
USERNAME=$REPLY

UEXIST=`getent passwd | grep -c ^$USERNAME:`
if [ "$UEXIST" -eq 0 ]; then
	tell "User does not exist -- Creating"
	ask "New UNIX Password for $USERNAME: " "${11}"
	RAWPASSWORD=$REPLY
	SALT=`mkpasswd.pl` &&
	PASSWORD=`openssl passwd -1 -salt $SALT $RAWPASSWORD`
	useradd -p $PASSWORD $USERNAME
else
	tell "User account has been found"
	RAWPASSWORD="-- unchanged --"
	SALT="-- unchanged --"
fi

ask "Should your service being sslsecure (encrypted using TLS via OpenSSL), unsecure (stay unencrypted) or both? (sslsecure, unsecure or both)" "$5"
until [ "$REPLY" == 'sslsecure' ] || [ "$REPLY" == 'unsecure' ] || [ "$REPLY" == 'both' ]; do
	if [ ! -z $AUTOMODE ]; then
		exit 1;
	fi
	ask "Should your service being sslsecure (encrypted using TLS via OpenSSL), unsecure (stay unencrypted) or both? (sslsecure, unsecure or both)" 
done
SECURE=$REPLY

if [ "$SECURE" == 'unsecure' ] || [ "$SECURE" == 'both' ]; then
	ask "Which port number should hold your unsecure service? (80, 443, [8000-10000])" "$6"
	PORT_IS_USED=$(nmap localhost -p$REPLY 2>&1 | grep -P "open|QUITTING" )
	until [ -z "$PORT_IS_USED" ] && (([ "$REPLY" -lt "10001" ] && [ "$REPLY" -gt "7999" ]) || ([ "$REPLY" -eq 80 ] || [ "$REPLY" -eq "443" ])); do
		
		if [ ! -z $AUTOMODE ]; then
			exit 1;
		fi

		tell "Sorry, but this port is unavailable on this host."
		ask "Which port number should hold your unsecure service? (80, 443, [8000-10000])"
		PORT_IS_USED=$(nmap localhost -p$REPLY 2>&1 | grep -P "open|QUITTING" )
	done
	PORT="$REPLY"
fi

if [ "$SECURE" == 'sslsecure' ] || [ "$SECURE" == 'both' ]; then
	ask "Which port number should hold your SSL Secure service? (80, 443, [8000-10000])" "$7"
	PORT_IS_USED=$(nmap localhost -p$REPLY 2>&1 | grep -P "open|QUITTING" )
	until [ -z "$PORT_IS_USED" ] && (([ "$REPLY" -lt "10001" ] && [ "$REPLY" -gt "7999" ]) || ([ "$REPLY" -eq 80 ] || [ "$REPLY" -eq "443" ])); do
		
		if [ ! -z $AUTOMODE ]; then
			exit 1;
		fi
	
		tell "Sorry, but this port is unavailable on this host."
		ask "Which port number should hold your SSL Secure service? (80, 443, [8000-10000])"
		PORT_IS_USED=$(nmap localhost -p$REPLY 2>&1 | grep -P "open|QUITTING" )
	done
	SSLPORT="$REPLY"
fi

if [ "$SECURE" == 'both' ]; then
	ask "Do you want to force the usage of SSL, what means that every request on insecure port will lead to SSL port (yes or no)" "$8"

	until [ "$REPLY" == 'yes' ] || [ "$REPLY" == 'no' ]; do
		if [ ! -z $AUTOMODE ]; then
			exit 1;
		fi
		ask "Do you want to force the usage of SSL, what means that every request on insecure port will lead to SSL port (yes or no)"
	done
	if [ $REPLY == 'yes' ]; then
		FORCESSL=true
	fi
fi

ask "Will you use PHP? (yes or no)" "$9"
until [ "$REPLY" == 'yes' ] || [ "$REPLY" == 'no' ]; do
	if [ ! -z $AUTOMODE ]; then
		exit 1;
	fi
	ask "Will you use PHP? (yes or no)"
done
if [ "$REPLY" == 'yes' ]; then
	PHP=true
  	tell "We are feeding the source directory with phpinfo.php"
	echo "<?php phpinfo(); ?>" > $DATA_SRC/phpinfo.php 
fi

ask "What will be the file that will handle the requests for $DOMAIN? (index.html, index.php, whatever.py, etc.)" "${10}"
if [[ ! "$REPLY" =~ "index.html" ]]; then
	INDEX="$REPLY index.html"
else
	INDEX="$REPLY"
fi

tell "Thank you, we have the necessary information"

tell "Building the metadata folder"
META=$DATA_SRC/.meta
if [ ! -d $META ]; then
	tell "We are building a hidden folder in your directory source that will contain 2 scripts and a log file : install.sh (if you need to install elsewhere or reinstall your service), uninstall.sh (to properly deinstall and deactivate everything) and apps.info (to track your application installation history)"
	mkdir $META
	tell "Directory $META created"
else
	tell "We detected that this service has been installed before."
	tell "Directory $META preserved"
fi

if [ ! -z "$SSLPORT" ]; then
tell "Configuring OpenSSL"
	if [ -d "$META/ssl" ]; then

		if [ ! -f "$META/ssl/server.csr" ] || [ ! -f "$META/ssl/server.key.org" ] || [ ! -f "$META/ssl/server.key" ] || [ ! -f "$META/ssl/server.crt" ]; then
			tell "The OpenSSL keys located in $META/ssl folder and used by the previous installation has been damaged. Since we can't reuse theses keys, we will destroy it and regenerate a new keyring."
			confirm
			if [ -f "$META/ssl/server.key" ]; then
			    rm -f  $META/ssl/server.key
			fi
			if [ -f "$META/ssl/server.csr" ]; then
			    rm -f $META/ssl/server.csr
			fi
			if [ -f "$META/ssl/server.key.org" ]; then
			    rm -f $META/ssl/server.key.org
			fi
			if [ -f "$META/ssl/server.crt" ]; then
			    rm -f $META/ssl/server.crt
			fi
			tell "Done"
		else
			tell "For convenience, we will reuse the same OpenSSL key you used before. Theses keys are located in $META/ssl folder"
		fi
	else
		tell "Since you choose to securize your service, we are adding to the hidden folder a SSL directory that will contain the private key for $DOMAIN"
		mkdir $META/ssl
	fi

	if [ ! -f "$META/ssl/server.csr" ] || [ ! -f "$META/ssl/server.key.org" ] || [ ! -f "$META/ssl/server.key" ] || [ ! -f "$META/ssl/server.crt" ]; then

	  openssl genrsa -des3 -out $META/ssl/server.key.org 4096 &&
	  tell "A RSA private key using triple DES encryption has been generated (server.key.org)"

	  openssl rsa -in $META/ssl/server.key.org -out $META/ssl/server.key &&
	  tell "For convenience a version of the private key without passphrase is created (server.key)"

	  openssl req -new -key $META/ssl/server.key -out $META/ssl/server.csr &&
	  tell "A certificate request has been issued (server.csr)"

	  openssl x509 -req -days 365 -in $META/ssl/server.csr -signkey $META/ssl/server.key -out $META/ssl/server.crt
	  tell "A self signed root certificate has been issued (server.crt)"

	fi


	if [ ! -d "$NGINX_SSLPATH" ]; then
	    mkdir $NGINX_SSLPATH
	fi

	tell "OpenSSL is being configured with theses informations"
	if [ -d "$NGINX_SSLPATH/$DOMAIN" ] || [ -f "$NGINX_SSLPATH/$DOMAIN" ]; then
	    tell "A folder or a file name has to be modified : $NGINX_SSLPATH/$DOMAIN-auto-modified-on-$(date +%s)"
	    mv $NGINX_SSLPATH/$DOMAIN $NGINX_SSLPATH/$DOMAIN-auto-modified-on-$(date +%s)
	fi

	if [ -L "$NGINX_SSLPATH/$DOMAIN" ]; then
		if [ ! "$(readlink $NGINX_SSLPATH/$DOMAIN)" == $META/ssl ]; then
			tell "A link name has to be modified : $NGINX_SSLPATH/$DOMAIN-auto-modified-on-$(date +%s)"
	    		mv $NGINX_SSLPATH/$DOMAIN $NGINX_SSLPATH/$DOMAIN-auto-modified-on-$(date +%s)
		fi
	fi

	if [ ! -L "$NGINX_SSLPATH/$DOMAIN" ]; then
		tell "A link is created : $NGINX_SSLPATH/$DOMAIN"
		ln -s $META/ssl $NGINX_SSLPATH/$DOMAIN
	fi

	SSL_SERVERKEY_LOCATION=$NGINX_SSLPATH/$DOMAIN/server.key
	SSL_SIGNEDCERTIFICATE_LOCATION=$NGINX_SSLPATH/$DOMAIN/server.crt

fi

tell "Applying permissions"
CODE=750
chown -R $USERNAME:$NGINX_USER $DATA_SRC
chmod -R $CODE $DATA_SRC
tell "Permissions for directory $DATA_SRC have been set to $USERNAME:$NGINX_USER with $CODE permissions"

tell "Configuring system logs"
NGINX_ACCESSLOGS="/var/log/nginx/$DOMAIN.access.log"
NGINX_ERRORLOGS="/var/log/nginx/$DOMAIN.error.log"

tell "An entry for $DOMAIN has been added in /var/log/nginx/"
if [ -L $DATA_SRC/$DOMAIN.access.log ]; then
	ln -s /var/log/nginx/$DOMAIN.access.log $DATA_SRC/$DOMAIN.access.log
	ln -s /var/log/nginx/$DOMAIN.error.log $DATA_SRC/$DOMAIN.error.log
fi

indic "Virtual host initialization"

tell "Creating the Nginx configuration file for "$DOMAIN
CONFIG=$NGINX_ALL_VHOSTS/$DOMAIN.conf
touch $CONFIG

if [ -f $META/last-config ]; then
	mv $META/last-config $META/config-auto-modified-on-$(date +%s).conf
fi

if [ ! -z "$PORT" ]; then
	tell "Template preparation (unsecure part)"
	cp $TEMPLATE_DIR/html_host.template $META/.html_host.template
	TEMPLATE=$META/.html_host.template
	$SED -i "s/#SERVER_NAME;/server_name $SERVER_NAME;/g" $TEMPLATE
	$SED -i "s/#PORT;/listen $PORT;/g" $TEMPLATE

	if [ -z $FORCESSL ]; then
	$SED -i "s#\#ROOT;#root $DATA_SRC;#g" $TEMPLATE
	$SED -i "s/#INDEX;/index $INDEX;/g" $TEMPLATE
	$SED -i "s#\#ACCESS_LOGS;#access_log $NGINX_ACCESSLOGS;#g" $TEMPLATE
	$SED -i "s#\#ERROR_LOGS;#error_log $NGINX_ERRORLOGS;#g" $TEMPLATE
	else
	$SED -i 's#\#ROOT;#return 301 https://localhost:'$SSLPORT'$request_uri;#g' $TEMPLATE
	$SED -i "/#INDEX;/d" $TEMPLATE
	$SED -i "/#LOGS;/d" $TEMPLATE
	$SED -i "/#PHP;/d" $TEMPLATE
	fi	

	tell "Updating the Nginx configuration file for "$DOMAIN
	echo "" >> $META/last-config
	cat $TEMPLATE >> $META/last-config	
	rm -f $TEMPLATE

fi

if [ ! -z "$SSLPORT" ]; then

	tell "Template preparation (sslsecure part)"
	cp $TEMPLATE_DIR/ssl_host.template $META/.ssl_host.template
	TEMPLATE=$META/.ssl_host.template
	$SED -i "s/#SERVER_NAME;/server_name $SERVER_NAME;/g" $TEMPLATE
	$SED -i "s#\#ROOT;#root $DATA_SRC;#g" $TEMPLATE
	$SED -i "s/#PORT;/listen $SSLPORT ssl;/g" $TEMPLATE
	$SED -i "s/#INDEX;/index $INDEX;/g" $TEMPLATE
	$SED -i "s#\#ACCESS_LOGS;#access_log $NGINX_ACCESSLOGS;#g" $TEMPLATE
	$SED -i "s#\#ERROR_LOGS;#error_log $NGINX_ERRORLOGS;#g" $TEMPLATE
	$SED -i "s#\#SIGNED_CERTIFICATE;#ssl_certificate $SSL_SIGNEDCERTIFICATE_LOCATION;#g" $TEMPLATE
	$SED -i "s#\#SERVER_KEY;#ssl_certificate_key $SSL_SERVERKEY_LOCATION;#g" $TEMPLATE

	tell "Updating the Nginx configuration file for "$DOMAIN
	echo "" >> $META/last-config
	cat $TEMPLATE >> $META/last-config
	rm -f $TEMPLATE

fi


if [ ! -z "$PHP" ]; then
	
	tell "PHP Installation"
	apt-get install -y php5-cli php5-common php5-fpm php5-json php5-readline php5

	tell "PHP configuration"
	if [ -z $AUTOMODE ]; then
		ask "Would you like to review the PHP configuration fragment? (yes or no)"
		if [ $REPLY == 'yes' ]; then
			vim $FRAGMENTS_DIR/php.fragment
		fi
	fi
	
	sed -f $FRAGMENTS_DIR/php.fragment $META/last-config > $META/.last-config
	cp $META/.last-config $META/last-config
	rm -f $META/.last-config
	
else
	$SED -i "/#PHP;/d" $META/last-config
fi

if [ -z $AUTOMODE ]; then
	ask "Would you like to review the nginx configuration file? (yes or no)"
	if [ $REPLY == 'yes' ]; then
		vim $META/last-config
	fi
fi

cp $META/last-config $CONFIG

tell "Applying the permissions for the Nginx configuration file"
chown -R $USERNAME:$NGINX_USER $CONFIG
chmod $CODE $CONFIG

tell "Veryfing that Nginx configuration file is correct"
$NGINX -t
if [ $? -eq 0 ];then

  tell "Nginx configuration file is correct"
  tell "We are enabling $DOMAIN"
  if [[ -L "$NGINX_ENABLED_VHOSTS/$DOMAIN.conf" ]]; then 
    if [ ! "$(readlink $NGINX_ENABLED_VHOSTS/$DOMAIN.conf)" == "$NGINX_ALL_VHOSTS/$DOMAIN.conf" ]; then
      mv $NGINX_ENABLED_VHOSTS/$DOMAIN.conf $NGINX_ENABLED_VHOSTS/$DOMAIN-auto-modified-on-$(date +%s).conf
      # Create symlink
      ln -s $CONFIG $NGINX_ENABLED_VHOSTS/$DOMAIN.conf
    fi
  else
    ln -s $CONFIG $NGINX_ENABLED_VHOSTS/$DOMAIN.conf
  fi
else
  tell "Could not create new vhost as there appears to be a problem with the newly created nginx config file: $CONFIG";
  tell "We are sorry for this fail. It is generally not a hard issue to go through. Watch in /etc/nginx/sites-availables/ and try to order the mess. You will find easy information on google.com for almost any issue you may have. So don't worry and relauch the script when everything will be ready."
    exit 1;
fi
 
tell "Service Nginx is restarted..."
/etc/init.d/nginx reload

ACTIVE=$(ps ax | grep -v grep | grep nginx > /dev/null )
until [ ! -z $ACTIVE ]; do
	tell "Something goes wrong, probably a mistake in $DOMAIN.conf"

	if [ ! -z $AUTOMODE ]; then
		exit 1;
	fi

	ask "Do you want to review the file?"
	if [ $REPLY == 'yes' ]; then
		vim $CONFIG		
	else
		exit 1;
	fi
	tell "Service Nginx is restarted..."
	/etc/init.d/nginx reload
	ACTIVE=$(ps -ef | grep nginx | grep -v grep)
done

#Create a fork of this code

#Create dynamic install script
#INSTALL=$META/install.sh
#echo "#!/bin/bash" > $UNINSTALL
#echo "" >> $INSTALL

#Create dynamic uninstall script
UNINSTALL=$META/uninstall.sh
echo "#!/bin/bash" > $UNINSTALL
echo "" >> $UNINSTALL
echo 'echo "Removing host '$DOMAIN'" &&' >> $UNINSTALL
echo "sleep 1" >> $UNINSTALL
echo "echo 'Removing nginx enabled link' &&" >> $UNINSTALL
echo "rm -f $NGINX_ENABLED_VHOSTS/$DOMAIN.conf &&" >> $UNINSTALL
echo "echo 'Mooving nginx configuration file to $DATA_SRC' &&" >> $UNINSTALL
echo "mv $CONFIG $DATA_SRC/$DOMAIN.conf.bak &&" >> $UNINSTALL
echo "read -p 'Removing user $USERNAME ? '" >> $UNINSTALL
echo 'if [ $REPLY == "yes" ]; then
	deluser '$USERNAME'
	delgroup '$USERNAME'
fi' >> $UNINSTALL
echo "echo 'Done' &&" >> $UNINSTALL
echo "rm -f $UNINSTALL" >> $UNINSTALL
chown $USERNAME:$USERNAME $UNINSTALL
chmod $CODE $UNINSTALL
chmod u+x $UNINSTALL

#Create logfile
COUNT=0
touch $META/$INFOFILE
chown $USERNAME:$USERNAME $META/$INFOFILE
chmod $CODE $META/$INFOFILE
echo "--------------------------" >> $META/$INFOFILE
((COUNT+=1))
date >> $META/$INFOFILE
((COUNT+=1))
echo "Host: "`hostname --fqdn` >> $META/$INFOFILE
((COUNT+=1))
echo "URL: $DOMAIN" >> $META/$INFOFILE
((COUNT+=1))
if [ ! -z "$PORT" ]; then
	echo "PORT: $PORT" >> $META/$INFOFILE
	((COUNT+=1))
fi
if [ ! -z "$SSLPORT" ]; then
	echo "SSL PORT: $SSLPORT" >> $META/$INFOFILE
	((COUNT+=1))
fi
echo "User: $USERNAME" >> $META/$INFOFILE
((COUNT+=1))
echo "Password: $RAWPASSWORD" >> $META/$INFOFILE
((COUNT+=1))
echo "Salt: $SALT" >> $META/$INFOFILE
((COUNT+=1))
echo "--------------------------" >> $META/$INFOFILE
((COUNT+=1))
echo "" >> $META/$INFOFILE
tell "$DOMAIN has been successfully installed"
tell "Operation has been logged in $META/$INFOFILE"
tail --lines $COUNT $META/$INFOFILE

exit 0;

}
