{
  $(() => {

    const renderQuiz = function(quizObj) {
      addHeader(quizObj);

      for (const question of quizObj.questions) {
        $("#questions-content").append(createQuestionElement(question));
      }
    };

    const createQuestionElement = function(questionObj) {
      let $answers = $("<div class='answers'>");

      for (let answer of questionObj.answers) {
        let color = "";
        let correct = "";
        if (answer.is_correct) {
          color = 'class="correct"';
          correct = "(Correct)";
        }

        $answers.append(`<div ${color}>${answer.answer}</div>`);
      }

      const $questionCard = $("<article class='question-card'>")
        .append($("<h2 class='title'>").text(`${questionObj.question}`))
        // .append("<h2>Answers</h2>")
        .append($answers);

      return $questionCard;
    };

    const addHeader = function(quizObj) {
      console.log("🚀 ~ file: quiz-details.js:118 ~ addHeader ~ quizObj:", quizObj);
      // const $header =;
      $("h1").text(quizObj.quiz_title);
      // Render title

    };

    const loadQuiz = () => {
      const quizId = window.location.href.split("/").slice(-1)[0];

      $.ajax(`/api/quizzes/${quizId}`)
        .then(response => {
          console.log("🚀 ~ file: quiz-details.js:175 ~ loadQuiz ~ response:", response);
          // renderQuiz(response);
          renderQuiz(response.quizData);
        });
    };
    loadQuiz();

  });
}
