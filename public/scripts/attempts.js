// Client facing scripts here
{
  const renderAttempts = function (data) {
    $("#attempts-content").empty();
    for (const attempt of data) {
      console.log("🚀 ~ file: Attempts.js:6 ~ renderAttempts ~ quiz:", attempt);
      $("#attempts-content").append(createAttemptElement(attempt));
    }
  };

  const createAttemptElement = function (attempt) {

    const $attemptCard = $("<article class='quiz-card'>")
      .append($("<h2>").text(`Quiz Title: ${attempt.quiz_title}`))
      .append($("<p>").text(`Score: ${attempt.score}`))
      .append(`<a href='/attempts/${attempt.attempt_id}'>View details</a>`);
    return $attemptCard;
  };

  $(() => {
    const loadAttempts = function () {
      $.ajax({
        url: "api/attempts",
        method: "GET",
      }).then((response) => {
        renderAttempts(response.attempts);
      });
    };
    loadAttempts();
  });
}
