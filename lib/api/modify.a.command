
function api.modify.a.command {
    
    capacities.ask "Which file do you wish to modify? Keep in mind the following : you must indicate the repository, API or capacities."
    until [ -f "../lib/$REPLY" ]; do
        capacities.ask "Which file do you wish to modify? Keep in mind the following : you must indicate the repository, API or capacities."
    done
    CMDFILE="../lib/$REPLY"

    capacities.tell "It is time to code $NAME !"
    capacities.yes_no "Opening Editor?"

    if [ "$REPLY" == "yes" ]; then
        EDITOR=$(which vim)
        capacities.tell "Do not forget to save your work, on a regular base and at the end. Good luck"
        sleep 3
        $EDITOR "$CMDFILE"
        capacities.OK "We are good."

    else
        capacities.tell "Operation aborted"
    fi

}
