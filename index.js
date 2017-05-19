var config = {
	apiKey: "AIzaSyDyL0ESGLl7r9LTLNymLN9xSV9tYBBXlkA",
	authDomain: "fir-demo-project-a02bd.firebaseapp.com",
	databaseURL: "https://fir-demo-project-a02bd.firebaseio.com",
	projectId: "fir-demo-project-a02bd",
	storageBucket: "fir-demo-project-a02bd.appspot.com",
	messagingSenderId: "257491932042"
};
firebase.initializeApp(config)
var database = firebase.database()
var storage = firebase.storage()

var threadGrid = new Vue({
	el: '#thread-grid-div',
	data: {
		threadlist: [],
		imagelist: []
	},
	methods: {

		setThreads: function (snapshot) {
			threadGrid.threadlist = []
			threadGrid.imagelist = []
			for(var threadKey in snapshot.val()) {
					var currThread = snapshot.val()[threadKey]
					threadGrid.getThreadImage(currThread)
					threadGrid.threadlist.push({ id: threadKey, title: currThread.title, description: currThread.description })
			}
		},

		getThreadImage: function (currThread) {
			console.log(('imageFilename' in currThread) + ' | ' + currThread.title + ' ' + currThread.description)
			if('imageFilename' in currThread){
				
				storage.ref().child('images/' + currThread.id + '/' + currThread.imageFilename).getDownloadURL().then(
					function (url) {
						console.log(url)
						threadGrid.imagelist.push({id: currThread.id, image: url})
					}
				)
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

database.ref('threads/').on('value', 
	function (snapshot) {
		threadGrid.setThreads(snapshot)
	}
)

var createThread = new Vue({
	el: '#create-new-thread',
	data: {
		title: '',
		description: '',
		image: '',
		imageFilename: ''
	},
	methods: {
		createNewThread: function () {
			if(this.title != '' && this.description != ''){


				var newThreadKey = this.generateKey()
				var imageRef = storage.ref().child('images/' + newThreadKey + '/' + this.imageFilename);

				var thread = {}
				if(this.image){
					thread = { id: newThreadKey, title: this.title, description: this.description , imageFilename: this.imageFilename}
				} else {
					thread = { id: newThreadKey, title: this.title, description: this.description }
				}
				if(this.image) {
					imageRef.put(this.image).then(
						function (snapshot) {
							database.ref('threads/' + newThreadKey).set(thread)
						}
					)
				}

				this.clearData()
			}
		},

		clearData: function() {
			this.title = ''
			this.description = ''
			this.image = null
			this.imageFilename = ''
		},

		onFileChange: function(e) {
			var files = e.target.files || e.dataTransfer.files
			if (!files.length) return
			this.imageFilename = files[0].name
			this.image = files[0]
		},

		generateKey: function () {

			var charlist = 'abcdefghijklmnopqrstuvwxyz'
			var randomKey = ''
			var now = new Date()

			for(var i = 0; i < 10; i++){
				randomKey = randomKey + charlist[Math.floor((Math.random() * charlist.length))]
			}

			randomKey = randomKey + now.getMilliseconds() + now.getSeconds() + now.getMinutes() + now.getHours() + now.getDay() + now.getMonth() + now.getYear()
			return randomKey
		},

		createImage: function(file) {
			var image = new Image()
			var reader = new FileReader()
			var vm = this

			reader.onload = (e) => {
				vm.image = e.target.result;
			};

			reader.readAsDataURL(file);
		},
	}
})

Vue.component('thread-item', {
	props: ['threadkey','thread', 'imagelist'],
	template: '<div class="col-md-4"><div class="panel panel-default "><div class="panel-heading"><h4>{{ thread.title }}</h4></div><div class="panel-body" style="min-height: 200; max-height: 200; overflow-y: scroll;"><p><thread-image v-bind:images="imagelist" v-bind:imagekey="threadkey"></thread-image>{{ thread.description }}</p></div></div></div>'
})

Vue.component('thread-image', {
	props: ['imagekey', 'images'],
	template: "<div><div v-for='image in images' v-bind:image='image'><div v-if='image.id == imagekey'><img v-bind:src='image.image'/></div></div></div>"
})

//<thread-image v-bind:images="imagelist.key"></thread-image>


























