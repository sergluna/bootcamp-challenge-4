const highScoreList = document.querySelector('#highScoresList')
const highScore = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = highScore.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')