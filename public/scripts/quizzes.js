// Client facing scripts here
{
  const renderQuizzes = function(data) {
    $("#main-content").empty();
    for (const quiz of data) {
      console.log("🚀 ~ file: quizzes.js:6 ~ renderQuizzes ~ quiz:", quiz);
      $("#main-content").append(createQuizElement(quiz));
    }
  };

  const createQuizElement = function(quizObj) {
    const $quizCard = $("<article class='quiz-card'>")
      .append($("<h2>").text(`Quiz Title: ${quizObj.quiz_title}`))
      .append("<button>Take the Quiz!</button>");
    return $quizCard;
  };

  $(() => {
    // $(document).ready(function() {
    const loadQuizzes = function() {
      $.ajax({
        url: "api/quizzes",
        method: 'GET'
      })
        .then(response => {
          renderQuizzes(response.quizzes);
        });
    };
    loadQuizzes();
  });
  // });
}