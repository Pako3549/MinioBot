var action = "";
var ultraSoundMode = false;
var walkForward = false;
var langPopup = false;
var bot = document.querySelector(".bot-img");
var msg = document.querySelector(".msg");
var standardImg = "url(img/minions-imgs/minions.svg)";
var interval;




function changeBotImg(img, text){

    if(ultraSoundMode){ img = img.replace("url(img/minions-imgs/", "url(img/minions-imgs/upgraded-imgs/"); }

    bot.style.backgroundImage = img;
    msg.innerText = text;
    msg.style.display = "block";

    if(text === null || text === undefined || msg.innerText === null || msg.innerText === undefined){ msg.style.display = "none" }

    setTimeout(function(){
        if(!ultraSoundMode){ resetBotImg(); }
        // else{ bot.style.backgroundImage = standardImg; msg.style.display = "none" }
    }, 2500);
}

function resetBotImg(){
    bot.style.backgroundImage = standardImg;
    msg.innerText = null;
    if(!ultraSoundMode){msg.style.display = "none"}
}



/*     MOVEMENT FUNCTIONs     */
function walk_forward(){
    walkForward = !walkForward;
    var walkForwardBtn = document.querySelector(".walk_forward");
    let i = 0;

    if(walkForward){
        walkForwardBtn.innerText = "STOP";
        interval = setInterval(() => {
            if(i % 2 === 0){
                bot.style.backgroundImage =  "url(img/minions-imgs/walk-forward-dx-leg.svg";
            } else{ bot.style.backgroundImage =  "url(img/minions-imgs/walk-forward-sx-leg.svg"; }
            i++;
        }, 250);
    } else{
        walkForwardBtn.innerText = "WALK FORWARD";
        console.log("stop");
        clearInterval(interval);
        resetBotImg();
    }
}
function walk_back(){}

function walk_forward_two(){
    // cammina = !cammina;
    walkForward = !walkForward;
    var walkDiv = document.querySelector(".walk-div")
    var walkForwardBtn = document.querySelector(".walk_forward");
    let i = 0;

    if(walkForward){
        walkForwardBtn.innerText = "STOP";
        walkDiv.style.display = "block"
        bot.style.display = "none"
        var interval = setInterval(() => {
            if(i % 2 === 0){
                walkDiv.style.backgroundImage =  "url(img/minions-imgs/walk-forward-dx-leg.svg";
            } else{ walkDiv.style.backgroundImage =  "url(img/minions-imgs/walk-forward-sx-leg.svg"; }
            i++;
        }, 250);

    } else{ walkForwardBtn.innerText = "WALK FORWARD"; clearInterval(interval); interval = null; console.log(interval); resetBotImg(); walkDiv.style.display = "none"; bot.style.display = "block" }
}

function walk_forward_three() {
    walkForward = !walkForward;
    var walkForwardBtn = document.querySelector(".walk_forward");

    if (walkForward) {
        walkForwardBtn.innerText = "STOP";
        console.log("walking forward");
        let i = 0;

        interval = setInterval(() => {
            if (i % 2 === 0) {
                bot.style.backgroundImage = "url(img/minions-imgs/walk-forward-dx-leg.svg)";
            } else {
                bot.style.backgroundImage = "url(img/minions-imgs/walk-forward-sx-leg.svg)";
            }
            i++;
        }, 250);
    } else {
        walkForwardBtn.innerText = "WALK FORWARD";
        console.log("stop");
        clearInterval(interval);
        resetBotImg();
    }
}



/*     OTHER FUNCTIONS     */
function toggleUltraSoundMode(){
    var ultraSoundModeBtn = document.querySelector(".ultraSoundModeBtn");
    ultraSoundMode = !ultraSoundMode

    if(ultraSoundMode){
        standardImg = "url(img/minions-imgs/minions.svg)";
        ultraSoundModeBtn.innerText = "ULTRASOUND MODE: ON";
        changeBotImg("url(img/minions-imgs/angry.svg)", "Activing obstacle recognition mode...");
        setTimeout(function(){ changeBotImg(standardImg, "Obstacle Recognition Mode: Active"); }, 2500);
    } else{
        standardImg = "url(img/minions-imgs//minions.svg)";
        ultraSoundModeBtn.innerText = "ULTRASOUND MODE: OFF";
        changeBotImg("url(img/minions-imgs/angry.svg)", "Deactiving obstacle recognition mode...");
        setTimeout(function(){ changeBotImg(standardImg, null); }, 2500);
    }

}
function toggleLangPopup(){
    var langBtn = document.querySelector(".lang-popup");
    langPopup = !langPopup;

    if(langPopup == true){ langBtn.style.display = "grid" }
    else{ langBtn.style.display = "none" }
}