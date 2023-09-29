// Client facing scripts here
{
  const renderAttempts = function(data) {
    $("#attempts-content").empty();
    for (const attempt of data) {
      console.log("🚀 ~ file: Attempts.js:6 ~ renderAttempts ~ quiz:", attempt);
      $("#attempts-content").append(createAttemptElement(attempt));
    }
  };

  const createAttemptElement = function(attempt) {

    const $attemptCard = $("<article class='attempt-card'>")
      .append($("<h2>").text(`Quiz Title: ${attempt.quiz_title}`))
      .append($("<p>").text(`Score: ${attempt.score} / ${attempt.total_possible_score}`))
      .append(`<a class="card-button" href='/attempts/${attempt.attempt_id}'>View details</a>`)
      .append(`
      <div>
      <button class="shareAttempt attemptButton card-button" data-clipboard-text="I just took the ${attempt.quiz_title} quiz at QuizMe, and scored ${attempt.score} out of ${attempt.total_possible_score}!  Check out my results and try it out yourself at ${window.location.href}/${attempt.attempt_id}">
      Share link to your results!
      </button>
      <form class="deleteAttempt" attempt="${attempt.attempt_id}">
        <button type="submit" class="card-button card-delete-button">Delete Me</button>
      </form>
      </div>
      `);

    return $attemptCard;
  };

  $(() => {
    const deleteAttempt = function(attempt) {
      $.ajax({
        url: `api/attempts/${attempt}`,
        type: 'DELETE'
      }).then(() => {
        loadAttempts();
      });
    };


    const loadAttempts = function() {
      $.ajax({
        url: "api/attempts",
        method: "GET",
      }).then((response) => {
        renderAttempts(response.attempts);

        $('.deleteAttempt').on('submit', function(event) {
          event.preventDefault();
          let attemptID = event.target.getAttribute('attempt');

          deleteAttempt(attemptID);
        });
      });
    };
    loadAttempts();
  });
}
