/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

const decks = {
  HTML: [
    {
      question: 'What does HTML stand for?',
      answer: 'HyperText Markup Language'
    },
    {
      question: 'What tag is used for inserting a line break',
      answer: 'The <br> tag'
    },
    {
      question: 'What tag is used to create a hyperlink?',
      answer: 'The <a> tag'
    },
    {
      question: 'What attribute and value are used to open a link in a new window or tab?',
      answer: 'target = "_blank"'
    },
    {
      question: 'TRUE or FALSE: Inline elements are normally displayed without starting a new line.',
      answer: 'TRUE'
    },
    {
      question: 'What tag is used to create a numbered list?',
      answer: 'The <ol> tag'
    },
    {
      question: 'What tag is used to insert an image?',
      answer: 'The <img> tag'
    },
    {
      question: 'What tag is used to insert an image?',
      answer: 'The <img> tag'
    }
  ],
  CSS: [
    {
      question: 'What does CSS stand for?',
      answer: 'Cascading Style Sheets'
    },
    {
      question: 'What tag is used to add CSS to an HTML page?',
      answer: 'The <link> tag'
    },
    {
      question: 'Which property is used to change the background color?',
      answer: 'background-color'
    },
    {
      question: 'How do you add a background color for all <h1> elements?',
      answer: 'h1 { background-color: #FFFFFF; }'
    },
    {
      question: 'Which CSS property is used to change the text color of an element?',
      answer: 'color'
    },
    {
      question: 'Which CSS property controls the text size?',
      answer: 'font-size'
    },
    {
      question: 'How do you display hyperlinks without an underline?',
      answer: 'a { text-decoration: none; }'
    }
  ],
  JavaScript: [
    {
      question: 'What tag is used to add JavaScript to an HTML page?',
      answer: 'The <script> tag'
    },
    {
      question: 'What is best way to retrieve an element by its id?',
      answer: 'document.getElementById'
    },
    {
      question: 'How do you create a function in JavaScript?',
      answer: 'function myFunction () { }'
    },
    {
      question: 'How do you invoke a function named "myFunction"?',
      answer: 'myFunction()'
    },
    {
      question: 'How to write an if statement in JavaScript?',
      answer: 'if (x === 5) { }'
    },
    {
      question: 'How do you write a for loop that loops 5 times?',
      answer: 'for (let i = 0; i < 5; i++) { }'
    }
  ]
}

const quiz = {
  deck: null, // shuffle copy of the deck
  card: 0, // index of the current card
  total: 0 // total number of cards
}

const list = Object.keys(decks)
// console.log(list)

const $decks = document.getElementById('decks')
const $quiz = document.getElementById('quiz')
const $question = document.getElementById('question')
const $answer = document.getElementById('answer')
const $prev = document.getElementById('prev')
const $showAnswer = document.getElementById('showAnswer')
const $next = document.getElementById('next')
const $quit = document.getElementById('quit')

/**********************************************
 * New Code Goes Here
 **********************************************/

/**
 * startQuiz function
 * Start a new quiz from the select deck
 * Updates the quiz object
 * Display the first card
 */

function startQuiz (deck) {
  quiz.deck = shuffle(decks[deck])
  // console.log(decks[deck])
  quiz.card = 0
  quiz.total = quiz.deck.length
  showCard()
  $quiz.classList.add('display')
}

/**
 * showCard function
 * Display the current card
 */

function showCard () {
  $answer.classList.remove('display')
  $question.textContent = quiz.deck[quiz.card].question
  $answer.textContent = quiz.deck[quiz.card].answer
}

/**
 * nextCard
 * Displays the next card
 */

function nextCard () {
  // $question.textContent = quiz.deck[quiz.card + 1].question
  quiz.card = (quiz.card === quiz.total - 1 ? 0 : quiz.card + 1)
  // $answer.classList.remove('display')
  // $answer.textContent = quiz.deck[quiz.card + 1].answer
  // quiz.card++
  showCard()
}

/**
 * prevCard
 * Displays the prev card
 */

function prevCard () {
  // quiz.card = (quiz.card === 0 ? quiz.total : quiz.card - 1)
  quiz.card = (quiz.card ? quiz.card : quiz.total) - 1
  showCard()
  // $answer.classList.remove('display')
  // if (quiz.card > 0) {
  //   $question.textContent = quiz.deck[quiz.card - 1].question
  //   $answer.textContent = quiz.deck[quiz.card - 1].answer
  //   quiz.card--
  // } else {
  //   $question.textContent = quiz.deck[quiz.total].question
  //   $answer.textContent = quiz.deck[quiz.total].answer
  //   quiz.card = quiz.total
}

/**
 * showAnswer
 * Displays the answer of the current card
 */

function showAnswer () {
  $answer.classList.toggle('display')
}

/**
 * quitQuiz
 * Quits the current quiz and result the quiz object
 */

function quitDeck () {
  quiz.deck = null
  quiz.card = 0
  quiz.total = 0
  $quiz.classList.remove('display')
}

// const buttons = []
// for (const deck of list) {
//   buttons.push(`<button class="button" data-deck="${deck}">${deck}</button>`)
// }

// $decks.innerHTML = buttons.join('')

$decks.innerHTML = list.map(deck => `<button class="button" data-deck="${deck}">${deck}</button>`).join('')

$decks.addEventListener('click', function (e) {
  if (e.target.classList.contains('button')) {
    console.log(e.target.dataset.deck)
    startQuiz(e.target.dataset.deck)
  }
})

$showAnswer.addEventListener('click', showAnswer)

$next.addEventListener('click', nextCard)

$prev.addEventListener('click', prevCard)

$quit.addEventListener('click', quitDeck)
