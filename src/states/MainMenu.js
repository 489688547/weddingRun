import PoppingHeartAnimation from 'animations/PoppingHeart';
import Menu from 'objects/Menu';
import SoundControl from 'objects/SoundControl';

class MainMenu extends Phaser.State {

	create() {		
		// Set the game background colour
		this.game.stage.backgroundColor = '#8e8869';
		this.game.renderer.renderSession.roundPixels = true;

		this.createHeader();
		this.createFooter();

	   	let mainMenuOptions = {
	   		'title' : '- use arrow keys -'
	   		,'items' : [
	    		{
					'label'    : 'Start Game'
					,'callback': _.bind(this.choosePlayer,this)
	    		}
	    		,{
					'label'    : 'High scores'
					,'callback': _.bind(this.showHighScores,this)
	    		}
	    		,{
					'label'    : 'Credits'
					,'callback': _.bind(this.showCredits,this)
	    		}
	    	]	   	    	
	   	}
    	this.mainMenu = new Menu(mainMenuOptions,this.game);
    	this.playerMenu = null;

    	// Sound related stuff
    	this.soundControl = new SoundControl(this.game);
    	this.music = this.game.add.audio('menu',this.game.Settings.musicVolume,true);
    	this.music.play();
    }

    choosePlayer() {
    	this.mainMenu.destroy();
    	let playerMenuOptions = {
			'title' : '- choose player -'
			,'items': [
	    		{
					'label'    : 'Groom'
					,'callback': _.bind(function(){
						this.game.Settings.characterType = 'groom';
						this.chooseName();
					},this)
	    		}
	    		,{
					'label'    : 'Bride'
					,'callback': _.bind(function(){
						this.game.Settings.characterType = 'bride';
						this.chooseName();
					},this)
	    		}
    		]
    	};    	
    	this.playerMenu = new Menu(playerMenuOptions,this.game);
    }

    chooseName() {
    	// Destroy prevoius menu
    	this.playerMenu.destroy();

    	let inputWidth = 200;
    	var input = this.game.add.inputField(this.game.width/2-inputWidth/2, 220,{
		    font: '30px arcade',
		    fill: '#212121',
		    width: inputWidth,
		    padding: 10,
		    borderWidth: 3,
		    borderColor: '#0b77a5',
		    borderRadius: 4,
		    placeHolder: 'BSP Username',
			});
			input.setText(this.game.Settings.player.playerName);
			input.startFocus();

			var input2 = this.game.add.inputField(this.game.width/2-inputWidth/2, 300,{
				font: '30px arcade',
				fill: '#212121',
				width: inputWidth,
				padding: 10,
				borderWidth: 3,
				borderColor: '#0b77a5',
				borderRadius: 4,
				placeHolder: 'BSP Password',
			});
			input2.setText(this.game.Settings.player.playerPassword);

	    var nameDescription = this.game.add.text(this.game.width/2, 400,'Press ENTER !');
	    nameDescription.anchor.set(0.5);
	    nameDescription.align = 'center';
	    nameDescription.font = 'arcade';
	    nameDescription.fontSize = 25;
	    nameDescription.fill = '#504c39';

	    // Register 
	    this.game.input.keyboard.onUpCallback = _.bind(function(e){
			if(e.keyCode == Phaser.Keyboard.ENTER) {
				this.game.Settings.player.playerName = input.value;
				this.game.Settings.player.playerPassword = input2.value;
				this.startGame();
			}
		},this);
    }

    showCredits() {
    	this.state.start('Credits');
    }

    showHighScores() {
    	this.state.start('HighScores');
		}
		
		startGame(){
			let that=this
			$.ajax({
				type: "POST",
				url: "https://blackstageplay.herokuapp.com/api/users/login",
				dataType: "json",
				data: {'username':that.game.Settings.player.playerName, 'password':that.game.Settings.player.playerPassword},
				success: function(res) {
					that.game.Settings.token = res.token
					that.state.start('Main');
				},
				error:function(err){
					console.log(err)
				}
			})
		}

	shutdown() {
		this.mainMenu.destroy();
		this.music.destroy();
	}


	createHeader() {
		var headerOffset = 80;

		// Create left hearth and animate it
		let leftHeart = this.game.add.sprite(this.game.width/2-150, headerOffset+5, 'heart');
		let leftHeartAnimation = new PoppingHeartAnimation(leftHeart,this.game).animate();

		// Create right hearth and animate it
		let rightHeart = this.game.add.sprite(this.game.width/2+110, headerOffset+5, 'heart');
		let rightHearthAnimation = new PoppingHeartAnimation(rightHeart,this.game).animate();

		// Add bride and groom images to the logo
		var bride = this.game.add.image(this.game.width/2-170, headerOffset-5, 'brideLarge');
		var groom = this.game.add.image(this.game.width/2+100, headerOffset-5, 'groomLarge');

		// Add WEDDING text
		var weddingText = this.game.add.text(this.game.width/2, headerOffset,'WEDDING');
	    weddingText.anchor.set(0.5);
	    weddingText.align = 'center';
	    weddingText.font = 'arcade';
	    weddingText.fontSize = 50;
	    weddingText.fill = '#333023';

		// Add RUN text
	    var weddingText = this.game.add.text(this.game.width/2+3, headerOffset + 35,'RUN');
	    weddingText.anchor.set(0.5);
	    weddingText.align = 'center';
	    weddingText.font = 'arcade';
	    weddingText.fontSize = 120;
	    weddingText.fill = '#504c39';
	}

	createFooter() {

		var firstLine = "copyright © 2017 - zsondre.hu";
		var secondLine = "Music by Hunor Sukosd";
	    var footerHeight = 80;
		
	    var graphics = this.game.add.graphics(0, 0);
	    graphics.beginFill(0xF99601);    
	    graphics.lineStyle(2, 0xF99601, 1);
	    graphics.drawRect(0, this.game.world.height-footerHeight, this.game.width, footerHeight);
	    graphics.endFill();


		var firstLineText = this.game.add.text(this.game.width/2, this.game.world.height-footerHeight+30,firstLine);
	    firstLineText.anchor.set(0.5);
	    firstLineText.align = 'center';
	    firstLineText.font = 'arcade';
	    firstLineText.fontSize = 20;
	    firstLineText.fill = '#FFFFFF';
	    firstLineText.strokeThickness = 0;

	    var secondLineText = this.game.add.text(this.game.width/2, this.game.world.height-footerHeight+50,secondLine);
	    secondLineText.anchor.set(0.5);
	    secondLineText.align = 'center';
	    secondLineText.font = 'arcade';
	    secondLineText.fontSize = 20;
	    secondLineText.fill = '#FFFFFF';
	    secondLineText.strokeThickness = 0;
	}
}

export default MainMenu;
