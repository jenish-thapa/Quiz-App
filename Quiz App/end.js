let finalScore = document.querySelector("#score");
let score = localStorage.getItem("quizScore");
console.log(score);
finalScore.innerHTML = score;