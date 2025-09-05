let currentQuestionIndex = 0;
let score = 0;
let questions = [];

function startQuiz(category) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;

    // Placeholder questions; you can update dynamically later
    if (category === 'math') {
        questions = [
            { question: "12 + 8 = ?", options: ["18","20","21","22"], answer: 1 },
            { question: "5 * 6 = ?", options: ["11","30","35","25"], answer: 1 }
        ];
    } else if (category === 'gk') {
        questions = [
            { question: "Capital of France?", options: ["Paris","Rome","Berlin","Madrid"], answer: 0 },
            { question: "Who discovered gravity?", options: ["Newton","Einstein","Galileo","Tesla"], answer: 0 }
        ];
    }

    showQuestion();
}

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
}

function selectAnswer(selected) {
    if (selected === questions[currentQuestionIndex].answer) {
        score++;
    }
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-btn').style.display = 'none';

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `${score} / ${questions.length}`;
}

function goHome() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}
