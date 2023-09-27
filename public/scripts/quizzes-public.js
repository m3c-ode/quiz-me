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
        .append(`<a href='/quizzes/${quizObj.quiz_id}/take'>Take the Quiz!</a>`);
      return $quizCard;
    };

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
