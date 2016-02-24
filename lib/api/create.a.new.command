
function api.create.a.new.command {
    
    capacities.OK "Lets build a  new command"
    capacities.ask "What is the name of the command (keep it simple, no space, separate with .)"
    CMDNAME="$REPLY"
    capacities.ask "Is this going in capacities (aka private functionnality) or api (for the whole internet) repository ?"
    CMDTYPE="$REPLY" 

    capacities.tell "It is time to code $NAME !"
    capacities.yes_no "Opening Editor?"

    if [ "$REPLY" == "yes" ]; then
        EDITOR=$(which vim)
        capacities.OK "Do not forget to save your work, on a regular base and at the end. Good luck"
        sleep 3
        
        touch ../lib/$CMDTYPE/$CMDNAME
        echo -e "
function $CMDTYPE.$CMDNAME {\n
\n
\n
\n
\n
\n
}" >> ../lib/$CMDTYPE/$CMDNAME

        $EDITOR ../lib/$CMDTYPE/$CMDNAME
        capacities.tell "Let me a minute, I am saving the new command in my database"
        capacities.tell "This could take some time. Have a break."
        capacities.set_info "commands.$CMDTYPE.$CMDNAME" "$CMDTYPE.$CMDNAME"
        capacities.OK "We are good. Type $CMDNAME and lets see what is happening..."

    else
        capacities.tell "Operation aborted"
    fi
    
}
