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
        `<div id='title'><h1>${data.quiz_title}</h1><div id="title-score">Your Score: ${data.score} / ${data.question_count}<div></div>`
      );

    return $header;
  };

  //   <div>
  //     <h3 class="text-2xl font-bold mb-4">Answers</h3>
  //     <div class="grid grid-cols-2 gap-4 text-lg">
  //       {question.answers.map((answer) => (
  //         <div class="border border-slate-400 rounded-lg py-4 px-4">
  //           <div
  //             class={
  //               answer.is_correct
  //                 ? "text-green-600"
  //                 : answer.user_chose && !answer.is_correct
  //                 ? "text-red-500"
  //                 : ""
  //             }
  //           >
  //             {answer.text}{" "}
  //             {answer.user_chose && answer.is_correct
  //               ? "(Correct)"
  //               : answer.user_chose && !answer.is_correct
  //               ? "(Wrong)"
  //               : ""}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <div class="flex justify-end px-8 py-4">
  //       <div />
  //       <div class="text-2xl">
  //         Score: {question.user_guessed_right ? "1" : "0"}
  //       </div>

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
      .append($("<h2>").text(`Question: ${question.text}`))
      .append("<h2>Answers</h2>")
      .append($answers)
      .append(
        `<div class='score'>Score: ${
          question.user_guessed_right ? "1" : "0"
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
