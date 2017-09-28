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
				<h2>{{ title }}</h2>
				<span class="close" @click="isVisible = false">X</span>
			</div>
			<div class="message-body">
				<p>{{ body }}</p>
			</div>
		</article>
	`
})

Vue.component('modal', {
	template: `
		<div class="modal">
			<div class="container">
				<div class="my-modal">
					<span class="close" @click="$emit('close')">X</span>
					<p>I'm a modal!! =)</p>
				</div>
			</div>
		</div>
	`
})

Vue.component('tabs', {
	template: `
		<div>
			<ul class="nav nav-tabs">
				<li role="presentation" v-for="tab in tabs" :class="{ 'active' : tab.isActive }" >
					<a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
				</li>
			</ul>
			<div>
				<slot></slot>
			</div>
		</div>
	`,
	data() {
		return { tabs: [] }
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.name == selectedTab.name)
			})
		}
	}
})

Vue.component('tab', {
	props: {
		name: { required: true },
		selected: { default: false }
	},
	template: `
		<div v-show="isActive"><slot></slot></div>
	`,
	data() {
		return {
			isActive: false
		}
	},
	computed: {
		href() {
			return '#' + this.name.toLowerCase().replace(/ /g, '-')
		}
	},
	mounted() {
		this.isActive = this.selected
	}
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
		],
		showModal: false
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