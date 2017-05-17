var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
    	{ text: "something1" },
    	{ text: "kek" },
    	{ text: "lolerz" },
    ]
  }
})

var app5 = new Vue({
	el: '#app-5',
	data: {
		message: 'button'
	},
	methods: {
		exampleFunction: function () {
			if(this.message == 'clicked!'){
				this.message = 'button'
			} else {
				this.message = 'clicked!'
			}
			
		}
	}
})

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{ todo.message }}</li>'
})

var app7 = new Vue({
	el: '#app-7',
	data: {
		groceryList: [
			{ id: 1, message: 'something 1'},
			{ id: 2, message: 'something 2'},
			{ id: 3, message: 'something 3'}
		]
	}
})