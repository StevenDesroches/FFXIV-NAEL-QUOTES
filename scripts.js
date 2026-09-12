const QUOTES = [
    {
        string: "Unbending iron, take fire and descend!",
        answers: ["OUT", "STACK", "SPREAD"]
    },
    {
        string: "Unbending iron, descend with fiery edge!",
        answers: ["OUT", "SPREAD", "STACK"]
    },
    {
        string: "From hallowed moon I bare iron, in my descent to wield!",
        answers: ["IN", "OUT", "SPREAD"]
    },
    {
        string: "From hallowed moon I descend, upon burning earth to tread!",
        answers: ["IN", "SPREAD", "STACK"]
    },
]

let didWeWin = false;
let currentQuote;

const SECONDS = 7;
var TIMER_INTERVAL;
let startEl = document.getElementById('start');
let restartEl = document.getElementById('restart');
let timerEl = document.getElementById('timer');
let quoteEl = document.getElementById('quote');

let quotePart1El = document.getElementById('quote_part1');
let quotePart2El = document.getElementById('quote_part2');
let quotePart3El = document.getElementById('quote_part3');

let gameEl = document.getElementById('game');
let victoryEl = document.getElementById('victory');
let defeatEl = document.getElementById('defeat');

function initRadios() {
    let nodeList = document.querySelectorAll('input[type="radio"]');
    nodeList.forEach(function (radio) {
        radio.addEventListener('click', function (event) {

          let value = this.value;
          let partNumber = parseInt(this.getAttribute('data-part'));
          let answerIndex = partNumber - 1;

          let nodeGroupList = document.querySelectorAll(`input[type="radio"][data-part="${partNumber}"]`);
          nodeGroupList.forEach(function(groupRadio){
            groupRadio.disabled = true;
          });

          
          

          setTimeout(()=>{

            if(currentQuote.answers[answerIndex] == value){

              switch(partNumber){
                case 1:
                  quotePart1El.classList.add('hide');
                  quotePart2El.classList.remove('hide');
                  break;
                case 2:
                  quotePart2El.classList.add('hide');
                  quotePart3El.classList.remove('hide');
                  break;
                case 3:
                  game.classList.add('hide');
                  victoryEl.classList.remove('hide');
                  didWeWin = true;
                  break;
              }
              
              
              
            } else {
                  game.classList.add('hide');
                  defeatEl.classList.remove('hide');
            }
          }, 500)
            
          
        });
    });
}


function init() {
    startEl.addEventListener('click', () => start());
    restartEl.addEventListener('click', () => start());

  initRadios();
}
init();


function resetRadios(){
  let nodeList = document.querySelectorAll('input[type="radio"]');
   nodeList.forEach(function (radio) {
     radio.checked = false;
     radio.disabled = false;
   });
}

function start() {

    resetRadios();

    currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    quoteEl.textContent = currentQuote.string;

    startTimer(SECONDS, timerEl);

    startEl.classList.add('hide');
    restartEl.classList.remove('hide');
    timerEl.classList.remove('hide');
    quoteEl.classList.remove('hide');

    quotePart1El.classList.remove('hide');
    quotePart2El.classList.add('hide');
    quotePart3El.classList.add('hide');
  
    game.classList.remove('hide');
    victoryEl.classList.add('hide');
    defeatEl.classList.add('hide');

  didWeWin = false;
  

    




}




function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let tickTimer = function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds
    };

    //tickTimer();
    if (TIMER_INTERVAL) {
        clearInterval(TIMER_INTERVAL);
        TIMER_INTERVAL = null;
    }
    TIMER_INTERVAL = setInterval(function () {
        tickTimer();
        if (--timer < 0) {
            timer = 0;
          if(!didWeWin){
          game.classList.add('hide');
          defeatEl.classList.remove('hide');
          }

        }
    }, 1000);
}
