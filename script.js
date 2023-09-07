// Helper function to shuffle an array using Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const questions = [
  { text: "The sky indigo", answer: false },
  { text: "The moon is made of cheese.", answer: false },
  { text: "Water boils at 100 degrees Celsius.", answer: true },
  { text: "Paris is the capital of Belgium.", answer: false },
  {text: "The Pacific Ocean is larger than the Atlantic Ocean.",answer: true,},
  { text: "There are 50 states in the United States.", answer: true },
  { text: "There are 25 regions in the Ghana.", answer: false },
  { text: "Pluto is still classified as a planet.", answer: false },
  { text: "The Nile River is the longest river in the world.", answer: true },
  { text: "DNA stands for Deoxyribonucleic Acid.", answer: true },
  { text: "The first airplane flight was in 1803.", answer: false },
  {text: "The cruciate ligament is found in the knee.",answer: true,},
  {text: "Spaghetto is the singular form of the word spaghetti.",answer: true,},
  {text: "Pinocchio was Walt Disney’s first animated feature film in full color.",answer: false,},
  { text: "The capital of Australia is Sydney.", answer: false },
  {text: "The longest river in the world is the Amazon River.",answer: false,},
  { text: "Bats are blind.", answer: false },
  {text: "The blue whale is the biggest animal to have ever lived.",answer: true,},
  { text: "The Earth revolves around the moon.", answer: false },
  { text: "Bananas are berries.", answer: true },
  { text: "Mount Everest is the tallest mountain in the world.", answer: true },
  { text: "Antarctica is the driest continent on Earth.", answer: true },
  { text: "The Great Wall of China is visible from space.", answer: false },
  { text: "Sound travels faster in water than in air.", answer: true },
  { text: "A group of lions is called a pack.", answer: false },
  { text: "The Eiffel Tower is made of iron.", answer: true },
  { text: "Gold is a good conductor of electricity.", answer: true },
  { text: "Venus is the coldest planet in our solar system.", answer: false },
  { text: "The chemical symbol for water is H2O.", answer: true },
  { text: "Jupiter has the shortest day in the solar system.", answer: true },
  // Add more questions here
];

// Shuffle the questions array before starting the game
shuffleArray(questions);

let currentQuestionIndex = 0;
let correctAnswers = 0;
let isProcessing = false; // Flag to prevent rapid button clicks

const questionElement = document.getElementById("question");
const trueButton = document.getElementById("true-button");
const falseButton = document.getElementById("false-button");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");

// Initial score and total count display
scoreElement.textContent = `Score: 0 / ${questions.length}`;
totalElement.textContent = `Question: 0 / ${questions.length}`;

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionElement.textContent = `${questions[currentQuestionIndex].text}`;
    trueButton.style.display = "block";
    falseButton.style.display = "block";
    questionElement.style.color = "white"; // Reset text color
  } else {
    // End of the game
    questionElement.textContent = "Game Over!";
    questionElement.style.color = "white"; // Set text color to black
    trueButton.style.display = "none";
    falseButton.style.display = "none";

    // Add the "Play Again" button
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.classList.add("btn2");
    playAgainButton.addEventListener("click", () => {
      // Reset the game and shuffle questions again
      currentQuestionIndex = 0;
      correctAnswers = 0;
      shuffleArray(questions);
      showQuestion();
      scoreElement.textContent = `Score: 0 / ${questions.length}`;
      totalElement.textContent = `Question: 0 / ${questions.length}`;
      // Remove the "Play Again" button
      if (playAgainButton.parentNode) {
        playAgainButton.parentNode.removeChild(playAgainButton);
      }
    });
    questionElement.parentNode.appendChild(playAgainButton);
  }
}

function displayResult(isCorrect) {
  if (isCorrect) {
    questionElement.textContent = "Correct!";
    questionElement.style.color = "green"; // Green for correct answers
    correctAnswers++;
  } else {
    questionElement.textContent =
      "Answer is: " + questions[currentQuestionIndex].answer;
    questionElement.style.color = "red"; // Red for wrong answers
  }

  // Update the score immediately
  scoreElement.textContent = `Score: ${correctAnswers} / ${questions.length}`;

  // Update the total count as the game progresses
  totalElement.textContent = `Question: ${currentQuestionIndex + 1} / ${
    questions.length
  }`;

  // Set the processing flag to false after a delay to allow the next question
  setTimeout(() => {
    isProcessing = false;
  }, 1000); // Wait for 1.2 seconds before moving to the next question
}

function checkAnswer(isTrue) {
  if (currentQuestionIndex < questions.length && !isProcessing) {
    isProcessing = true; // Set the processing flag to true to prevent rapid clicks
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (isTrue === correctAnswer) {
      displayResult(true);
    } else {
      displayResult(false);
    }

    setTimeout(() => {
      currentQuestionIndex++;
      showQuestion();
    }, 1000); // Wait for 1.2 seconds before moving to the next question
  }
}

trueButton.addEventListener("click", () => checkAnswer(true));
falseButton.addEventListener("click", () => checkAnswer(false));

showQuestion();
