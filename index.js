var config = {
	apiKey: "AIzaSyDyL0ESGLl7r9LTLNymLN9xSV9tYBBXlkA",
	authDomain: "fir-demo-project-a02bd.firebaseapp.com",
	databaseURL: "https://fir-demo-project-a02bd.firebaseio.com",
	projectId: "fir-demo-project-a02bd",
	storageBucket: "fir-demo-project-a02bd.appspot.com",
	messagingSenderId: "257491932042"
};
firebase.initializeApp(config);
var database = firebase.database();

var threadGrid = new Vue({
	el: '#thread-grid-div',
	data: {
		threadlist: []
	},
	methods: {
		setThreads: function (snapshot) {
			this.threadlist = []
			for(var threadKey in snapshot.val()) {
			var currThread = snapshot.val()[threadKey]
				this.threadlist.push({ id: threadKey, title: currThread.title, description: currThread.description})
			}
		},

		getThreads: function () {
			return this.threadlist
		},

		getThreadLength: function () {
			return this.threadlist.length
		}
	}
})

database.ref('threads/').once('value').then( 
	function (snapshot) { 
		threadGrid.setThreads(snapshot)
	}
)

database.ref('threads/').on('value', function(snapshot){
	threadGrid.setThreads(snapshot)
})

var createThread = new Vue({
	el: '#create-new-thread',
	data: {
		title: '',
		description: ''
	},
	methods: {
		createNewThread: function () {
			if(this.title != '' && this.description != ''){
				var newThreadKey = database.ref().child('threads').push().key
				database.ref('threads/' + newThreadKey).set({ id: newThreadKey, title: this.title, description: this.description })

				this.clearData()
			}
		},

		clearData: function() {
			this.title = ''
			this.description = ''
		}
	}
})

Vue.component('thread-item', {
	props: ['thread'],
	template: '<div class="col-md-4"><div class="panel panel-default "><div class="panel-heading"><h4>{{ thread.title }}</h4></div><div class="panel-body"><p>{{ thread.description }}</p></div></div></div>'
})

