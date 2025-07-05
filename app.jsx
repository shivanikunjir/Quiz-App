const questions=[
    {
        question:"Which company originally created JavaScript in 1995?",
        answers:[
            {text:"Netscape" , correct:true},
            {text:"Microsoft", correct:false},
            {text:"Sun Microsystem", correct:false},
            {text:"IBM", correct:false}
        ]
    },

    {
        question:"Which keyword was introduced in ES6 to declare a read‑only variable?",
        answers:[
             {text:"Var" , correct:false},
             {text:"let" , correct:false},
             {text:"Const" , correct:true},
             {text:"Static" , correct:false},
        ]

    },
    {
        question: "Which built‑in method converts a JSON string into a JavaScript object?",
        answers:[
         {text:"JSON.convert()" , correct:false},
         {text:"JSON.parse()" , correct:true},
         {text:"JSON.stringify()" , correct:false},
         {text:"JSON.objectify()" , correct:false},
        ]
    },
    {
        question: "Which symbol is used for JavaScript's optional chaining operator?",
        answers:[
            {text:"?." , correct:true},
            {text:"??" , correct:false},
            {text:"::" , correct:false},
            {text:"??=" , correct:false},
        ]
    },
    {
        question: " _____ is NOT a JavaScript Framework or Libraray?.",
        answers:[
             {text:"Angular" , correct:false},
              {text:"Vue" , correct:false},
             {text:"Laravel" , correct:false},
             {text:"Svelte" , correct:false},
        ]
    }
       
];

const questionElement = document.getElementById("question");
const answerButton=document.getElementById("answe-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        button.addEventListener("click", selectAnswer);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();