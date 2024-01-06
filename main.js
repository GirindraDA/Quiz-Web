const questions = [
    {
        question: 'Apa binatang terbesar di dunia?',
        answers: [
            { text: 'Paus', correct: true},
            { text: 'Singa', correct: false},
            { text: 'Gorilla', correct: false},
            { text: 'Hiu', correct: false},
        ]
    },
    {
        question: 'Dimana binatang terbesar di dunia berada?',
        answers: [
            { text: 'Darat', correct: false},
            { text: 'Langit', correct: false},
            { text: 'Laut', correct: true},
            { text: 'Atmosfir', correct: false},
        ]   
    },
    {
        question: 'Sebutkan nama planet ke-3 setelah bumi?',
        answers: [
            { text: 'Mars', correct: false},
            { text: 'Saturnus', correct: false},
            { text: 'Jupiter', correct: true},
            { text: 'Uranus', correct: false},
        ]   
    },
    {
        question: 'Sebutkan nama ibukota dari negara Argentina?',
        answers: [
            { text: 'Paris', correct: false},
            { text: 'Barcelona', correct: false},
            { text: 'Munchen', correct: false},
            { text: 'Buenos Aires', correct: true},
        ]   
    },
    {
        question: 'Siapakah pemain sepakbola yang terkenal dengan nomor 7?',
        answers: [
            { text: 'Ronaldo', correct: false},
            { text: 'Cristiano', correct: true},
            { text: 'Manchester United', correct: false},
            { text: 'Liverpool', correct: false},
        ]   
    }
];

const questionElement = document.querySelector('#question');
const answerButton = document.querySelector('#answer-btn');
const nextButton = document.querySelector('#next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach( (answer) => {
        const button = document.createElement('button');
        
        button.textContent = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButton.children).forEach( (btn) => {
        if(btn.dataset.correct === 'true'){
            btn.classList.add('correct');
        }
        btn.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

showQuestion();












































