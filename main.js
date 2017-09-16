var app = new Vue ({
	el: '#root',
	data: {
		name: 'Arturo',
		newHobby: '',
		hobbies: ['drum', 'padel', 'run', 'program'],
		className: 'green-text',
		isActive: false,
		myTasks: [
			{ description: 'go', completed: true },
			{ description: 'collect', completed: false },
			{ description: 'buy', completed: false },
			{ description: 'return', completed: true }
		]
	},
	methods: {
		addHobby: function() {
			if(this.newHobby) {
				this.hobbies.push(this.newHobby);
				this.newHobby = '';
				this.isActive = true;
			} else {
				this.isActive = false;
				alert('Any hobby entered');
			}
		},
		completeTask: function(name) {
			app.myTasks.forEach(function(el){
				if(el.description == name) {
					el.completed = true;
				}
			})
		},
		incompleteTask: function(name) {
			app.myTasks.forEach(function(el){
				if(el.description == name) {
					el.completed = false;
				}
			})
		}
	},
	computed: {
		incompletedTasks() {
			return this.myTasks.filter(task => !task.completed);
		}
	}
})