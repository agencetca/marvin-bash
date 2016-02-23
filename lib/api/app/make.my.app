
function api.app.make.my.app {
    
    capacities.ask "Appname:"
    tools.docker.build "../apps" "$REPLY"

    
}
