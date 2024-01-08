const form = document.getElementById('form');
const summaryContainer = document.getElementById('summaryContainer');
let correctAnswers = 0;
let totalQuestions = 0;
let summaryDisplayed = false; // Starting with the summary not being displayed
const errorMessageQuestionValidation = document.getElementById('errorQuestionValidation');

const correctAnswersArray = [
    'watermelon', // Question 1
    'massachusetts', // Question 2
    '13', // Question 3
    'john-quincy-adams', // Question 4
    ['armadillo', 'longhorn'], // Question 5
    'california' // Question 6
];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    errorMessageQuestionValidation.textContent = '';

    if (!summaryDisplayed) { // Check if summary is not already displayed
        if (validateForm()) {
            checkAnswers();
        } else {
            errorMessageQuestionValidation.textContent = 'Please answer all required questions (with a red star).';
        }
    } 
});

function validateForm() {
    const requiredQuestions = [1, 2, 4, 5];

    for (const questionNumber of requiredQuestions) {
        const questionSelector = `input[name="question${questionNumber}"]:checked`;
        const selectedAnswer = document.querySelector(questionSelector);

        if (!selectedAnswer) {
            return false; // Return false if any required question is not answered
        }
    }
    return true; // All required questions are answered
}

function checkAnswers() {
    correctAnswers = 0;
    totalQuestions = 0;

    // Question 1
    if (document.querySelector('input[name="question1"]:checked').value === 'watermelon') {
        correctAnswers++;
    }
    totalQuestions++;

    // Question 2
    if (document.querySelector('input[name="question2"]:checked').value === 'massachusetts') {
        correctAnswers++;
    }
    totalQuestions++;

    // Question 3 
    const question3Answer = document.getElementsByName('question3')[0].value.trim();
    totalQuestions++;
    if (question3Answer !== '') {
        if (question3Answer === '13') {
            correctAnswers++;
        }
    }

    // Question 4
    const question4Answers = document.querySelectorAll('input[name="question4"]:checked');
    if (question4Answers.length === 1 && question4Answers[0].value === 'john-quincy-adams') {
        correctAnswers++;
    }
    totalQuestions++;

    // Question 5
    const question5Answers = document.querySelectorAll('input[name="question5"]:checked');
    if (
        question5Answers.length === 2 &&
        Array.from(question5Answers).every(answer => ['armadillo', 'longhorn'].includes(answer.value))
    ) {
        correctAnswers++;
    }
    totalQuestions++;

    // Question 6 
    const question6Answer = document.getElementsByName('question6')[0].value.trim().toLowerCase();
    totalQuestions++;
    if (question6Answer !== '') {
        if (question6Answer === 'california') {
            correctAnswers++;
        }
    }

    displaySummary();
}

function displaySummary() {
    summaryDisplayed = true; 
    summaryContainer.style.display = 'block';
    document.getElementById('correctAnswers').innerText = `Correct Answers: ${correctAnswers}`;
    document.getElementById('totalQuestions').innerText = `Total Questions: ${totalQuestions}`;

    const answersList = document.getElementById('answersList');

    correctAnswersArray.forEach((answer, index) => {
      const listItem = document.createElement('li');

      // Check if the answer is an array and create a nested ul for the sub-answers
      if (Array.isArray(answer)) {
        const subList = document.createElement('ul');
        answer.forEach(subAnswer => {
          const subListItem = document.createElement('li');
          subListItem.textContent = subAnswer;
          subList.appendChild(subListItem);
        });
        listItem.appendChild(subList);
      } else {
        listItem.textContent = answer;
      }

      answersList.appendChild(listItem);
    });
} 
