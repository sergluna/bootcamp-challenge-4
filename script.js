// Selects element by class
var timeEl = document.querySelector(".time");

// Selects question and answers
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    questions: "What is 2+2?",
    choice1: '1',
    choice2: '2',
    choice3: '4',
    choice4: '3',
    answer: 2,
  },
  {
    questions: "What is 2+2?",
    choice1: '1',
    choice2: '2',
    choice3: '4',
    choice4: '3',
    answer: 2,
  },
  {
    questions: "What is 2+2?",
    choice1: '1',
    choice2: '2',
    choice3: '4',
    choice4: '3',
    answer: 2,
  },
  {
    questions: "What is 2+2?",
    choice1: '1',
    choice2: '2',
    choice3: '4',
    choice4: '3',
    answer: 2,
  },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('./end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.questions

  choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)
  acceptingAnswers = true  
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    
    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
    'incorrect'

    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() => {
      selectedChoice.parentElement.classList.add(classToApply)
      getNewQuestion()

    }, 1000)

  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()

// Funtion for timer
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time left: " + secondsLeft + " seconds";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
    //   sendMessage();
    }

  }, 1000);
}

