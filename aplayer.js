class Player {
	get volume () {
		return this.audio.volume * 100
	}
	
	set volume (vol) {
		vol = Math.max(0, vol)
		vol = Math.min(100, vol)
		
		this.audio.volume = vol / 100
		
		if (this.$volumeSlider) this.$volumeSlider.value = vol
	}
	
	get currentTime () {
		return this.audio.currentTime
	}	
	
	set currentTime (time) {
		this.audio.currentTime = time
	}
	
	constructor(el) {
		this.audio = new Audio("");
		this.$el = el;
		
		this.$playlist = this.$el.querySelector(".player-playlist");
		this.$btnPrev = this.$el.querySelector(".player-prev");
		this.$btnNext = this.$el.querySelector(".player-next");
		this.$btnPlay = this.$el.querySelector(".player-play");
		this.$btnPause = this.$el.querySelector(".player-pause");
		this.$btnStop = this.$el.querySelector(".player-stop");
		this.$currentName = this.$el.querySelector(".player-current");
		this.$progress = this.$el.querySelector('.player-progress')
		this.$progressBar = this.$progress.querySelector('.player-progress-bar')
		this.$repeat = this.$el.querySelector('.player-repeat')
		this.$volumeSlider = this.$el.querySelector('.player-volume-slider')

		this.songs = [];
		this.repeat = false
		this.$playlistItems = []
		this.currentIndex = 0;
		this.volume = this.$volumeSlider.value || 80

		this.updatePlaylist()
		this.bindEvents()
		this.load()
	}

	updatePlaylist() {
		this.songs = [];

		this.$playlistItems = this.$playlist.querySelectorAll("[data-src]");

		for (let item of this.$playlistItems) {
			this.songs.push({
				name: item.innerText,
				src: item.dataset.src
			});
		}
	}

	updatePlaylistClass() {
		this.$playlistItems.forEach((el, i) => {
			if (i === this.currentIndex) {
				return this.$addClass(el, "player-playlist-current");
			}
			
			this.$removeClass(el, "player-playlist-current");
		});

		return this;
	}

	$addClass(el, className) {
		const classes = el.className.split(/\s+/);

		classes.push(className);
		el.className = classes.join(' ');

		return el;
	}

	$removeClass(el, className) {
		const classes = el.className.split(/\s+/);
		const index = classes.indexOf(className);

		classes.splice(index, 1);
		el.className = classes;

		return el;
	}
	
	load (index) {
		index = index >= 0 ? index : this.currentIndex
		this.currentIndex = index
		
		const song = this.songs[index];
		this.audio.src = song.src;
		this.audio.load();
		this.$currentName.innerText = song.name;
		this.updatePlaylistClass();
	}

	play(index) {
		if (this.audio.paused && index === undefined) {
			this.audio.play()
			return this
		}
		
		if (index !== undefined) {
			this.load(index)
			this.audio.play()
		}
		
		return this;
	}
	
	pause() {
		this.audio.pause()
		
		return this
	}
	
	stop(){
		this.audio.pause()
		this.audio.currentTime = 0
	}
	
	prev(){
		
		if ((this.currentIndex - 1) >= 0) {
			this.play(--this.currentIndex)
		}
		
		return this
	}	
	
	next(){
		if ((this.currentIndex + 1) < this.songs.length) {
			this.play(++this.currentIndex)
		}
		
		return this
	}
	
	$on(el, ev, cb) {
		if (el) {
			el.addEventListener(ev, cb)
		}
	}
	
	bindEvents(){
		this.$on(this.$btnPrev, 'click', () => this.prev())
		this.$on(this.$btnNext, 'click', () => this.next())
		this.$on(this.$btnPlay, 'click', () => this.play())
		this.$on(this.$btnPause, 'click', () => this.pause())
		this.$on(this.$btnStop, 'click', () => this.stop())
		
		this.$on(this.audio, 'ended', () => {
			if (this.repeat) {
				this.play()
			} else {
				this.next()
			}
		})
		
		//Volume
		this.$on(this.$volumeSlider, 'input', (e) => {
			this.volume = +e.target.value
		})
		
		// Repetir
		this.$on(this.$repeat, 'change', e => {
			this.repeat = e.target.checked
		})
		
		// Barra de progresso
		this.$on(this.audio, 'timeupdate', e => {
			this.$progressBar.style.width = (this.audio.currentTime / this.audio.duration * 100) + '%'
		})
		
		// Selecionar item da playlist
		this.$playlistItems.forEach((el, i) => {
			console.log(el)
			this.$on(el, 'click', () => this.play(i))
		})
	}
}

/////////////////////////
const player = new Player(document.getElementById("meuplayer"))
