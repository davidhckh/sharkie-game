import Sounds from "./utils/sounds.class.js";
import Game from "./game.class.js";

export default class UI {
    constructor() {
        this.game = new Game();

        this.setup();
    };

    /**define all required elements */
    defineElements() {
        this.coinCounter = document.getElementById('coin-amount-label');
        this.poisonCounter = document.getElementById('poison-amount-label');
        this.winContainer = document.getElementById('win-container');
        this.deadContainer = document.getElementById('dead-container');
        this.healthbar = document.getElementById('health-bar');
        this.bossHealthbar = document.getElementById('final-boss-health-bar');
        this.soundButton = document.getElementById('sound-button');
        this.musicButton = document.getElementById('music-button');
        this.controlButton = document.getElementById('control-button');
        this.tutorialContainer = document.getElementById('tutorial-container');
        this.controlsContainer = document.getElementById('controls-container');
        this.questContainer = document.getElementById('quest-dialog-container');
    };

    /**setup everything and hide win and death containers */
    setup() {
        this.defineElements();
        this.setupCoins();
        this.setupPoison();
        this.updateHealthbar();
        this.restartButtonClick();
        this.updateBossHealthbar();
        this.setupSoundsButton();
        this.setupMusicButton();

        this.winContainer.classList.add('hide');
        this.deadContainer.classList.add('hide');
    };

    /**on play button click */
    playClick() {
        if (!this.game.sounds) {
            /**init sounds on main sceen's play button click */
            this.game.sounds = new Sounds();
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);

            /**show tutorial */
            this.openControls();

            gsap.to(document.getElementById('opening-screen'), { opacity: 0, duration: .4 })
            setTimeout(() => {
                document.getElementById('opening-screen').classList.add('hide');
            }, 500);
        };
    };

    /**On Controls Button Click */
    openControls() {
        /**show controls only */
        this.tutorialContainer.classList.remove('hide');
        this.controlsContainer.classList.remove('hide');
        this.questContainer.classList.add('hide');

        /**freez character during controls open */
        this.game.world.level.character.freeze = true;

        /**play button click sound */
        if (this.questShown) {
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);
        };

        /** zomm in */
        gsap.fromTo(this.controlsContainer, { scale: 0 }, { scale: 1, duration: .2 });
    };

    /**show quest after controls during tutorial (only if tutorial wasn't played yet) */
    showQuest() {
        if (this.game.questShown) {
            this.closeTutorial();
        } else {
            this.game.questShown = true;

            /**hide controls and show quest */
            this.controlsContainer.classList.add('hide');
            this.questContainer.classList.remove('hide');

            /**play button sound */
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);
        };
    };

    /**close tutorial (quest is last) */
    closeTutorial() {
        this.tutorialContainer.classList.add('hide');

        /**play button click sound */
        this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);

        /**unfreeze character */
        this.game.world.level.character.freeze = false;
    };

    /**set sounds button background to gray if local storage contains muted sounds == true */
    setupSoundsButton() {
        if (localStorage.getItem('soundsMuted') == 'true') {
            this.soundButton.style.background = 'gray';
        };
    };

    /**mute or unmute sounds */
    muteSounds() {
        if (this.game.sounds.soundsMuted) {
            /**unmute sounds and update local storage*/
            this.game.sounds.soundsMuted = false;
            this.soundButton.style.background = 'rgb(54, 162, 250)';
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);
            localStorage.setItem('soundsMuted', false);
        } else {
            /**mute sounds and update local storage */
            this.game.sounds.soundsMuted = true;
            this.soundButton.style.background = 'gray';
            localStorage.setItem('soundsMuted', true);
        };
    };

    /**set music button background to gray if local storage contains muted music == true */
    setupMusicButton() {
        if (localStorage.getItem('musicMuted') == 'true') {
            this.musicButton.style.background = 'gray';
        };
    };

    /**mute or unmute music */
    muteMusic() {
        if (this.game.sounds.musicMuted) {
            /**unmute music and update local storage */
            this.game.sounds.musicMuted = false;
            this.musicButton.style.background = 'rgb(54, 162, 250)';
            this.game.sounds.resumeMusic();
            localStorage.setItem('musicMuted', false);
        } else {
            /**mute music and update local storage */
            this.game.sounds.musicMuted = true;
            this.musicButton.style.background = 'gray';
            this.game.sounds.pauseAllMusic();
            localStorage.setItem('musicMuted', true);
        };
        /**play button click sound */
        this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);
    };

    /**Win Screen */
    showWinContainer() {
        /**show win container */
        this.winContainer.classList.remove('hide');

        /***animation */
        gsap.fromTo(this.winContainer, { opacity: 0 }, { opacity: 1, delay: 2, duration: .3 });
        gsap.fromTo(document.getElementById('win-sharkie'), { y: this.game.canvas.height / 2 }, { y: 0, duration: 0.4, delay: 2, ease: Power1.easeOut });

        /*set total coins collected in win screen */
        document.getElementById('win-collected-coins-label').innerHTML = 'You collected ' + this.collectedCoins + ' out of ' + this.totalCoins + ' coins!';
    };

    /**show dead container */
    showDeadContainer() {
        this.deadContainer.classList.remove('hide');

        /**animation */
        gsap.fromTo(this.deadContainer, { opacity: 0 }, { opacity: 1, delay: 2, duration: 1 });
    };

    /**
     * on restart button click -> win or lose screen
     */ 
    restartButtonClick() {
        this.game.events.on('restart', () => {
            this.game.restart();

            /**play button click sound */
            this.game.sounds.playSound('../assets/sounds/button-click.mp3', false, 0.2);
        });
    };

    /**
     * Character healthbar
     */
    /**update characer healthbar */
    updateHealthbar() {
        let character = this.game.world.level.character;

        /**set healthbar width */
        this.healthbar.style.width = character.health + '%';

        /**set color gradient of healthbar */
        if (character.health > 50) {
            this.healthbar.style.background = 'linear-gradient(#b5ff2b, #82c900)';
        } else if (character.health <= 50 && character.health > 30) {
            this.healthbar.style.background = 'linear-gradient(#FFE47C, #FFCF00)';
        } else {
            this.healthbar.style.background = 'linear-gradient(#FF9C75, #FF4B00)';
        };
    };

    /**fill character healthbar */
    fillHealthbar() {
        this.healthbar.style.width = '100%';
        this.updateHealthbar();
    };

    /**
     * Boss healthbar
     */
    /**update boss healthbar */
    updateBossHealthbar() {
        let boss = this.game.world.level.boss;

        /**set width */
        this.bossHealthbar.style.width = boss.health + '%';

        /**set color gradient */
        if (boss.health > 50) {
            this.bossHealthbar.style.background = 'linear-gradient(#b5ff2b, #82c900)';
        } else if (boss.health <= 50 && boss.health > 30) {
            this.bossHealthbar.style.background = 'linear-gradient(#FFE47C, #FFCF00)';
        } else {
            this.bossHealthbar.style.background = 'linear-gradient(#FF9C75, #FF4B00)';
        };

        /**hide boss healtbar if boss isnt introduced yet */
        if (!this.game.world.level.boss.isIntroducing) {
            document.getElementById('final-boss-health-bar-container').classList.add('hide');
        };
    };


    /**fade in boss healthbar during introduction and update*/
    fadeInBossHealthbar() {
        document.getElementById('final-boss-health-bar-container').classList.remove('hide');
        gsap.fromTo(document.getElementById('final-boss-health-bar-container'), { opacity: 0, }, { opacity: 1, duration: 0.5, delay: 1.6 });

        this.updateBossHealthbar();
    };

    /**
     * Coins
     */
    /** reset coins */
    setupCoins() {
        this.collectedCoins = 0;
        this.totalCoins = this.game.world.level.coins.length;

        this.updateCoins();
    };

    /**update coin counter */
    updateCoins() {
        this.coinCounter.innerHTML = this.collectedCoins + ' / ' + this.totalCoins;
    };

    /**add coin and update */
    addCoin() {
        this.collectedCoins += 1;
        this.updateCoins();
    };

    /**
     * Poison
     */
    /** reset poison counter*/
    setupPoison() {
        this.collectedPoison = 0;
        this.totalPoison = this.game.world.level.poison.length;

        document.getElementById('poison-container').classList.remove('unlocked-poison');

        this.updatePoison();
    };

    /**update poison UI */
    updatePoison() {
        this.poisonCounter.innerHTML = this.collectedPoison + ' / ' + this.totalPoison;

        if (this.collectedPoison == this.totalPoison) {
            this.unlockPoisonBubbles();
        };
    };

    /**on poison collected add poison adn update */
    addPoison() {
        this.collectedPoison += 1;
        this.updatePoison();
    };

    /**unlock poison bubble */
    unlockPoisonBubbles() {
        let poisonContainer = document.getElementById('poison-container');

        poisonContainer.classList.add('unlocked-poison');

        this.game.world.level.character.poisonBubbles = true;
    };
};