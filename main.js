// component that uses other component (game)
Vue.component('games-list', {
	// this v-for must have a englobator, like <ul>, or <div>, etc
	template: `
		<ul>
			<game v-for="game in games" v-text="game.name"></game>
		</ul>
	`,
	data() {
		return {
			games: [
				{ name: 'PES8', isGood: true },
				{ name: 'Call of Duty', isGood: false },
				{ name: 'Counter', isGood: false },
				{ name: 'Risk', isGood: true },
				{ name: 'Guitar Hero', isGood: true }
			]
		}
	}
})

// single component
// slot is used to print every <li> text
Vue.component('game', {
	template: '<li><slot></slot></li>'
})

Vue.component('message', {
	props: ['title', 'body'],
	data() {
		return {
			isVisible: true
		}
	},
	template: `
		<article class="jumbotron" v-show="isVisible">
			<div class="message-header">
				{{ title }}
				<span class="close" @click="isVisible = false">X</span>
			</div>
			<div class="message-body">
				{{ body }}
			</div>
		</article>
	`
})

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