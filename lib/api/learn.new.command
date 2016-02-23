
function api.learn.new.command {

    COMMAND="$1"
    if [[ "$(capacities.get_info commands.$COMMAND)" -eq -1 ]]
    then
        capacity.ask "With what function should I associate $COMMAND"        
        until [ "$(capacities.function_exists $REPLY)" == "true" ] || [ -z "$REPLY" ]; do
            if [ -z "$REPLY" ]; then
                exit
            else
                capacity.ask "With what function should I associate $COMMAND"        
            fi
        done
        capacities.set_info "commands.$COMMAND" "$REPLY"
        capactities.OK "I have added the new command"
    else
        capacities.sorry "Error $COMMAND : You try to add a command that already exist (this should not occur...)"
    fi

}
