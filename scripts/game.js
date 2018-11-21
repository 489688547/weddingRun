(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PoppingHeartAnimation = (function () {
	function PoppingHeartAnimation(objToAnimate, game) {
		_classCallCheck(this, PoppingHeartAnimation);

		this.obj = objToAnimate;
		this.game = game;

		// The total duration of a single animation
		this.duration = 3000 + this.game.rnd.between(0, 2000);

		// The object is raised by this many pixels / animation step
		this.verticalSpeed = 35;

		// The degree of swinging in pixels
		this.swingDegree = 20 + this.game.rnd.between(0, 20);

		// Delay animation
		this.delay = this.game.rnd.between(0, 2000);
	}

	_createClass(PoppingHeartAnimation, [{
		key: "animate",
		value: function animate() {
			var initialX = this.obj.x;
			var initialY = this.obj.y;

			var animateX = [initialX + this.getApproximateValue(this.swingDegree), initialX - 2 * this.getApproximateValue(this.swingDegree), initialX + 2 * this.getApproximateValue(this.swingDegree)];

			var animateY = [initialY - this.verticalSpeed, initialY - 2 * this.verticalSpeed, initialY - 3 * this.verticalSpeed];

			// transition, duration, easing, auto start, delay, repeat, yoyo
			this.heartTween = this.game.add.tween(this.obj).to({
				x: animateX,
				y: animateY,
				alpha: [1.0, 0.8, 0.2]
			}, this.duration, Phaser.Easing.Cubic.Out, true, this.delay).loop();

			this.game.add.tween(this.obj.scale).to({ x: 0.1, y: 0.1 }, this.duration, Phaser.Easing.Linear.In, true, this.delay).loop();

			this.heartTween.interpolation(function (v, k) {
				return Phaser.Math.bezierInterpolation(v, k);
			});
		}
	}, {
		key: "getApproximateValue",
		value: function getApproximateValue(value) {
			var tolerance = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

			// normal() returns a random real number between -1 and 1.
			var sign = this.game.rnd.normal() > 0 ? 1 : -1;
			return value + sign * this.game.rnd.between(0, tolerance);
		}
	}]);

	return PoppingHeartAnimation;
})();

exports["default"] = PoppingHeartAnimation;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesPreload = require('states/Preload');

var _statesPreload2 = _interopRequireDefault(_statesPreload);

var _statesMainMenu = require('states/MainMenu');

var _statesMainMenu2 = _interopRequireDefault(_statesMainMenu);

var _statesCredits = require('states/Credits');

var _statesCredits2 = _interopRequireDefault(_statesCredits);

var _statesHighScores = require('states/HighScores');

var _statesHighScores2 = _interopRequireDefault(_statesHighScores);

var _statesMain = require('states/Main');

var _statesMain2 = _interopRequireDefault(_statesMain);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var Game = (function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		// Width, height of the game, AUTO = Detect canvas or webGL
		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, _settings2['default'].canvasWidth, _settings2['default'].canvasHeight, Phaser.AUTO);

		// Store game settings
		this.Settings = _settings2['default'];

		// Define game states
		this.state.add('Preload', _statesPreload2['default'], false);
		this.state.add('MainMenu', _statesMainMenu2['default'], false);
		this.state.add('Credits', _statesCredits2['default'], false);
		this.state.add('HighScores', _statesHighScores2['default'], false);
		this.state.add('Main', _statesMain2['default'], false);

		// Start the preload state
		this.state.start('Preload');
	}

	return Game;
})(Phaser.Game);

new Game();

},{"./settings":15,"states/Credits":16,"states/HighScores":17,"states/Main":18,"states/MainMenu":19,"states/Preload":20}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _objectsSplashText = require('objects/SplashText');

var _objectsSplashText2 = _interopRequireDefault(_objectsSplashText);

var Achievements = (function () {
	function Achievements(game) {
		_classCallCheck(this, Achievements);

		this.game = game;

		// Create an instance of the splash text
		this.splash = new _objectsSplashText2['default'](this.game);

		// Store completed and uncompleted achievements
		this.completed = [];
		this.uncompleted = this.getAchievements();

		return this;
	}

	_createClass(Achievements, [{
		key: 'getAchievements',
		value: function getAchievements() {
			return [{
				'text': '10 coins collected !',
				'check': function check() {
					return this.coinsCollected > 9;
				}
			}, {
				'text': '20 coins collected !',
				'check': function check() {
					return this.coinsCollected > 19;
				}
			}, {
				'text': '50 coins collected !',
				'check': function check() {
					return this.coinsCollected > 49;
				}
			}, {
				'text': '5 bunnies eliminated !',
				'check': function check() {
					return this.bunniesKilled > 4;
				}
			}, {
				'text': '10 bunnies eliminated !',
				'check': function check() {
					return this.bunniesKilled > 9;
				}
			}, {
				'text': '10000 points reached !',
				'check': function check() {
					return this.calculateScore() > 9999;
				}
			}, {
				'text': 'You have travelled 5000px !',
				'check': function check() {
					return this.ground.distanceTravelled() > 4999;
				}
			}];
		}
	}, {
		key: 'check',
		value: function check(referenceObj) {
			_.each(this.uncompleted, _.bind(function (achievement, index) {
				var isAchievementCompleted = _.bind(achievement.check, referenceObj);
				if (isAchievementCompleted()) {
					this.splash.write(achievement.text);
					var completedAchievement = this.uncompleted.splice(index, 1);
					this.completed.push(completedAchievement);
					return false;
				}
			}, this));
		}
	}]);

	return Achievements;
})();

exports['default'] = Achievements;
module.exports = exports['default'];

},{"objects/SplashText":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Background = (function () {
	function Background(game) {
		_classCallCheck(this, Background);

		this.game = game;

		// Set speeds
		this.mountainSpeed = 0.2;
		this.bgHillSpeed = 0.4;
		this.hillsSpeed = 0.6;

		// Set the game background colour
		this.game.stage.backgroundColor = '#ccf2ff';

		// Set a background image
		this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

		// Add mountains
		this.mountains = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('background-mountains').height - 64, this.game.width, this.game.world.height, 'background-mountains');

		// Add hills in the background
		this.bgHills = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('background-back-hills').height + 30, this.game.width, this.game.world.height, 'background-back-hills');

		// Add hills
		this.hills = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('background-hills').height + 30, this.game.width, this.game.world.height, 'background-hills');

		// Create a random cloud group
		this.clouds = this.game.add.group();
		this.clouds.enableBody = true;
		this.clouds.createMultiple(2, 'cloud-1');
		this.clouds.createMultiple(2, 'cloud-2');
		this.clouds.createMultiple(2, 'cloud-1');
		this.clouds.createMultiple(2, 'cloud-2');

		this.initializeClouds();
		this.timer = game.time.events.loop(this.game.Settings.timers.cloudSpawn, this.createCloud, this);

		return this;
	}

	_createClass(Background, [{
		key: 'initializeClouds',
		value: function initializeClouds() {
			// By default add a few clouds
			for (var i = 0; i < 3; i++) {
				this.createCloud(this.game.rnd.between(0, this.game.width));
			}
		}
	}, {
		key: 'createCloud',
		value: function createCloud(initX) {
			// Get a cloud that is not currently on screen
			var cloud = this.clouds.getFirstDead();

			if (cloud) {
				// Initial position of the cloud is outside of the game world
				var x = typeof initX === 'undefined' ? this.game.width : initX;
				// Generate a new position for the cloud
				var y = this.game.rnd.between(20, 100);

				//Reset it to the specified coordinates
				cloud.reset(x, y);
				cloud.body.velocity.x = this.game.rnd.between(-30, -100);
				cloud.body.allowGravity = false;

				//When the cloud leaves the screen, kill it
				cloud.checkWorldBounds = true;
				cloud.outOfBoundsKill = true;
			}
		}
	}, {
		key: 'update',
		value: function update() {
			this.mountains.tilePosition.x -= this.mountainSpeed;
			this.bgHills.tilePosition.x -= this.bgHillSpeed;
			this.hills.tilePosition.x -= this.hillsSpeed;
		}
	}]);

	return Background;
})();

exports['default'] = Background;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Coins = (function () {
	function Coins(game, platform) {
		_classCallCheck(this, Coins);

		this.game = game;
		this.platform = platform;
		this.enableSpawning = true;
		this.platformMap = {};

		// Create a group for the platforms
		this.coins = this.game.add.group();
		this.coins.enableBody = true;
		this.coins.createMultiple(20, 'coin');

		this.timer = game.time.events.loop(this.game.Settings.timers.coinSpawn, this.addCoin, this);
		return this;
	}

	_createClass(Coins, [{
		key: 'getObject',
		value: function getObject() {
			return this.coins;
		}
	}, {
		key: 'disableSpawning',
		value: function disableSpawning() {
			this.enableSpawning = false;
		}
	}, {
		key: 'removeCoin',
		value: function removeCoin(coin) {
			this.platformMap[coin.platformId] = false;
			coin.kill();
		}
	}, {
		key: 'addToPlatformMap',
		value: function addToPlatformMap(platformId) {
			this.platformMap[platformId] = true;
		}
	}, {
		key: 'setCoinPosition',
		value: function setCoinPosition(coin) {
			// Get the list of platforms on the screen
			var platforms = this.platform.getOnScreenPlatforms();

			// By default render the coin randomly on the ground
			var x = this.game.rnd.between(0, this.game.width);
			var y = this.game.height - this.game.Settings.sizes.groundHeight - 40;

			if (platforms.length) {
				// Gets a random element from collection
				var platformData = _.sampleSize(platforms)[0];

				// If we don't have a coin on this platform
				if (!this.platformMap[platformData.id]) {
					this.addToPlatformMap(platformData.id);
					coin.platformId = platformData.id;

					// Calculate the position of the coin on the platform
					x = platformData.x + platformData.width / 2 - 10;
					y = platformData.y - 40;
				}
			}

			coin.reset(x, y);
		}
	}, {
		key: 'addCoin',
		value: function addCoin() {
			// If spawning is disabled exit
			if (!this.enableSpawning) {
				return;
			}

			// Get a coin that is not currently on screen
			var coin = this.coins.getFirstDead();

			if (coin) {

				this.setCoinPosition(coin);

				coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
				coin.animations.play('spin');
				coin.body.immovable = true;
				coin.body.allowGravity = false;
				coin.body.checkCollision = false;
				coin.body.velocity.x = -this.game.Settings.physics.platformSpeed;

				//When the coin leaves the screen, kill it
				coin.checkWorldBounds = true;
				coin.outOfBoundsKill = true;
			}
		}
	}, {
		key: 'update',
		value: function update() {}
	}]);

	return Coins;
})();

exports['default'] = Coins;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Enemy = (function () {
	function Enemy(game) {
		_classCallCheck(this, Enemy);

		this.game = game;

		// Create a group for the platforms
		this.enemies = this.game.add.group();
		this.enemies.enableBody = true;
		this.enemies.createMultiple(10, 'bunny');

		this.timer = game.time.events.loop(this.game.Settings.timers.enemySpawn, this.addBunny, this);
		return this;
	}

	_createClass(Enemy, [{
		key: 'getObject',
		value: function getObject() {
			return this.enemies;
		}
	}, {
		key: 'addBunny',
		value: function addBunny() {
			// Get a cloud that is not currently on screen
			var bunny = this.enemies.getFirstDead();

			if (bunny) {

				// Initial position of the bunny is outside of the game world
				var x = this.game.width;
				var y = this.game.world.height - this.game.rnd.between(2, 6) * this.game.Settings.sizes.groundHeight;

				//Reset it to the specified coordinates
				bunny.reset(x, y);

				bunny.animations.add('fly', [0, 1, 2, 3, 4], 10, true);
				bunny.animations.play('fly');
				bunny.body.immovable = true;
				bunny.body.allowGravity = false;
				bunny.body.velocity.x = -this.game.rnd.between(1, 4) * this.game.Settings.physics.platformSpeed - 35;

				// Set a narrower bounding box for the bunny than the image itself
				var bunnyImage = this.game.cache.getImage('bunny');
				bunny.body.setSize(25, bunnyImage.height - 8, 3, 4);

				//When the bunny leaves the screen, kill it
				bunny.checkWorldBounds = true;
				bunny.outOfBoundsKill = true;
			}
		}
	}, {
		key: 'update',
		value: function update() {}
	}]);

	return Enemy;
})();

exports['default'] = Enemy;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Ground = (function () {
	function Ground(game) {
		_classCallCheck(this, Ground);

		this.game = game;

		// Store the size if the ground tile
		this.tileSize = this.game.Settings.sizes.groundHeight;

		// Create a group for the platforms
		this.ground = this.game.add.group();
		this.ground.enableBody = true;
		this.ground.createMultiple(16, 'ground');

		// Store the tile that was added last
		this.lastAddedTile = null;

		// Add tiles from the left side of the screen until it fills the width of the game
		this.createFullGround();

		// Store how many tiles were added
		this.tileCount = 0;

		return this;
	}

	_createClass(Ground, [{
		key: 'getObject',
		value: function getObject() {
			return this.ground;
		}

		// Create a full ground
	}, {
		key: 'createFullGround',
		value: function createFullGround() {
			for (var i = 0; i < this.game.width; i = i + this.tileSize) {
				this.addTile(i);
			}
		}
	}, {
		key: 'addTile',
		value: function addTile(initX) {
			// Get a cloud that is not currently on screen
			var tile = this.ground.getFirstDead();

			if (tile) {
				// If no x cordinate is provided, render it just outside of the screen
				var x = typeof initX === 'undefined' ? this.game.width - 2 : initX;
				var y = this.game.world.height - this.tileSize;

				//Reset it to the specified coordinates
				tile.reset(x, y);
				tile.body.immovable = true;
				tile.body.allowGravity = false;
				tile.body.velocity.x = -this.game.Settings.physics.platformSpeed;

				//When the tile leaves the screen, kill it
				tile.checkWorldBounds = true;
				tile.outOfBoundsKill = true;

				// Save the last added tile for later user
				this.lastAddedTile = tile;
			}
		}
	}, {
		key: 'distanceTravelled',
		value: function distanceTravelled() {
			return this.tileCount * this.tileSize;
		}
	}, {
		key: 'update',
		value: function update() {
			// If the last added tile is about to leave the edge of the game
			if (this.lastAddedTile.x + this.tileSize < this.game.width) {
				// Append a new tile
				this.addTile();
				// Increment tile counter (this will count in the scores)
				this.tileCount++;
			}
		}
	}]);

	return Ground;
})();

exports['default'] = Ground;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Menu = (function () {
	function Menu(options, game) {
		_classCallCheck(this, Menu);

		this.game = game;
		this.options = options;
		this.drawnTexts = [];

		// Create an isActive property on each element
		this.options.items.forEach(function (navItem, index) {
			navItem.isActive = false;
		});
		// Set the first menu as active
		this.options.items[0].isActive = true;

		this.registerKeyhandler();

		this.drawMenu();
		return this;
	}

	_createClass(Menu, [{
		key: 'drawMenu',
		value: function drawMenu() {
			var navigationOffset = 250;

			this.drawnTexts.forEach(function (navItem, index) {
				navItem.destroy();
			}, this);

			if (this.options.title) {
				var topOffset = navigationOffset - 40;
				var text = this.game.add.text(this.game.width / 2, topOffset, this.options.title);
				text.anchor.set(0.5);
				text.align = 'center';
				text.font = 'arcade';
				text.fontSize = 25;
				text.fill = '#FFFFFF';
				text.strokeThickness = 0;

				this.drawnTexts.push(text);
			}

			this.options.items.forEach(function (navItem, index) {
				var topOffset = navigationOffset + index * 40;
				var text = this.game.add.text(this.game.width / 2, topOffset, navItem.label);
				text.anchor.set(0.5);
				text.align = 'center';
				text.font = 'arcade';
				text.fontSize = 50;
				text.fill = '#FFFFFF';
				text.stroke = '#504c39';
				text.strokeThickness = navItem.isActive ? 6 : 0;

				this.drawnTexts.push(text);
			}, this);
		}
	}, {
		key: 'getNextIndex',
		value: function getNextIndex() {
			var activeIndex = this.getActiveIndex();
			return activeIndex == this.options.items.length - 1 ? 0 : activeIndex + 1;
		}
	}, {
		key: 'getPrevIndex',
		value: function getPrevIndex() {
			var activeIndex = this.getActiveIndex();
			return activeIndex == 0 ? this.options.items.length - 1 : activeIndex - 1;
		}
	}, {
		key: 'getActiveIndex',
		value: function getActiveIndex() {
			return _.findIndex(this.options.items, { 'isActive': true });
		}
	}, {
		key: 'getActiveMenu',
		value: function getActiveMenu() {
			var activeIndex = this.getActiveIndex();
			return _.isUndefined(this.options.items[activeIndex]) ? undefined : this.options.items[activeIndex];
		}
	}, {
		key: 'moveCursor',
		value: function moveCursor(newIndex) {
			var activeIndex = this.getActiveIndex();
			if (_.isUndefined(this.options.items[activeIndex]) || _.isUndefined(this.options.items[newIndex])) {
				return;
			}

			this.options.items[activeIndex].isActive = false;
			this.options.items[newIndex].isActive = true;
		}
	}, {
		key: 'registerKeyhandler',
		value: function registerKeyhandler() {
			this.game.input.keyboard.onUpCallback = _.bind(function (e) {
				if (e.keyCode == Phaser.Keyboard.UP) {
					this.moveCursor(this.getPrevIndex());
					this.drawMenu();
				}
				if (e.keyCode == Phaser.Keyboard.DOWN) {
					this.moveCursor(this.getNextIndex());
					this.drawMenu();
				}
				if (e.keyCode == Phaser.Keyboard.ENTER) {
					var activeMenu = this.getActiveMenu();
					if (activeMenu) {
						activeMenu.callback();
					}
				}
			}, this);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.game.input.keyboard.reset();
			this.drawnTexts.forEach(function (navItem, index) {
				navItem.destroy();
			});
		}
	}]);

	return Menu;
})();

exports['default'] = Menu;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Platform = (function () {
	function Platform(game) {
		_classCallCheck(this, Platform);

		this.game = game;

		this.groundHeight = this.game.Settings.sizes.groundHeight;
		this.lastFloor = 0;
		this.floorHeight = 95;
		this.playerWasOnThePlatforms = false;
		this.playerFallDownToGround = false;

		// Create a group for the platforms
		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		// Add a few random platforms to the group
		for (var i = 0; i < 25; i++) {
			var platformVersion = 'platform-' + this.game.rnd.between(1, 3);
			var platform = this.platforms.create(0, 0, platformVersion, undefined, false);
			platform.body.immovable = true;
			platform.body.allowGravity = false;
		}

		this.timer = game.time.events.loop(this.game.Settings.timers.platformSpawn, this.addPlatform, this);
		return this;
	}

	_createClass(Platform, [{
		key: 'getObject',
		value: function getObject() {
			return this.platforms;
		}
	}, {
		key: 'getOnScreenPlatforms',
		value: function getOnScreenPlatforms() {
			var positions = [];
			this.platforms.forEachAlive(function (platform) {
				positions.push({
					x: platform.x,
					y: platform.y,
					id: platform.id,
					width: platform.width,
					height: platform.height
				});
			});

			return positions;
		}
	}, {
		key: 'addPlatform',
		value: function addPlatform(floor, initX) {
			// Get a platform that is not currently on screen
			var platform = this.platforms.getFirstDead();

			if (platform) {
				var isFloorDefined = typeof floor === 'undefined' ? false : true;

				this.lastFloor = isFloorDefined ? floor : this.getNextFloor();

				// Initial position of the platform is outside of the game world
				var x = typeof initX === 'undefined' ? this.game.width : initX;
				var y = this.game.world.height - this.groundHeight - this.lastFloor * this.floorHeight;

				//Reset it to the specified coordinates
				platform.reset(x, y);
				platform.body.velocity.x = -this.game.Settings.physics.platformSpeed;

				//When the platform leaves the screen, kill it
				platform.checkWorldBounds = true;
				platform.outOfBoundsKill = true;

				// Generate a unique platform ID for each new
				platform.id = _.uniqueId('platform-');
			}
		}

		/** 
   *	The game has 4 floors: ground, 1st, 2nd and 3rd floor.
   *	This algorithm ensures that platforms are generated in a way,
   *	that every platform is reachable.
   */
	}, {
		key: 'getNextFloor',
		value: function getNextFloor() {
			/**
    *	Case 0 - If the player is on the ground, always render the next platform
    *	to the 1st floor, so that the player can reach the upper platforms
    **/
			if (this.playerFallDownToGround && this.lastFloor > 1) {
				this.resetPlayerState();
				return 1;
			}

			/**
    *	Case 1 - no platforms were added
    *  
    *	When the game starts, no platforms were added,
    *	so we add the next platform to the 1st floor
    **/
			if (this.lastFloor == 0) {
				return 1;
			}

			/**
    *	Case 2 - the last platform is at the 1st floor
    *  
    *	70% chance, that the next platform is added to the upper level
    *	30% chance, that we add the next platform to the same level
    **/
			if (this.lastFloor == 1) {
				return Math.random() > 0.3 ? 2 : 1;
			}

			/**
    *	Case 3 - the last platform was added to 2nd floor
    *
    **/
			if (this.lastFloor == 2) {
				return Math.random() > 0.5 ? 2 : 3;
			}

			/**
    *	Case 4 - last platform was added to the highest position
    * 		 
    *	The new platform can be added to any of the floors
    **/
			return this.game.rnd.between(1, 3);
		}
	}, {
		key: 'resetPlayerState',
		value: function resetPlayerState() {
			this.playerWasOnThePlatforms = false;
			this.playerFallDownToGround = false;
		}
	}, {
		key: 'update',
		value: function update(hitPlatform, hitGround) {
			if (this.playerWasOnThePlatforms === false && hitPlatform) {
				this.playerWasOnThePlatforms = true;
			}

			if (this.playerWasOnThePlatforms && hitGround) {
				this.playerFallDownToGround = true;
			}
		}
	}]);

	return Platform;
})();

exports['default'] = Platform;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Player = (function () {
	function Player(game) {
		_classCallCheck(this, Player);

		this.game = game;

		// The default character is the groom
		var characterSprite = 'groomSprite';

		if (this.isWoman()) {
			characterSprite = 'brideSprite';
		}

		// The player and its settings
		this.character = this.game.add.sprite(this.game.width / 2, this.game.height - 150, characterSprite);

		//  We need to enable physics on the player
		this.game.physics.arcade.enable(this.character);

		//  Player physics properties. Give the little guy a slight bounce.
		this.character.body.bounce.y = this.game.Settings.physics.playerBounce;
		this.character.body.gravity.y = this.game.Settings.physics.playerGravity;
		this.character.body.collideWorldBounds = true;

		// Set a narrower bounding box for the character than the image itself
		var characterImage = this.game.cache.getImage(characterSprite);
		this.character.body.setSize(25, characterImage.height - 5, 4, 5);

		//  Our two animations, walking left and right.
		this.character.animations.add('left', [0, 1, 2, 3], 10, true);
		this.character.animations.add('right', [5, 6, 7, 8], 10, true);

		this.sounds = {
			'jump': this.game.add.audio('jump', this.game.Settings.effectVolume),
			'damage': this.game.add.audio(this.isWoman() ? 'damage-woman' : 'damage-man', this.game.Settings.effectVolume),
			'coin': this.game.add.audio('coin', this.game.Settings.effectVolume)
		};

		return this;
	}

	_createClass(Player, [{
		key: 'getObject',
		value: function getObject() {
			return this.character;
		}
	}, {
		key: 'isMale',
		value: function isMale() {
			return this.game.Settings.characterType == 'bride' ? false : true;
		}
	}, {
		key: 'isWoman',
		value: function isWoman() {
			return !this.isMale();
		}
	}, {
		key: 'collectBounty',
		value: function collectBounty(x, y, velocity) {
			this.sounds.coin.play();
			var score = velocity * this.game.Settings.score.enemy;
			this.scorePoints(x, y, score);
		}
	}, {
		key: 'collectCoin',
		value: function collectCoin(x, y) {
			this.sounds.coin.play();
			this.scorePoints(x, y, this.game.Settings.score.coin);
		}
	}, {
		key: 'scorePoints',
		value: function scorePoints(x, y, points) {
			var text = this.game.add.text(x, y, '+' + points);
			text.anchor.set(0.5);
			text.align = 'center';
			text.font = 'arcade';
			text.fontSize = 25;
			text.fill = '#FFFFFF';
			text.stroke = '#504c39';
			text.strokeThickness = 2;

			var tween = this.game.add.tween(text);
			tween.to({ y: y - 60 }, 500, "Linear", true);
			tween.onComplete.add(function () {
				text.destroy();
			}, this);
		}
	}, {
		key: 'die',
		value: function die() {
			// Play sound
			this.sounds.damage.play();
			//  Stand still
			this.character.animations.stop();
			this.character.frame = 4;
		}
	}, {
		key: 'update',
		value: function update(hitPlatform) {
			var cursors = this.game.input.keyboard.createCursorKeys();

			//  Reset the players velocity (movement)
			this.character.body.velocity.x = this.game.Settings.physics.playerStandingSpeed;
			this.character.body.gravity.y = this.game.Settings.physics.playerGravity;

			//  Move to the left	
			if (cursors.left.isDown) {
				this.character.body.velocity.x = -this.game.Settings.physics.playerRunningBackwardSpeed;
				this.character.animations.play('left');
			}
			//  Move to the right
			else if (cursors.right.isDown) {
					this.character.body.velocity.x = this.game.Settings.physics.playerRunningForwardSpeed + this.game.Settings.physics.platformSpeed;
					this.character.animations.play('right');
				}
				//  Stand still
				else {
						this.character.animations.stop();
						this.character.frame = 4;
					}

			// Add more gravity if the down button is pressed
			if (cursors.down.isDown) {
				//  Move to the right
				this.character.body.gravity.y = this.game.Settings.physics.playerGravity + this.game.Settings.physics.extraGravity;
			}

			//  Allow the player to jump if they are touching the ground.
			if (cursors.up.isDown && this.character.body.touching.down && hitPlatform) {
				this.sounds.jump.play();
				this.character.body.velocity.y = -this.game.Settings.physics.playerJumpVelocity;
			}
		}
	}]);

	return Player;
})();

exports['default'] = Player;
module.exports = exports['default'];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Score = (function () {
	function Score(game) {
		_classCallCheck(this, Score);

		this.game = game;
		this.digitNumber = 7;
		this.topOffset = 20;
		this.rightOffset = 20;
		this.characterWidth = 13;

		this.label = this.game.add.text(this.game.width - this.characterWidth * this.digitNumber - this.rightOffset - 70, this.topOffset, 'Score');
		this.label.font = 'arcade';
		this.label.fontSize = 24;
		this.label.fill = '#777d90';

		this.score = this.game.add.text(this.game.width - this.characterWidth * this.digitNumber - this.rightOffset, this.topOffset, '0');
		this.score.font = 'arcade';
		this.score.fontSize = 24;
		this.score.fill = '#343537';
		this.setScore(5);

		return this;
	}

	_createClass(Score, [{
		key: 'setScore',
		value: function setScore(score) {
			var zeros = '' + Math.pow(10, this.digitNumber);
			var paddedScore = (zeros + score).substr(-this.digitNumber);
			this.score.setText(paddedScore);
		}
	}, {
		key: 'update',
		value: function update(value) {
			this.setScore(value);
		}
	}]);

	return Score;
})();

exports['default'] = Score;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SoundControl = (function () {
	function SoundControl(game) {
		_classCallCheck(this, SoundControl);

		this.game = game;

		// The numbers given in parameters are the indexes of the frames, in this order: over, out, down
		var defaultFrame = this.game.sound.mute ? 1 : 0;
		this.button = this.game.add.button(20, 20, 'sound-control', this.actionOnClick, this, defaultFrame, defaultFrame, defaultFrame);
		return this;
	}

	_createClass(SoundControl, [{
		key: 'actionOnClick',
		value: function actionOnClick() {
			this.game.sound.mute ? this.unMute() : this.mute();
		}
	}, {
		key: 'mute',
		value: function mute() {
			this.game.sound.mute = true;
			this.button.setFrames(1, 1, 1);
		}
	}, {
		key: 'unMute',
		value: function unMute() {
			this.game.sound.mute = false;
			this.button.setFrames(0, 0, 0);
		}
	}]);

	return SoundControl;
})();

exports['default'] = SoundControl;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SplashText = (function () {
	function SplashText(game) {
		_classCallCheck(this, SplashText);

		this.game = game;
		this.timeOut = 2000;
		this.timer = undefined;
		this.splashText = undefined;

		return this;
	}

	_createClass(SplashText, [{
		key: 'write',
		value: function write(text) {
			this.splashText = this.game.add.text(this.game.width / 2, 100, text);
			this.splashText.anchor.set(0.5);
			this.splashText.align = 'center';
			this.splashText.font = 'arcade';
			this.splashText.fontSize = 30;
			this.splashText.fill = '#FFFFFF';
			this.splashText.stroke = '#0b77a5';
			this.splashText.strokeThickness = 6;
			this.splashText.alpha = 0;

			this.game.add.tween(this.splashText).to({ alpha: 1 }, 500, "Linear", true);
			this.game.add.tween(this.splashText).to({ fontSize: 50 }, 500, "Linear", true);

			this.timer = this.game.time.events.loop(this.timeOut, this.destroySplashText, this);
		}
	}, {
		key: 'destroySplashText',
		value: function destroySplashText() {
			this.splashText.destroy();
			this.game.time.events.remove(this.timer);
		}
	}]);

	return SplashText;
})();

exports['default'] = SplashText;
module.exports = exports['default'];

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _settings = require('./../settings');

var _settings2 = _interopRequireDefault(_settings);

var ToplistService = (function () {
	function ToplistService() {
		_classCallCheck(this, ToplistService);
	}

	_createClass(ToplistService, [{
		key: "saveScore",
		value: function saveScore(playerName, score) {
			// If the name of the player is empty, we do not save it to the toplist
			if (_.isEmpty(playerName)) {
				return;
			}

			/**
    *
    *   Save your score using a webservice, for example
   * 
   *   $.post(Settings.urls.saveScore,{
    *  	'playerName' : playerName
    *  	,'score' : score
    *   }).done(function(data) {
    *   	console.log('data was saved')
   *   });
   *
   **/

			//Save score
			$.ajax({
				type: "POST",
				url: "https://blackstageplay.herokuapp.com/api/game/updateScore",
				data: { 'name': "wr", 'userName': playerName, 'score': score, 'artistName': _settings2["default"].artistName },
				dataType: "json",
				success: function success(res) {
					console.log("score saved");
				},
				error: function error(err) {
					console.log(err);
				}
			});
		}

		/**
   * Call your webservice to get the top10 player
   * Something like this: return $.get(Settings.urls.getTop10);
   */
		// return [
		// 	{"playerName":"AE","score":"100000"}
		// 	,{"playerName":"AE","score":"90000"}
		// 	,{"playerName":"AE","score":"80000"}
		// 	,{"playerName":"AE","score":"70000"}
		// 	,{"playerName":"AE","score":"60000"}
		// 	,{"playerName":"AE","score":"50000"}
		// 	,{"playerName":"AE","score":"40000"}
		// 	,{"playerName":"AE","score":"30000"}
		// 	,{"playerName":"AE","score":"20000"}
		// 	,{"playerName":"AE","score":"10000"} 			
		// ];

	}]);

	return ToplistService;
})();

exports["default"] = new ToplistService();
module.exports = exports["default"];

},{"./../settings":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	// Width of the canvas in pixels (default:800)
	'canvasWidth': 800,

	// Height of the canvas in pixels (default:512)
	'canvasHeight': 512,

	// Character type can be 'groom' of 'bride'
	'characterType': 'groom',

	// Volume of the looping music in the main menu and in-game
	'musicVolume': 0.25,

	// Effect volume (jumps, coins, damage)
	'effectVolume': 0.4,

	// Sizes
	'sizes': {
		// The height of the ground tile
		'groundHeight': 64
	},

	// Constants for score calculations
	'score': {
		// How much does it worth to travel 1 pixel
		'pixel': 0.5,
		// How much does a coin worth
		'coin': 1,
		// Kill bounty = enemy velocity x scale
		'enemy': 0.8,
		'got': ''
	},

	// There are some events that happen regularly (ms)
	'timers': {
		// New coin appears after each <coinSpawn> ms
		'coinSpawn': 2000,
		// New platforms appear in every <platformSpawn> ms
		'platformSpawn': 3000,
		// New rabbits are spawn afer <enemySpawn> ms
		'enemySpawn': 2000,
		// Cloud  timer
		'cloudSpawn': 4000,
		// Check for game states in every second
		'mainLoop': 900
	},

	// Driving forces of the game
	'physics': {
		// World default gravity
		'worldGravity': 300,
		// This is essentially the speed of the game, how fast the platforms are moving
		'platformSpeed': 80,
		// Default player gravity
		'playerGravity': 400,
		// Some extra gravity is applied when the down arrow is pressed
		'extraGravity': 600,
		// How high the player will jump?
		'playerJumpVelocity': 400,
		// Speed of the player when running forward
		'playerRunningForwardSpeed': 120,
		// When running backward, we add more speed, the game is easier that way
		'playerRunningBackwardSpeed': 200,
		// When no button is pressed, the player is standing
		'playerStandingSpeed': 0,
		// A small bounce effect for the player
		'playerBounce': 0.2
	},

	// URLs that are used by the Toplist service (absolute URLs)
	'urls': {
		// Getter to retrieve the top 10 players and their score
		'getTop10': '',
		// Save the score at the end of the game
		'saveScore': ''
	},

	// Name of the player
	'player': {
		'playerName': '',
		'playerPassword': ''
	},
	// User Token
	'token': '',
	'artistName': '',
	'backgroundImageId': '',
	'backgroundMusicId': '',
	'backgroundMusicURL': ''
};
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Credits = (function (_Phaser$State) {
	_inherits(Credits, _Phaser$State);

	function Credits() {
		_classCallCheck(this, Credits);

		_get(Object.getPrototypeOf(Credits.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Credits, [{
		key: 'create',
		value: function create() {
			// Set the game background colour
			this.game.stage.backgroundColor = '#8e8869';
			this.scrollSpeed = 1;
			this.separatorHeight = 80;
			this.lineHeight = 25;
			this.titleTextSize = 28;
			this.nameTextSize = 35;
			this.textStackHeight = this.game.height;
			this.credits = [];

			this.addTitle();
			this.addCredits();

			// Add Key handler
			this.registerKeyhandler();
		}
	}, {
		key: 'update',
		value: function update() {
			// Animate credits
			_.each(this.credits, _.bind(function (text, index) {
				text.y -= this.scrollSpeed;
				if (text.y < -100) {
					text.destroy();
				}
			}, this));

			// If the last credit is off the screen go back to the main screen
			if (this.credits[this.credits.length - 1].y < -50) {
				this.game.state.start("MainMenu");
			}
		}
	}, {
		key: 'addTitle',
		value: function addTitle() {
			var text = this.game.add.text(this.game.width / 2, this.textStackHeight, 'Credits');
			text.anchor.set(0.5);
			text.align = 'center';
			text.font = 'arcade';
			text.fontSize = 60;
			text.fill = '#FFFFFF';
			text.stroke = '#504c39';
			text.strokeThickness = 6;

			this.credits.push(text);

			// Increase the initial position for the next credit
			this.textStackHeight += this.separatorHeight;
		}
	}, {
		key: 'addCredits',
		value: function addCredits() {
			var credits = this.getCredits();
			_.each(credits, _.bind(function (credit) {
				// First add the title
				var title = this.getStyledText(credit.title, 'title');
				this.credits.push(title);

				// Increase the initial position for the next credit
				this.textStackHeight += this.lineHeight;

				var name = this.getStyledText(credit.value, 'name');
				this.credits.push(name);

				// Increase the initial position for the next credit
				this.textStackHeight += this.separatorHeight;
			}, this));
		}
	}, {
		key: 'getStyledText',
		value: function getStyledText(label, style) {
			// First add the title
			var text = this.game.add.text(this.game.width / 2, this.textStackHeight, label);
			text.anchor.set(0.5);
			text.align = 'center';
			text.font = 'arcade';
			text.fontSize = style == 'title' ? this.titleTextSize : this.nameTextSize;
			text.fill = style == 'title' ? '#504c39' : '#FFFFFF';
			text.stroke = style == 'title' ? '#FFFFFF' : '#504c39';
			text.strokeThickness = style == 'title' ? 0 : 5;
			return text;
		}
	}, {
		key: 'registerKeyhandler',
		value: function registerKeyhandler() {
			this.game.input.keyboard.onUpCallback = _.bind(function (e) {
				if (e.keyCode == Phaser.Keyboard.ESC || e.keyCode == Phaser.Keyboard.ENTER) {
					this.game.state.start('MainMenu');
				}
			}, this);
		}
	}, {
		key: 'getCredits',
		value: function getCredits() {

			return [{
				'title': 'Lead Programmer',
				'value': 'Endre Andras'
			}, {
				'title': 'Test Engineer',
				'value': 'Zsofia Andras-Simko'
			}, {
				'title': 'Music by',
				'value': 'Hunor Sukosd'
			}, {
				'title': 'Music supervisor',
				'value': 'Kinga Andras'
			}, {
				'title': 'Level Design',
				'value': 'Endre Andras'
			}, {
				'title': 'Character Design',
				'value': 'Endre Andras'
			}, {
				'title': 'Sounds by',
				'value': 'Hunor Sukosd'
			}, {
				'title': 'Game Engine',
				'value': 'Phaser'
			}, {
				'title': 'Thanks to',
				'value': 'the Phaser community'
			}, {
				'title': 'Thanks for the tutorials',
				'value': 'Josh Morony'
			}, {
				'title': 'Background',
				'value': 'opengameart.org/users/greggman'
			}, {
				'title': 'Platforms',
				'value': 'opengameart.org/users/buch'
			}, {
				'title': 'Coins',
				'value': 'opengameart.org/users/irmirx'
			}, {
				'title': 'Flying rabbit',
				'value': 'jpopkitty.deviantart.com'
			}, {
				'title': 'Special thanks to',
				'value': ['Nyula', 'Picica']
			}];
		}
	}]);

	return Credits;
})(Phaser.State);

exports['default'] = Credits;
module.exports = exports['default'];

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var HighScores = (function (_Phaser$State) {
	_inherits(HighScores, _Phaser$State);

	function HighScores() {
		_classCallCheck(this, HighScores);

		_get(Object.getPrototypeOf(HighScores.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(HighScores, [{
		key: "create",
		value: function create() {
			var that = this;
			$.ajax({
				type: "POST",
				url: "https://blackstageplay.herokuapp.com/api/game/all",
				data: { gameName: "wr", artistName: _settings2["default"].artistName },
				dataType: "json",
				success: function success(res) {
					that.renderHighScores(res);
				},
				error: function error(err) {
					console.log(err);
				}
			});

			// Set the game background colour
			this.game.stage.backgroundColor = '#8e8869';
			this.createHeader();

			this.loadingText = this.game.add.text(this.game.width / 2, 200, 'loading...');
			this.loadingText.anchor.set(0.5);
			this.loadingText.font = 'arcade';
			this.loadingText.fontSize = 40;
			this.loadingText.fill = '#504c39';

			// let results = ToplistService.getTop10();
			// this.renderHighScores(results);
		}
	}, {
		key: "update",
		value: function update() {
			this.game.input.keyboard.onUpCallback = _.bind(function (e) {
				if (e.keyCode == Phaser.Keyboard.ESC || e.keyCode == Phaser.Keyboard.ENTER) {
					this.game.state.start('MainMenu');
				}
			}, this);
		}
	}, {
		key: "createHeader",
		value: function createHeader() {
			var headerOffset = 80;

			var text = this.game.add.text(this.game.width / 2, headerOffset, 'High Scores - Top 10');
			text.anchor.set(0.5);
			text.align = 'center';
			text.font = 'arcade';
			text.fontSize = 60;
			text.fill = '#FFFFFF';
			text.stroke = '#504c39';
			text.strokeThickness = 6;
		}
	}, {
		key: "renderHighScores",
		value: function renderHighScores(toplist) {
			this.loadingText.destroy();

			var topListOffset = 120;
			var lineHeight = 35;

			_.each(toplist, _.bind(function (item, index) {
				var value = index + 1 + '.  ' + item.userName + "\t\t" + item.score;
				var userName = this.game.add.text(130, topListOffset + lineHeight * index, value);
				userName.align = 'left';
				userName.font = 'arcade';
				userName.fontSize = 40;
				userName.fill = '#504c39';
				userName.tabs = 400;
			}, this));
		}
	}]);

	return HighScores;
})(Phaser.State);

exports["default"] = HighScores;
module.exports = exports["default"];

},{"../settings":15}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsPlayer = require('objects/Player');

var _objectsPlayer2 = _interopRequireDefault(_objectsPlayer);

var _objectsPlatform = require('objects/Platform');

var _objectsPlatform2 = _interopRequireDefault(_objectsPlatform);

var _objectsGround = require('objects/Ground');

var _objectsGround2 = _interopRequireDefault(_objectsGround);

var _objectsBackground = require('objects/Background');

var _objectsBackground2 = _interopRequireDefault(_objectsBackground);

var _objectsScore = require('objects/Score');

var _objectsScore2 = _interopRequireDefault(_objectsScore);

var _objectsCoins = require('objects/Coins');

var _objectsCoins2 = _interopRequireDefault(_objectsCoins);

var _objectsEnemy = require('objects/Enemy');

var _objectsEnemy2 = _interopRequireDefault(_objectsEnemy);

var _objectsSoundControl = require('objects/SoundControl');

var _objectsSoundControl2 = _interopRequireDefault(_objectsSoundControl);

var _objectsAchievements = require('objects/Achievements');

var _objectsAchievements2 = _interopRequireDefault(_objectsAchievements);

var _servicesToplistService = require('services/ToplistService');

var _servicesToplistService2 = _interopRequireDefault(_servicesToplistService);

var Main = (function (_Phaser$State) {
	_inherits(Main, _Phaser$State);

	function Main() {
		_classCallCheck(this, Main);

		_get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Main, [{
		key: 'create',
		value: function create(characterType, params) {
			// Enable Arcade Physics
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.physics.arcade.gravity.y = this.game.Settings.physics.worldGravity;

			// Set world bounds: x, y, width, height
			this.game.world.setBounds(0, 0, this.game.Settings.canvasWidth, this.game.Settings.canvasHeight);

			// Initialize score counter
			this.coinsCollected = 0;
			this.bunniesKilled = 0;
			this.bountyPoints = 0;

			// Game over flag
			this.isGameOver = false;

			// Add Background
			this.background = new _objectsBackground2['default'](this.game);

			// Add scoreboard
			this.score = new _objectsScore2['default'](this.game);

			// Add ground
			this.ground = new _objectsGround2['default'](this.game);

			// Add floating platforms
			this.platform = new _objectsPlatform2['default'](this.game);

			// Add player
			this.player = new _objectsPlayer2['default'](this.game);

			// Add some coins at a given rate considering the platform
			this.coins = new _objectsCoins2['default'](this.game, this.platform);

			// Add some coins at a given rate
			this.enemies = new _objectsEnemy2['default'](this.game);

			// Store achievements
			this.achievements = new _objectsAchievements2['default'](this.game);

			// Add hot key handlers
			this.registerKeyhandler();

			var playerObject = this.player.getObject();
			//  By default the Signal is empty, so we create it here:
			playerObject.body.onWorldBounds = new Phaser.Signal();
			playerObject.body.onWorldBounds.add(this.hitWorldBounds, this);

			// Start playing music
			this.soundControl = new _objectsSoundControl2['default'](this.game);
			this.inGameMusic = this.game.add.audio('ingame', this.game.Settings.musicVolume, true);
			this.gameOverMusic = this.game.add.audio('game-over', this.game.Settings.musicVolume, false);
			this.inGameMusic.play();

			// Check for specific game events
			this.timer = this.game.time.events.loop(this.game.Settings.timers.mainLoop, this.mainLoop, this);
		}
	}, {
		key: 'registerKeyhandler',
		value: function registerKeyhandler() {
			this.game.input.keyboard.onUpCallback = _.bind(function (e) {
				if (e.keyCode == Phaser.Keyboard.ESC) {
					this.game.state.start('MainMenu');
				}
				if (e.keyCode == Phaser.Keyboard.ENTER && this.isGameOver) {
					this.game.state.start('Main');
				}
			}, this);
		}
	}, {
		key: 'hitWorldBounds',
		value: function hitWorldBounds() {
			this.gameOver();
		}
	}, {
		key: 'gameOver',
		value: function gameOver() {
			// Global physics pause
			this.game.physics.arcade.isPaused = true;

			// Set game over flag to true, so no object update will occur
			this.isGameOver = true;

			// Kill player
			this.player.die();

			// Start playing the game over soundtrack
			this.inGameMusic.destroy();
			this.gameOverMusic.play();

			// Show game over screen
			this.showGameOver();

			// Save settings in the background
			_servicesToplistService2['default'].saveScore(this.game.Settings.player.playerName, this.calculateScore());
		}
	}, {
		key: 'showGameOver',
		value: function showGameOver() {
			this.game.Settings.score.got = this.calculateScore();
			var gameOverText = this.game.add.text(this.game.width / 2, 100, 'GAME OVER');
			gameOverText.anchor.set(0.5);
			gameOverText.align = 'center';
			gameOverText.font = 'arcade';
			gameOverText.fontSize = 100;
			gameOverText.fill = '#333023';
			gameOverText.stroke = '#FFFFFF';
			gameOverText.strokeThickness = 6;

			var restartText = this.game.add.text(this.game.width / 2, 200, 'You got ' + this.game.Settings.score.got + '\nENTER - Restart the game\n ESC - Go to main menu');
			restartText.anchor.set(0.5);
			restartText.align = 'center';
			restartText.font = 'arcade';
			restartText.fontSize = 30;
			restartText.fill = '#0b77a5';
			restartText.stroke = '#FFFFFF';
			restartText.strokeThickness = 2;
		}
	}, {
		key: 'update',
		value: function update() {
			// Update objects only if the game is running
			if (!this.isGameOver) {

				//  Collision detections
				var hitPlatform = this.game.physics.arcade.collide(this.player.getObject(), this.platform.getObject());
				var hitGround = this.game.physics.arcade.collide(this.player.getObject(), this.ground.getObject());
				var touchingSolidGround = hitPlatform || hitGround;

				this.player.update(touchingSolidGround);
				this.platform.update(hitPlatform, hitGround);
				this.ground.update();
				this.coins.update();
				this.background.update();
				this.enemies.update();

				// Update score
				this.score.update(this.calculateScore());

				// Handle coin collection
				this.game.physics.arcade.collide(this.player.getObject(), this.coins.getObject(), this.collectCoin, _.noop, this);

				// Handle player - enemy collision
				this.game.physics.arcade.collide(this.player.getObject(), this.enemies.getObject(), this.hitEnemyLines, _.noop, this);
			} else {
				this.coins.disableSpawning();
			}
		}
	}, {
		key: 'calculateScore',
		value: function calculateScore() {
			return this.coinsCollected * this.game.Settings.score.coin + this.ground.distanceTravelled() * this.game.Settings.score.pixel + this.bountyPoints;
		}
	}, {
		key: 'hitEnemyLines',
		value: function hitEnemyLines(player, enemy) {
			if (player.body.touching.down && enemy.body.touching.up) {
				var x = enemy.x;
				var y = enemy.y;
				var velocity = Math.abs(enemy.body.velocity.x);
				enemy.kill();
				this.player.collectBounty(x, y, velocity);
				this.bunniesKilled++;
				this.bountyPoints += velocity;
			} else {
				this.gameOver();
			}
		}
	}, {
		key: 'collectCoin',
		value: function collectCoin(player, coin) {
			this.player.collectCoin(coin.x, coin.y);
			this.coins.removeCoin(coin);
			this.coinsCollected++;
		}
	}, {
		key: 'mainLoop',
		value: function mainLoop() {
			this.achievements.check(this);
		}
	}, {
		key: 'shutdown',
		value: function shutdown() {
			this.inGameMusic.destroy();
		}
	}]);

	return Main;
})(Phaser.State);

exports['default'] = Main;
module.exports = exports['default'];

},{"objects/Achievements":3,"objects/Background":4,"objects/Coins":5,"objects/Enemy":6,"objects/Ground":7,"objects/Platform":9,"objects/Player":10,"objects/Score":11,"objects/SoundControl":12,"services/ToplistService":14}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _animationsPoppingHeart = require('animations/PoppingHeart');

var _animationsPoppingHeart2 = _interopRequireDefault(_animationsPoppingHeart);

var _objectsMenu = require('objects/Menu');

var _objectsMenu2 = _interopRequireDefault(_objectsMenu);

var _objectsSoundControl = require('objects/SoundControl');

var _objectsSoundControl2 = _interopRequireDefault(_objectsSoundControl);

var MainMenu = (function (_Phaser$State) {
	_inherits(MainMenu, _Phaser$State);

	function MainMenu() {
		_classCallCheck(this, MainMenu);

		_get(Object.getPrototypeOf(MainMenu.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(MainMenu, [{
		key: 'create',
		value: function create() {
			// Set the game background colour
			this.game.stage.backgroundColor = '#8e8869';
			this.game.renderer.renderSession.roundPixels = true;

			this.createHeader();
			this.createFooter();

			var mainMenuOptions = {
				'title': '- use arrow keys -',
				'items': [{
					'label': 'Start Game',
					'callback': _.bind(this.choosePlayer, this)
				}, {
					'label': 'High scores',
					'callback': _.bind(this.showHighScores, this)
				}, {
					'label': 'Credits',
					'callback': _.bind(this.showCredits, this)
				}]
			};
			this.mainMenu = new _objectsMenu2['default'](mainMenuOptions, this.game);
			this.playerMenu = null;

			// Sound related stuff
			this.soundControl = new _objectsSoundControl2['default'](this.game);
			this.music = this.game.add.audio('menu', this.game.Settings.musicVolume, true);
			this.music.play();
		}
	}, {
		key: 'choosePlayer',
		value: function choosePlayer() {
			this.mainMenu.destroy();
			var playerMenuOptions = {
				'title': '- choose player -',
				'items': [{
					'label': 'Groom',
					'callback': _.bind(function () {
						this.game.Settings.characterType = 'groom';
						this.chooseName();
					}, this)
				}, {
					'label': 'Bride',
					'callback': _.bind(function () {
						this.game.Settings.characterType = 'bride';
						this.chooseName();
					}, this)
				}]
			};
			this.playerMenu = new _objectsMenu2['default'](playerMenuOptions, this.game);
		}
	}, {
		key: 'chooseName',
		value: function chooseName() {
			// Destroy prevoius menu
			this.playerMenu.destroy();

			var nameDescription = this.game.add.text(this.game.width / 2, 220, 'Welcome ' + this.game.Settings.player.playerName);
			nameDescription.anchor.set(0.5);
			nameDescription.align = 'center';
			nameDescription.font = 'arcade';
			nameDescription.fontSize = 30;
			nameDescription.fill = '#504c39';

			// let inputWidth = 200;
			// var input = this.game.add.inputField(this.game.width/2-inputWidth/2, 220,{
			//   font: '30px arcade',
			//   fill: '#212121',
			//   width: inputWidth,
			//   padding: 10,
			//   borderWidth: 3,
			//   borderColor: '#0b77a5',
			//   borderRadius: 4,
			//   placeHolder: 'BSP Username',
			// });
			// input.setText(this.game.Settings.player.playerName);
			// input.startFocus();

			// var input2 = this.game.add.inputField(this.game.width/2-inputWidth/2, 300,{
			// 	font: '30px arcade',
			// 	fill: '#212121',
			// 	width: inputWidth,
			// 	padding: 10,
			// 	borderWidth: 3,
			// 	borderColor: '#0b77a5',
			// 	borderRadius: 4,
			// 	placeHolder: 'BSP Password',
			// });
			// input2.setText(this.game.Settings.player.playerPassword);

			var nameDescription = this.game.add.text(this.game.width / 2, 300, 'Press ENTER !');
			nameDescription.anchor.set(0.5);
			nameDescription.align = 'center';
			nameDescription.font = 'arcade';
			nameDescription.fontSize = 25;
			nameDescription.fill = '#504c39';

			// Register
			this.game.input.keyboard.onUpCallback = _.bind(function (e) {
				if (e.keyCode == Phaser.Keyboard.ENTER) {
					// this.game.Settings.player.playerName = input.value;
					// this.game.Settings.player.playerPassword = input2.value;
					this.startGame();
				}
			}, this);
		}
	}, {
		key: 'showCredits',
		value: function showCredits() {
			this.state.start('Credits');
		}
	}, {
		key: 'showHighScores',
		value: function showHighScores() {
			this.state.start('HighScores');
		}
	}, {
		key: 'startGame',
		value: function startGame() {
			this.state.start('Main');
			// let that=this
			// $.ajax({
			// 	type: "POST",
			// 	url: "https://blackstageplay.herokuapp.com/api/users/login",
			// 	dataType: "json",
			// 	data: {'username':that.game.Settings.player.playerName, 'password':that.game.Settings.player.playerPassword},
			// 	success: function(res) {
			// 		that.game.Settings.token = res.token
			// 		that.state.start('Main');
			// 	},
			// 	error:function(err){
			// 		console.log(err)
			// 	}
			// })
		}
	}, {
		key: 'shutdown',
		value: function shutdown() {
			this.mainMenu.destroy();
			this.music.destroy();
		}
	}, {
		key: 'createHeader',
		value: function createHeader() {
			var headerOffset = 80;

			// Create left hearth and animate it
			var leftHeart = this.game.add.sprite(this.game.width / 2 - 150, headerOffset + 5, 'heart');
			var leftHeartAnimation = new _animationsPoppingHeart2['default'](leftHeart, this.game).animate();

			// Create right hearth and animate it
			var rightHeart = this.game.add.sprite(this.game.width / 2 + 110, headerOffset + 5, 'heart');
			var rightHearthAnimation = new _animationsPoppingHeart2['default'](rightHeart, this.game).animate();

			// Add bride and groom images to the logo
			var bride = this.game.add.image(this.game.width / 2 - 170, headerOffset - 5, 'brideLarge');
			var groom = this.game.add.image(this.game.width / 2 + 100, headerOffset - 5, 'groomLarge');

			// Add WEDDING text
			var weddingText = this.game.add.text(this.game.width / 2, headerOffset, 'WEDDING');
			weddingText.anchor.set(0.5);
			weddingText.align = 'center';
			weddingText.font = 'arcade';
			weddingText.fontSize = 50;
			weddingText.fill = '#333023';

			// Add RUN text
			var weddingText = this.game.add.text(this.game.width / 2 + 3, headerOffset + 35, 'RUN');
			weddingText.anchor.set(0.5);
			weddingText.align = 'center';
			weddingText.font = 'arcade';
			weddingText.fontSize = 120;
			weddingText.fill = '#504c39';
		}
	}, {
		key: 'createFooter',
		value: function createFooter() {

			var firstLine = "copyright © 2017 - zsondre.hu";
			var secondLine = "Music by Hunor Sukosd";
			var footerHeight = 80;

			var graphics = this.game.add.graphics(0, 0);
			graphics.beginFill(0xF99601);
			graphics.lineStyle(2, 0xF99601, 1);
			graphics.drawRect(0, this.game.world.height - footerHeight, this.game.width, footerHeight);
			graphics.endFill();

			var firstLineText = this.game.add.text(this.game.width / 2, this.game.world.height - footerHeight + 30, firstLine);
			firstLineText.anchor.set(0.5);
			firstLineText.align = 'center';
			firstLineText.font = 'arcade';
			firstLineText.fontSize = 20;
			firstLineText.fill = '#FFFFFF';
			firstLineText.strokeThickness = 0;

			var secondLineText = this.game.add.text(this.game.width / 2, this.game.world.height - footerHeight + 50, secondLine);
			secondLineText.anchor.set(0.5);
			secondLineText.align = 'center';
			secondLineText.font = 'arcade';
			secondLineText.fontSize = 20;
			secondLineText.fill = '#FFFFFF';
			secondLineText.strokeThickness = 0;
		}
	}]);

	return MainMenu;
})(Phaser.State);

exports['default'] = MainMenu;
module.exports = exports['default'];

},{"animations/PoppingHeart":1,"objects/Menu":8,"objects/SoundControl":12}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var Preload = (function (_Phaser$State) {
	_inherits(Preload, _Phaser$State);

	function Preload() {
		_classCallCheck(this, Preload);

		_get(Object.getPrototypeOf(Preload.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {

			var game = this.game;
			$(document).ready(function () {
				var url = new URL(window.location.href);
				var searchParams = new URLSearchParams(url.search);
				_settings2['default'].player.playerName = searchParams.get('userName');

				var API_ENTRY_ID = searchParams.get('entry');
				var API_BASE_URL = 'https://cdn.contentful.com';
				var API_SPACE_ID = 'rwrineo0wycw';
				var API_TOKEN = 'de5ee9b55e1b5e614178fc4439c768cccac1d41b1adcfe43e83b793a37dbfef4';

				$.ajax({
					type: "GET",
					url: API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries/' + API_ENTRY_ID + '?access_token=' + API_TOKEN + '&content_type=artist',
					dataType: "json",
					success: function success(res) {
						console.log("vision:4.0");
						_settings2['default'].artistName = res.fields.slug;
						_settings2['default'].backgroundImageId = res.fields.backgroundImage.sys.id;
						_settings2['default'].backgroundMusicId = res.fields.backgroundMusic.sys.id;

						$.ajax({
							type: "GET",
							url: API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries?access_token=' + API_TOKEN + '&content_type=artist',
							dataType: "json",
							success: function success(res) {
								var s = res.includes.Asset.filter(function (image) {
									return image.sys.id === _settings2['default'].backgroundImageId;
								});
								var m = res.includes.Asset.filter(function (music) {
									return music.sys.id === _settings2['default'].backgroundMusicId;
								});
								var imgURL = s[0].fields.file.url;
								_settings2['default'].backgroundMusicURL = m[0].fields.file.url;

								$('body').css({ 'background': 'url(' + imgURL + ') no-repeat center center fixed', 'background-size': 'cover' });
								// Load sounds
								if (_settings2['default'].backgroundMusicURL) {
									game.load.audio('menu', [{ uri: '' + _settings2['default'].backgroundMusicURL, type: "mp3" }]);
								}
							},
							error: function error(err) {
								console.log(err);
							}
						});
					},
					error: function error(err) {
						console.log(err);
					}
				});
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
	}, {
		key: 'create',
		value: function create() {
			// Activate input plugin
			this.game.plugins.add(PhaserInput.Plugin);
			this.game.state.start("MainMenu");
		}
	}]);

	return Preload;
})(Phaser.State);

exports['default'] = Preload;
module.exports = exports['default'];

},{"../settings":15}]},{},[2])
//# sourceMappingURL=game.js.map
