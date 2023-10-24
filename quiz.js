const predefinedCredentials = [
    { username: "soubhik", password: "1507" },
    { username: "murthy", password: "1106" },
    { username: "red", password: "yell0wman" },
    { username: "new", password: "acer1" }
];

// DOM elements
const authContainer = document.querySelector(".authentication-container");
const authUsernameInput = document.getElementById("auth-username");
const authPasswordInput = document.getElementById("auth-password");
const loginButton = document.getElementById("login-button");


const questionContainer = document.querySelector(".question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");

const scoreElement = document.getElementById("score");
const leaderboardContainer = document.querySelector(".leaderboard-container");
const leaderboardList = document.getElementById("leaderboard-list");

let currentQuestionIndex = 0;
let score = 0;
let authenticated = false; // Track if the user is authenticated

// Function to check the user's login credentials
loginButton.addEventListener("click", () => {
    const username = authUsernameInput.value;
    const password = authPasswordInput.value;

    // Check if the provided username and password match any predefined credentials
    const match = predefinedCredentials.find((credential) => {
        return credential.username === username && credential.password === password;
    });

    if (match) {
        // Authentication successful
        authenticated = true;
        authContainer.style.display = "none"; // Hide the authentication container
        questionContainer.style.display = "block"; // Show the quiz start container
        loadQuestion();
    } else {
        // Authentication failed
        alert("Authentication failed. Please check your credentials.");
    }
});


// Quiz data
const questions = [
    {   
        type: 'multiple_choice',
        question: "What is the capital of France?",
        choices: ["Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {   
        type: 'multiple_choice',
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Venus"],
        correctAnswer: "Mars"
    },
    {   
        type: 'multiple_choice',
        question: "How many Harry Potter books are there?",
        choices: ["6", "7", "8"],
        correctAnswer: "7"
    },
    {   
        type: 'multiple_choice',
        question: "Which is the largest heading tag in HTML?",
        choices: ["h1", "h6", "head","heading"],
        correctAnswer: "h1"
    },
    {    
        type: 'multiple_choice',
        question: "A is the most common letter used in the English language",
        choices: ["True","False"],
        correctAnswer: "False",
    },
    {
        type: 'multiple_choice',
        question: "Queen Elizabeth II was the second-longest-reigning British monarch",
        choices: ["True","False"],
        correctAnswer: "False",
    },
    {
        type: 'multiple_choice',
        question: "50 Cent and Charlie Chaplin were alive at the same time",
        choices: ["True","False"],
        correctAnswer: "True",
    },
    {
        type: 'open_ended',
        question: "Can you name a gas commonly used for cooling and refrigeration?",
        correctAnswer: "Freon"
    },
    {
        type: 'open_ended',
        question: "Founded in 2007, this music streaming site eventually became incredibly popular, both for independently releasing music and listening",
        correctAnswer: "SoundCloud",
    }

];
//function to randomize qusteions in the quiz
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);



// Function to start the quiz
document.addEventListener("DOMContentLoaded", () => {
    if (authenticated) {
        // If the user is already authenticated, start loading questions
        loadQuestion();
    } else {
        // You can also include a message or any other behavior for non-authenticated users
    }
});


// Function to load and display the current question
async function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    if (currentQuestion.type === 'multiple_choice') {
        // Create answer buttons for multiple-choice questions
        currentQuestion.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(choice));
            choicesElement.appendChild(button);
        });

        
    } else if (currentQuestion.type === 'open_ended') {
        // Use async/await to display the prompt after the question is shown
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for a moment
        const userAnswer = prompt(currentQuestion.question);

        // Check the user's answer
        checkAnswer(userAnswer);


    }
}




// Function to check the user's answer
function checkAnswer(userChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'multiple_choice') {
        // Handle multiple-choice questions
        if (userChoice === currentQuestion.correctAnswer) {
            score++;
        }
    } else if (currentQuestion.type === 'open_ended') {
        // Handle open-ended questions
        const userAnswer = userChoice.trim().toLowerCase();
        const correctAnswer = currentQuestion.correctAnswer.toLowerCase();
        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        // Display the final score, the username, and update the leaderboard
        questionContainer.style.display = "none";
        leaderboardContainer.style.display = "block";
        const leaderboardItem = document.createElement("li");
        const username = authUsernameInput.value;
        leaderboardItem.textContent = `${username}: Score - ${score}`;
        leaderboardList.appendChild(leaderboardItem);

        // Save leaderboard data in local storage
        const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboardData.push({ username, score });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));



        // Display the session's results within the existing container
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;

        // Update the container text to include the username (if needed)
        const resultsContainer = document.querySelector(".results-container");
        resultsContainer.style.display = "block";
    }
}



let username = authUsernameInput.value;
// Initialize the leaderboard with data from local storage
function initializeLeaderboard() {
    const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardData.forEach((entry) => {
        const leaderboardItem = document.createElement("li");
        leaderboardItem.textContent = ` ${entry.username} Score - ${entry.score}`;
        leaderboardList.appendChild(leaderboardItem);
    });
}


// Initialize the leaderboard when the page loads
initializeLeaderboard();
