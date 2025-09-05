let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let categories = {};

// Initialize categories from external file (questions.js)
function initCategories() {
    categories = window.quizData || {}; // Load from questions.js
    const categoryContainer = document.getElementById('category-buttons');
    categoryContainer.innerHTML = '';

    for (let cat in categories) {
        const btn = document.createElement('button');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.onclick = () => startQuiz(cat);
        categoryContainer.appendChild(btn);
    }
}

// Start Quiz
function startQuiz(category) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
    questions = [...(categories[category] || [])]; // clone array
    showQuestion();
}

// Display current question
function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-container').textContent = q.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('next-btn').style.display = 'none';
}

// Check answer
function selectAnswer(selected) {
    if (selected === questions[currentQuestionIndex].answer) {
        score++;
    }
    document.getElementById('next-btn').style.display = 'inline-block';
}

// Next question or finish
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Show final score
function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `${score} / ${questions.length}`;
}

// Go back to home
function goHome() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Initialize categories on page load
window.onload = initCategories;
