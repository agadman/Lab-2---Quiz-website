const form = document.getElementById('form'); 

let errorMessages = '';
const errorContainer = document.getElementById('errorMessages'); 
errorContainer.style.display = 'none'; // this is how I got the div to not show when page reload

const errorMessageQuestionValidation = document.getElementById('errorQuestionValidation');

const summaryContainer = document.getElementById('summaryContainer');
let correctAnswers = 0;
let totalQuestions = 0;
let summaryDisplayed = false; // Starting with the summary not being displayed

const correctAnswersArray = [
    'watermelon',               // Question 1
    'massachusetts',            // Question 2
    '13',                       // Question 3
    'john-quincy-adams',        // Question 4
    ['armadillo', 'longhorn'],  // Question 5
    'california'                // Question 6
];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    errorMessages = ''; // This will reset errorMessages for the next submit so they just not build on
    errorMessageQuestionValidation.textContent = '';

    const firstName = document.getElementById('firstName');
    const firstNameValue = firstName.value.trim(); // Note to myself: Trim = method that removes whitespace (spaces, tabs, and newlines) from both ends of a string
    if (!isValidName(firstNameValue)) {
        errorMessages += 'First name is required and must contain only letters<br>';
    }

    const lastName = document.getElementById('lastName');
    const lastNameValue = lastName.value.trim();
    if (!isValidName(lastNameValue)) {
        errorMessages += 'Last name is required and must contain only letters<br>';
    }

    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    if (!isValidEmail(emailValue)) {
        errorMessages += 'Please enter a valid email address<br>';
    }

    displayErrorMessage(errorMessages);

    if (errorMessages === '') { // Check if there are no error messages
        if (!summaryDisplayed) { // Check if summary is not already displayed, is not true
            if (validateForm()) {
                checkAnswers();
            } else {
                errorMessageQuestionValidation.textContent = 'Please answer all required questions (with a red star).';
            }
        }
    }
});

function isValidName(name) { // name is parameter and used for both first- and last name
    // The .test() method is a JavaScript method for regular expression pattern matching. It returns true if the pattern is found in the string and false otherwise. In this case, it checks if the trimmed name string contains only alphabetical characters.
    // The trim() method is used to ensure that the string doesn't have any extra spaces at the beginning or end
    return /^[A-Za-z]+$/.test(name.trim()); 
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function displayErrorMessage(errorMessages) {
    if (errorMessages !== '') {
        errorContainer.style.display = 'block'; // Display the error container only if there are error messages
        errorContainer.innerHTML = errorMessages;
    } else {
        errorContainer.style.display = 'none'; // Hide the error container if there are no error messages
    }
}

function validateForm() {
    const requiredQuestions = [1, 2, 4, 5]; // Array that contains the questions that is required to answer

    for (let i = 0; i < requiredQuestions.length; i++) {
        // For each iteration, it retrieves the question number and constructs a CSS selector to target the checked radio button for that question. 
        const questionNumber = requiredQuestions[i];
        const questionSelector = `input[name="question${questionNumber}"]:checked`;
        const selectedAnswer = document.querySelector(questionSelector); // find the checked radio button for the current question. If no radio button is checked, selectedAnswer will be null

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
    const question5Answers = document.querySelectorAll('input[name="question5"]:checked'); // selects all checked radio buttons with the name attribute "question5" and stores them in the question5Answers 
    if (
        question5Answers.length === 2 && // checks that 2 radio buttons are check (which is the correct answer)
        // Array.from converts question5Answers to an array, and then checks if every answer's value is either "armadillo" or "longhorn". 
        Array.from(question5Answers).every(answer => ['armadillo', 'longhorn'].includes(answer.value)) 
    ) {
        correctAnswers++;
    }
    totalQuestions++;

    // Question 6 
    const question6Answer = document.getElementById('question6').value.trim().toLowerCase();
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