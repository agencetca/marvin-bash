Coffeemaker.logs = {};
Coffeemaker.logs.tasks = {};
Coffeemaker.logs.tasks.queued = [];
Coffeemaker.logs.tasks.success = [];
Coffeemaker.logs.tasks.error = [];
Coffeemaker.logs.tasks.ETA = 0;
Coffeemaker.logs.tasks.total = 0;
Coffeemaker.logs.tasks.current = '';
Coffeemaker.logs.tasks.last = '';

Coffeemaker.core.capacities.log = {

	task : {

        queued : function(task) {

            if (!task) return;

            Coffeemaker.logs.tasks.queued.push(task);
            Coffeemaker.logs.tasks.total++;
        },

        success : function(task) {

            if (!task) return;

                this.stop(task);
                var index = Coffeemaker.logs.tasks.error.indexOf(task); 
                if (index === -1) {
                    Coffeemaker.logs.tasks.success.push(task);
                }
        },

        error : function(task) {

            if (!task) return;
            var index = Coffeemaker.logs.tasks.error.indexOf(task); 
            if (index === -1) {
                Coffeemaker.logs.tasks.error.push(task);
            }
            
            //TODO : make the log system understand that previous task is faulty
            Coffeemaker.logs.tasks.possibleError = Coffeemaker.logs.tasks.last;
        },

        set : {

            ETA : function() {
                var x = Coffeemaker.logs.tasks.success.length+1;
                var y = Coffeemaker.logs.tasks.total;
                var z = (x)*100/y
                if ( x > 0 ) {
                    Coffeemaker.logs.tasks.ETA = z;
                } else {
                    Coffeemaker.logs.tasks.ETA = 0;
                    this.current('');
                }
            },

            current : function (task) {
                if( ! Coffeemaker.logs.tasks.error.length) {
                   this.last(Coffeemaker.logs.tasks.current);
                   Coffeemaker.logs.tasks.current = task;
                }

            },

            last : function (task) {

                Coffeemaker.logs.tasks.last = task;

            }

        },

        //get : {

        //    ETA : function(value) {
        //        return Coffeemaker.logs.tasks.ETA;
        //    }

        //},

        start : function(task) {
        
            if (!task) return;
            if(Coffeemaker.logs.tasks.error.length) {
                var index = Coffeemaker.logs.tasks.error.indexOf(task); 
                if (index === -1) {
                    Coffeemaker.logs.tasks.error.push(task);
                }
            } else {
                this.set.current(task);
            }
        },

        stop : function (task) {

            if (!task) return;
            var index = Coffeemaker.logs.tasks.queued.indexOf(task); 
            if (index > -1) {
                    Coffeemaker.logs.tasks.queued.splice(index, 1);
            }
            this.set.ETA();
        }

	},

	exception : function (identifier,message,object) {
	
		//var identifier = arguments[0];
		//Array.prototype.shift.apply(arguments);
		
		if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
		if ( ! Coffeemaker.logs.exceptions ) Coffeemaker.logs.exceptions = {};
		if ( ! Coffeemaker.logs.exceptions[identifier] ) Coffeemaker.logs.exceptions[identifier] = [];
		
		var exception = {};
		exception.message = message;
		exception.object = object;
		
		Coffeemaker.logs.exceptions[identifier].push(exception);
	
	},

	network : {

		fail : function (type,status,url) {
	
			var load = Coffeemaker.core.capacities.load;
			var check = load('check');

			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.failures ) Coffeemaker.logs.network.failures = {};
			if ( ! Coffeemaker.logs.network.failures[type] ) Coffeemaker.logs.network.failures[type] = [];
			if ( ! Coffeemaker.logs.network.failures[type][status] ) {
				Coffeemaker.logs.network.failures[type][status] = [];
			}
			//if ( ! check.inArray(url,Coffeemaker.network.failures[type][status])) {
				Coffeemaker.logs.network.failures[type][status].push(url);
			//}
		},
	
		success : function (type,status,url) {
	
			var load = Coffeemaker.core.capacities.load;
			var check = load('check');
		
			if ( ! Coffeemaker.logs ) Coffeemaker.logs = {};
			if ( ! Coffeemaker.logs.network ) Coffeemaker.logs.network = {};
			if ( ! Coffeemaker.logs.network.success ) Coffeemaker.logs.network.success = {};
			if ( ! Coffeemaker.logs.network.success[type] ) Coffeemaker.logs.network.success[type] = [];
			if ( ! Coffeemaker.logs.network.success[type][status] ) {
				Coffeemaker.logs.network.success[type][status] = [];
			}
			//if ( ! check.inArray(url,Coffeemaker.logs.network.success[type][status])) {
				Coffeemaker.logs.network.success[type][status].push(url);
			//}
		}
	
	}
	
}
