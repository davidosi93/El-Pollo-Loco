let canvas;
let world;
let keyboard = new Keyboard();
let soundMute = false;
let fullScreenMode = false;
let chickenKillSound = new Audio('audio/chickenDead.mp3');
let walking_sound = new Audio('audio/running.mp3');
let pickUp_Sound = new Audio('audio/pickUpBottle.mp3');
let pickUp_Sound_Coin = new Audio('audio/pickUpCoin.mp3');
let endbossHit_sound = new Audio('audio/endbossHit.mp3');
let win_sound = new Audio('audio/win.mp3');
let lost_sound = new Audio('audio/lost.mp3');
let intervalIds = [];

/**
 * to stop the intervalls after the game is finished
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * show the youwon div after the game is won
 */
function youWon() {
    intervalIds.forEach(clearInterval);
    document.getElementById('restartDiv').classList.remove('d-none');
    document.getElementById('mobileButtons').classList.add('zIndex-1');
}

/**
 * show the youlost div after the game is lost
 */
function youLost() {
    intervalIds.forEach(clearInterval);
    document.getElementById('restartDivLose').classList.remove('d-none');
    document.getElementById('mobileButtons').classList.add('zIndex-1');
}

/**
 * starts the game
 */
function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    canvas.classList.remove('d-none');
    document.getElementById('mobileButtons').classList.remove('zIndex-1');
    addDisplayNones();
    activateMobileButtons();
}

/**
 * remove unnecessary divs after the is started
 */
function addDisplayNones() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('restartDiv').classList.add('d-none');
    document.getElementById('restartDivLose').classList.add('d-none');
    document.getElementById('controller').classList.add('d-none');
}

/**
 * to turn off or on the sound
 */
function toggleSound() {
    chickenKillSound.muted = !chickenKillSound.muted;
    walking_sound.muted = !walking_sound.muted;
    pickUp_Sound.muted = !pickUp_Sound.muted;
    pickUp_Sound_Coin.muted = !pickUp_Sound_Coin.muted;
    endbossHit_sound.muted = !endbossHit_sound.muted;
    win_sound.muted = !win_sound.muted;
    lost_sound.muted = !lost_sound.muted;
    changeSoundImage();
}

/**
 * change the sound image wether the sound is on or off
 */
function changeSoundImage() {
    if (!soundMute) {
        document.getElementById('volume').classList.add('d-none');
        document.getElementById('mute').classList.remove('d-none');
        soundMute = true;
    } else {
        document.getElementById('volume').classList.remove('d-none');
        document.getElementById('mute').classList.add('d-none');
        soundMute = false;
    }
}

/**
 * set the canvas into the fullscreen size
 */
function fullScreen() {
    let fullscreen = document.getElementById('content');
    if (!fullScreenMode) {
        fullScreenMode = true;
        enterFullscreen(fullscreen);
        addFullScreenSize();
    } else {
        fullScreenMode = false;
        exitFullscreen();
        removeFullScreenSize();
    }
}

/**
 * to adapt the size of the divs into fullscreensize if fullscreensize is played
 */
function addFullScreenSize() {
    document.getElementById('canvas').classList.add('fullscreenSize');
    document.getElementById('restartDiv').classList.add('fullscreenSize');
    document.getElementById('restartDivLose').classList.add('fullscreenSize');
    document.getElementById('controllerDiv').classList.add('fullscreenSize');
}

/**
 * to bring the fullscreensized divs back to the canvas size
 */
function removeFullScreenSize() {
    document.getElementById('canvas').classList.remove('fullscreenSize');
    document.getElementById('restartDiv').classList.remove('fullscreenSize');
    document.getElementById('restartDivLose').classList.remove('fullscreenSize');
    document.getElementById('controllerDiv').classList.remove('fullscreenSize');
}

/**
 * the function to bring the game into fullscreensize
 * 
 * @param {id} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * the function to remove the fullscreensize
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * to show the instruction div
 */
function showControlls() {
    document.getElementById('controllerDiv').classList.remove('d-none');
}

/**
 * to hide the instruction div
 */
function closeControlls() {
    document.getElementById('controllerDiv').classList.add('d-none');
}

/**
 * to set function for the keyboard playing into true
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * to set function for the keyboard playing into false
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * function for the mobile device playing
 */
function activateMobileButtons() {
    document.getElementById('mobileButtonLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobileButtonLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('mobileButtonRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobileButtonRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('mobileButtonThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('mobileButtonThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById('mobileButtonJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('mobileButtonJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}