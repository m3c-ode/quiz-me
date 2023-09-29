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
          console.log("🚀 ~ file: quiz-details.js:47 ~ loadQuiz ~ response:", response);
          // console.log("🚀 ~ file: quiz-details.js:175 ~ loadQuiz ~ response:", response);
          // renderQuiz(response);
          // let quizData = {};
          // quizData.questions = [];
          // quizData.questions.answers = [];
          // quizData.quiz_title = data[0].quiz_title;

          // response.quiz.forEach(item => {
          //   const existingQuestion = quizData.questions.find(q => q.question === item.question);
          //   if (!existingQuestion) {
          //     const newQuestion = {
          //       question: item.question,
          //       answers: []
          //     };
          //     newQuestion.answers.push({
          //       answer: item.answer,
          //       is_correct: item.is_correct
          //     });
          //     quizData.questions.push(newQuestion);
          //   } else {
          //     // question already in
          //     existingQuestion.answers.push({
          //       answer: item.answer,
          //       is_correct: item.is_correct
          //     });
          //   }
          // });
          renderQuiz(response.quizData);
        });
    };
    loadQuiz();

  });
}
