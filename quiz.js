$(document).ready(function () {
    // Add click handler for quiz action
    $('#quiz-action').click(function () {
      $('.transactions').html(getQuizHtml());
      initializeQuiz();
    });
  
    function getQuizHtml() {
      return `
        <div id="quiz-container">
          <h1>Financial Quiz</h1>
          <button id="get-question-btn">Get Question</button>
          <p id="question"></p>
          <div id="options"></div>
          <p id="feedback"></p>
          <p id="score">Score: 0</p>
        </div>
      `;
    }
  
    function initializeQuiz() {
      const questions = [
        {
          question: "What is a budget?",
          options: ["A plan for managing money", "An account type"],
          correctIndex: 0,
        },
        {
          question: "What is saving?",
          options: ["Spending extra money", "Setting aside money for the future"],
          correctIndex: 1,
        },
        {
          question: "You’re planning a party for your friends. You only have R500 to spend. What’s the first thing you should do?",
          options: ["Buy snacks and drinks immediately", "Make a list of all expected expenses"],
          correctIndex: 1,
        },
        {
          question: "Uh-oh! Your car just broke down, and you need R3,000 for repairs. What’s the best financial move?",
          options: ["Use your emergency savings", "Borrow from a high-interest payday loan"],
          correctIndex: 0,
        },
        {
          question: "Your credit score is like a health bar for your financial life. Which action will boost your credit score?",
          options: ["Applying for every credit card you see", "Paying bills on time"],
          correctIndex: 1,
        },
      ];
  
      const scoreKey = "quizScore";
      let score = parseInt(localStorage.getItem(scoreKey)) || 0;
      let hasFetchedQuestion = false;
  
      $('#score').text(`Score: ${score}`);
  
      // Attach event handler for fetching a question
      $('#get-question-btn').click(function () {
        if (hasFetchedQuestion) {
          alert("You can only see one question at a time!");
          return;
        }
  
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        $('#question').text(randomQuestion.question);
  
        const optionsContainer = $('#options');
        optionsContainer.empty();
  
        randomQuestion.options.forEach((option, index) => {
          const button = $('<button></button>');
          button.text(option);
          button.click(() => submitAnswer(index === randomQuestion.correctIndex));
          optionsContainer.append(button);
        });
  
        hasFetchedQuestion = true;
      });
  
      function submitAnswer(isCorrect) {
        const feedback = $('#feedback');
        if (isCorrect) {
          feedback.text("Correct! 🎉");
          score += 10;
          localStorage.setItem(scoreKey, score);
          $('#score').text(`Score: ${score}`);
        } else {
          feedback.text("Incorrect! Try again.");
        }
  
        // Reset for a new question
        hasFetchedQuestion = false;
        $('#question').text("");
        $('#options').empty();
      }
    }
  });
  