// Client facing scripts here
{
  const renderQuestions = function (title, questions) {
    addHeader(title);

    for (const question of questions) {
      console.log(
        "🚀 ~ file: Attempts.js:6 ~ renderQuestions ~ quiz:",
        question
      );
      $("#questions-content").append(createQuestionElement(question));
    }

    addFooter();
  };

  const addHeader = function (data) {
    const $header = $("#questions-content")
      .empty()
      .append(
        `<div id='title'><h1>${data}</h1></div>`
      );

    return $header;
  };

  const createQuestionElement = function (question) {
    let $answers = $("<div class='answers'>");

    for (let answer of question.answers) {
      $answers.append(`<div><input type="radio" name="question-${answer.question_id}" value="${answer.answer_id}"> ${answer.answer}</div>`);
    }

    const $questionCard = $("<article class='question-card'>")
      .append($("<h2>").text(`Question: ${question.question.text}`))
      .append("<h2>Answers</h2>")
      .append($answers);
    return $questionCard;
  };

  $(() => {
    const loadQuestions = function () {
      let quiz = window.location.href.split("/").slice(-2)[0];

      $.ajax({
        url: `/api/quizzes/${quiz}`,
        method: "GET",
      }).then((response) => {
        let title = '';
        let grouped = {};

        for (let answer of response.quizz) {
          if (!grouped[answer.question_id]) {
            title = answer.quiz_title;

            grouped[answer.question_id] = {};

            let question = {
              id: answer.question_id,
              text: answer.question
            };

            grouped[answer.question_id].question = question;
            grouped[answer.question_id].answers = [];
          }
          grouped[answer.question_id].answers.push(answer);
        }

        let questions = [];
        for (let question in grouped) {
          questions.push(grouped[question]);
        }

        console.log(questions)
        renderQuestions(title, questions);
      });
    };
    loadQuestions();
  });
}
