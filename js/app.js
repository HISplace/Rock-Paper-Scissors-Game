let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score_board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const win_audio = new Audio('sound_effects/Ta Da-SoundBible.com-1884170640.mp3');
const loses_audio = new Audio('sound_effects/Sad_Trombone-Joe_Lamb-665429450.mp3');


function reset() {
    userScore_span.innerHTML = "0";
    computerScore_span.innerHTML = "0";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function whoIsWin(user,computer) {
    if (user == 3 && computer < 3) {
        result_p.innerHTML = "User Wins!";
        userScore = 0;
        computerScore = 0;
        win_audio.play();
        await sleep(1000);
        reset();
    } else if (computer == 3 && user < 3) {
        result_p.innerHTML = "Computer Wıns";
        userScore = 0;
        computerScore = 0;
        loses_audio.play();
        await sleep(1000);
        reset();
    } else if (user == 3 && computer == 3){
        result_p.innerHTML = "Its a drawww...";
        userScore = 0;
        computerScore = 0;
        await sleep(1000);
        reset();
    }
}


function getComputerChoice() {
    const choices = ["r","p","s"];
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if(letter == "r") return "Rock";
    if(letter == "p") return "Paper";
    return "Scissors";
}

function win(userChoice,computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord} `;
    document.getElementById(userChoice).classList.add('orange-glow');
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('orange-glow') }, 1000);
    whoIsWin(userScore,computerScore);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord} `;
    document.getElementById(userChoice).classList.add('red-glow');
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('red-glow') }, 1000);
    whoIsWin(userScore,computerScore);
}

function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. Its a draw.`;
    document.getElementById(userChoice).classList.add('gray-glow');
    setTimeout(function(){ document.getElementById(userChoice).classList.remove('gray-glow') }, 1000);
    whoIsWin(userScore,computerScore);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice) {
        case 'rs':
        case 'pr':
        case 'sp':
            whoIsWin(userScore,computerScore);
            win(userChoice, computerChoice);
            break;
        case 'sr':
        case 'rp':
        case 'ps':
            whoIsWin(userScore,computerScore);
            lose(userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            whoIsWin(userScore,computerScore);
            draw(userChoice, computerChoice);
            break;            
    }
}

function main() {
    rock_div.addEventListener('click', function(){
        game("r");
    })
    
    paper_div.addEventListener('click', function(){
        game("p");
    })
    
    scissors_div.addEventListener('click', function(){
        game("s");
    })
}

main();