	const vue = Vue.createApp({
		data(){
			return{
				gamesInModal: {name: null},
				games: []
			}
		},
		async created(){
			this.games = await (await fetch('http://localhost:8080/games')).json()
		},
		methods: {
			getGame: async function(id) {
				this.gamesInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json()
				let gameInfoModal = new bootstrap.Modal(document.getElementById('gameInfoModal'),{})
				gameInfoModal.show()
			}
		}
	}).mount('#app')