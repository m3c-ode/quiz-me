// Client facing scripts here
{
  const renderQuestions = function(data) {
    addHeader(data);

    for (const question of data.questions) {
      console.log(
        "🚀 ~ file: Attempts.js:6 ~ renderQuestions ~ quiz:",
        question
      );
      $("#questions-content").append(createQuestionElement(question));
    }
  };

  const addHeader = function(data) {
    const $header = $("#questions-content")
      .empty()
      .append(
        `<div id='title'><h1>${data.quiz_title}</h1><div id="title-score">Score: ${data.score} / ${data.question_count}<div></div>`
      );

    return $header;
  };

  const createQuestionElement = function(question) {
    let $answers = $("<div class='answers'>");

    for (let answer of question.answers) {
      let color = "";
      let correct = "";
      if (answer.is_correct) {
        color = 'class="correct"';
        correct = "(Correct)";
      } else if (answer.user_chose && !answer.is_correct) {
        color = 'class="incorrect"';
        correct = "(Incorrect)";
      }

      $answers.append(`<div ${color}>${answer.answer} ${correct}</div>`);
    }

    const $questionCard = $("<article class='question-card'>")
      .append($("<h2 class='title'>").text(question.text))
      // .append("<h2 class='title'>Answers</h2>")
      .append($answers)
      .append(
        `<div class='score'>Score: ${question.user_guessed_right ? "1" : "0"
        }</div>`
      );
    return $questionCard;
  };

  $(() => {
    const loadAttempts = function() {
      let attempt = window.location.href.split("/").slice(-1)[0];

      $.ajax({
        url: `/api/attempts/${attempt}`,
        method: "GET",
      }).then((response) => {
        renderQuestions(response);
      });
    };
    loadAttempts();
  });
}
