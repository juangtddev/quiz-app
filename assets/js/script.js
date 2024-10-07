
// Question data
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue whale", correct: true },
            { text: "Fin whale", correct: false },
            { text: "Humpback whale", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest animal in the world?",
        answers: [
            { text: "Ant", correct: false },
            { text: "Flea", correct: false },
            { text: "Bee", correct: false },
            { text: "Etruscan shrew", correct: true }
        ]
    },
    {
        question: "Which is the fastest land animal?",
        answers: [
            { text: "Cheetah", correct: true },
            { text: "Lion", correct: false },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the largest bird in the world?",
        answers: [
            { text: "Ostrich", correct: true },
            { text: "Emu", correct: false },
            { text: "Cassowary", correct: false },
            { text: "Kiwi", correct: false }
        ]
    }
];

// DOM elements
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerText = "Next";
    showQuestion();
}

// Display current question and answers
function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

// Reset UI state between questions
function resetState() {
    nextBtn.style.display = "none";
    answerBtns.innerHTML = ''; // Clear previous answers
}

// Handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Apply styles based on correctness
    selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");

    if (isCorrect) score++; // Increment score if correct

    // Show correct answers and disable all buttons
    Array.from(answerBtns.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextBtn.style.display = "block"; // Show 'Next' button
}

// Handle Next button click
function handleNextBtn() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Display final score
function showScore() {
    resetState();
    questionElement.innerText = `Your final score is ${score} out of ${questions.length}!`;
    nextBtn.innerText = "Play Again";
    nextBtn.style.display = "block";
}

// Event listener for Next button
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

// Start the quiz on page load
startQuiz();