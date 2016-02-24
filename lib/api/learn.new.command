
function api.learn.new.command {

    if [[ "$(capacities.get_info commands.$COMMAND)" -eq -1 ]]
    then

        capacities.tell "Ready to learn a new command!"
        CUSTOMCOMMAND="$@"

        REPLY=""
        until [ ! -z "$SELECTION" ] && [ "$REPLY" == "yes" ]; do
            capacities.list-all-functionalities "capacities.select-in-menu" "Choose a function to associate $COMMAND with"
            capacities.yes_no "Do you want to select $SELECTION?"
        done

        capacities.set_info "commands.$(capacities.format-command $CUSTOMCOMMAND)" "$SELECTION"
        capacities.OK "I have added the new command"
    else
        capacities.sorry "Error $COMMAND : You try to add a command that already exist (this should not occur...)"
    fi

}
