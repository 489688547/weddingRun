import Settings from '../settings';
class Preload extends Phaser.State {

	preload() {

		let game = this.game
		$(document).ready(function () {
			let url = new URL(window.location.href)
			let searchParams = new URLSearchParams(url.search);
			let API_ENTRY_ID = searchParams.get('entry');
			const API_BASE_URL = 'https://cdn.contentful.com';
			const API_SPACE_ID = 'rwrineo0wycw';
			const API_TOKEN = 'de5ee9b55e1b5e614178fc4439c768cccac1d41b1adcfe43e83b793a37dbfef4';
			
			$.ajax({
				type: "GET",
				url: `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries/${API_ENTRY_ID}?access_token=${API_TOKEN}&content_type=artist`,
				dataType: "json",
				success: function(res) {
					console.log(res)
					Settings.artistName = res.fields.slug
					Settings.backgroundImageId = res.fields.backgroundImage.sys.id
					Settings.backgroundMusicId = res.fields.backgroundMusic.sys.id
					
					$.ajax({
						type: "GET",
						url: `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=artist`,
						dataType: "json",
						success: function(res) {
							var s = res.includes.Asset.filter(image => image.sys.id === Settings.backgroundImageId)
							var m = res.includes.Asset.filter(music => music.sys.id === Settings.backgroundMusicId)
							var imgURL= s[0].fields.file.url;
							Settings.backgroundMusicURL = m[0].fields.file.url;
		
							$('body').css({'background':'url('+imgURL+') no-repeat center center fixed', 'background-size': 'cover'});
							// Load sounds
							if(Settings.backgroundMusicURL) {
								game.load.audio('menu', [{uri:`${Settings.backgroundMusicURL}`, type:"mp3"}]);
							}
							
						},
						error:function(err){
							console.log(err)
						}
					})
				},
				error:function(err){
					console.log(err)
				}
			})
			
			
			
		});

		this.game.load.audio('ingame', ['assets/sounds/ingame.mp3']);
		
		this.game.load.audio('game-over', ['assets/sounds/game-over.mp3']);
		this.game.load.audio('coin', ['assets/sounds/coin.mp3']);
		this.game.load.audio('jump', ['assets/sounds/jump.mp3']);
		this.game.load.audio('damage-man', ['assets/sounds/damage-man.mp3']);
		this.game.load.audio('damage-woman', ['assets/sounds/damage-woman.mp3']);
		
		// Load characters and game controls
		this.game.load.image('brideLarge', 'assets/images/bride_large.png');
		this.game.load.image('groomLarge', 'assets/images/groom_large.png');
		this.game.load.image('heart', 'assets/images/heart.png');
		this.game.load.spritesheet('sound-control', 'assets/images/sound-control.png', 48, 40);
		
		

		// Load background related assets
		this.game.load.image('background', 'assets/images/bg.png');
		this.game.load.image('background-mountains', 'assets/images/mountains.png');
		this.game.load.image('background-hills', 'assets/images/hills.png');
		this.game.load.image('background-back-hills', 'assets/images/back-hills.png');
		this.game.load.image('cloud-1', 'assets/images/cloud-1.png');
		this.game.load.image('cloud-2', 'assets/images/cloud-2.png');

		// Ground and platform images
		this.game.load.image('ground', 'assets/images/ground.png');
		this.game.load.image('platform-1', 'assets/images/platform-1.png');
		this.game.load.image('platform-2', 'assets/images/platform-2.png');
		this.game.load.image('platform-3', 'assets/images/platform-3.png');
		
		// Sprites
		this.game.load.spritesheet('groomSprite', 'assets/images/groom.png', 32, 48);
		this.game.load.spritesheet('brideSprite', 'assets/images/bride.png', 32, 48);
		this.game.load.spritesheet('coin', 'assets/images/coin.png', 30, 30);
		this.game.load.spritesheet('bunny', 'assets/images/bunny.png', 32, 30);

	}


	create() {
		// Activate input plugin
		this.game.plugins.add(PhaserInput.Plugin);		
		this.game.state.start("MainMenu");
		
	}

}

export default Preload;
