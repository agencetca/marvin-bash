
function api.app.make.my.app {
    
    capacities.ask "Appname:"
    capacities.docker.build "../apps" "$REPLY"

    
}
