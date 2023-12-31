var action = "";
var ultraSoundMode = false;
var langPopup = false;

function changeBotImg(value, action){
  var bot = document.querySelector(".bot-img");
  var msg = document.querySelector(".msg");

  if (ultraSoundMode) {
    value = value.replace("url(img/minions-imgs/", "url(img/minions-imgs/upgraded-imgs/");
  }

  bot.style.backgroundImage = value;
  msg.innerText = action;
  msg.style.display = "block";

  setTimeout(function () {
    if (action.includes("Activating") || ultraSoundMode) {
      bot.style.backgroundImage = "url(img/minions-imgs/upgraded-imgs/minions.svg)";
      msg.innerText = "Obstacle Recognition Mode: Active";
    } else if(value === 'url(img/minions-imgs/sx-leg.svg)'){
      let counter = 0;

      setInterval(() => {
        if (counter < 20) {
          if (counter % 2 === 0) {
            setTimeout(() => {
              bot.style.backgroundImage = "url(img/minions-imgs/sx-leg.svg)";
            }, 100);
          } else {
            setTimeout(() => {
              bot.style.backgroundImage = "url(img/minions-imgs/dx-leg.svg)";
            }, 100);
          }
          counter++;
        } else {
          clearInterval(intervalId);
        }
      }, 250);

    } else {
      bot.style.backgroundImage = "url(img/minions-imgs/minions.svg)";
      msg.innerText = "";
      msg.style.display = "none";
    }
  }, 4000);
}

function toggleUltraSoundMode(){
  var ultraSoundeModeBtn = document.querySelector(".ultraSoundModeBtn");
  ultraSoundMode = !ultraSoundMode;

  if (ultraSoundMode) {
    changeBotImg('url(img/minions-imgs/angry.svg)', 'Activating obstacle recognition mode...');
    ultraSoundeModeBtn.innerText = "ULTRASOUND MODE ON";
  } else {
    changeBotImg('url(img/minions-imgs/angry.svg)', 'Deactivating obstacle recognition mode...');
    ultraSoundeModeBtn.innerText = "ULTRASOUND MODE OFF";
  }
}

function toggleLangPopup(){
  var langBtn = document.querySelector(".lang-popup");
  langPopup = !langPopup;

  if(langPopup == true){ langBtn.style.display = "grid" }
  else{ langBtn.style.display = "none" }
}