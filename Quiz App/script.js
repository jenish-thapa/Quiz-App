let questions = [
  {
    question: "Which HTML tag is used to define an inline style?",
    choice1: "<script>",
    choice2: "<css>",
    choice3: "<style>",
    choice4: "<span>",
    answer: 3,
  },
  {
    question: "Which property is used to change the text color in CSS?",
    choice1: "text-color",
    choice2: "font-color",
    choice3: "text-style",
    choice4: "color",
    answer: 4,
  },
  {
    question: "Which of the following is the correct way to comment in HTML?",
    choice1: "// Comment",
    choice2: "<!-- Comment -->",
    choice3: "/* Comment */",
    choice4: "<! Comment>",
    answer: 2,
  },
];

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
}
let index = 0;
let score = 0;
let heading = document.querySelector("#question");
let ch1 = document.querySelector("#a1");
let ch2 = document.querySelector("#a2");
let ch3 = document.querySelector("#a3");
let ch4 = document.querySelector("#a4");
let scoreCard = document.querySelector("#score");
let progress = document.querySelector("#progress");
let progress_label = document.querySelector("#progress_label");
let choices = document.querySelectorAll(".choice");
let timerDisplay = document.querySelector("#timer_box");
let timeLeft = 6;
const shuffledList = shuffle(questions);
const progress_coeff = 194 / questions.length;

function countdown() {
  if (timeLeft > 1) {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
  } else {
    clearInterval();
    timerDisplay.innerText = `Time's Up!`;
    loadNextQuestion();
  }
}

function startTimer() {
  countdown();
  return setInterval(countdown, 1000);
}

let timerInterval = startTimer();

function displayQuestion(index) {
  clearInterval(timerInterval);
  timeLeft = 6;
  timerInterval = startTimer();
  progress.style.width = `${progress_coeff * (index + 1)}px`;
  progress_label.innerText = `Question ${index + 1}/${questions.length}`;
  heading.innerText = shuffledList[index].question;
  ch1.innerText = shuffledList[index].choice1;
  ch2.innerText = shuffledList[index].choice2;
  ch3.innerText = shuffledList[index].choice3;
  ch4.innerText = shuffledList[index].choice4;
}

function resetChoices() {
  choices.forEach((choice) => {
    choice.style.backgroundColor = "";
    choice.disabled = false;
  });
}

function loadNextQuestion() {
    setTimeout(() => {
      index++;
      if (index < shuffledList.length) {
        resetChoices();
        displayQuestion(index);
        ableToSelect = true;
      } else {
        localStorage.setItem("quizScore", score);
        window.location.replace("end.html");
      }
    }, 2000);
}

displayQuestion(index);

for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", () => {
    let userChoice = choices[i].querySelector(".answer").id;
    let answer = Number(userChoice.substring(1));
    if (answer === shuffledList[index].answer) {
      choices[i].style.backgroundColor = "#4fbe69";
      score += 10;
    } else {
      choices[i].style.backgroundColor = "#eb4848";
    }
    clearInterval(timerInterval);
    scoreCard.innerText = score;
    choices.forEach((choice) => (choice.disabled = true));
    loadNextQuestion();
  });
}
