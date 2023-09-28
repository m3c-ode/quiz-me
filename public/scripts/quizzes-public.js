// Client facing scripts here
{
  $(() => {
    const $mainContent = $("#main-content");

    const $newQuizElement = $("<article class='quiz-card new-quizz'>")
      .append($("<h2>").text(`Create a New Quizz!`));

    $newQuizElement.on('click', () => {
      window.location.href = "/quizzes/new";
    });

    const renderPublicQuizzesCards = function(data) {
      $mainContent.empty();
      for (const quiz of data) {
        console.log("🚀 ~ file: quizzes.js:6 ~ renderQuizzes ~ quiz:", quiz);
        $mainContent.append(createPublicQuizElement(quiz));
      }
    };

    const createPublicQuizElement = function(quizObj) {
      const $quizCard = $("<article class='quiz-card'>")
        .append($("<h2>").text(`Quiz Title: ${quizObj.quiz_title}`))
        .append("<button class='card-button'>Take the Quiz!</button>");

      const quizUrl = `${window.location.href}quizzes/${quizObj.quiz_id}/take`;
      $quizCard.find("button").on('click', function(e) {
        e.preventDefault();
        // If no user, send to login page
        if (!userId) {
          return window.location.href = "/login";
        }
        else {
          return window.location.href = quizUrl;
        }
      });
      return $quizCard;
    };

    $("<article class='quiz-card'>").find("button").on('click', function(e) {
      e.preventDefault();
      // If no user, send to login page
      if (!userId) {
        return window.location.href = "/login";
      }
      else {
        return $("<article class='quiz-card'>");
      }
    });

    const loadPublicQuizzes = function() {
      $.ajax({
        url: "api/quizzes",
        method: 'GET'
      })
        .then(response => {
          console.log('have user id?', userId);
          if (userId) {
            renderPublicQuizzesCards(response.quizzes.filter(quiz => quiz.owner_id !== userId));
          } else {
            renderPublicQuizzesCards(response.quizzes);
          }
        });
    };

    loadPublicQuizzes();
  });
}
