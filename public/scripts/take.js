// Client facing scripts here
{
  const renderQuestions = function (title, questions) {
    addHeader(title);

    $("#questions-content").append('<div class="splide__track">');
    $(".splide__track").append('<div class="splide__list">');

    for (const question of questions) {
      console.log(
        "🚀 ~ file: Attempts.js:6 ~ renderQuestions ~ quiz:",
        question
      );
      $('.splide__list').append(createQuestionElement(question));
    }
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
      $answers.append(`<div><label><input type="radio" name="question-${answer.question_id}" value="${answer.answer_id}"> ${answer.answer}</label></div>`);
    }

    const $questionCard = $("<article class='question-card splide__slide' style='width: 100%;'>")
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

        $(":radio").on('change', function() {
          let names = {};
          $(':radio').each(function() {
            names[$(this).attr('name')] = true;
          });
          let count = 0;
          $.each(names, function() {
            count++;
          });
          if ($(':radio:checked').length === count) {
            $('.finish-attempt-button').attr('disabled', false);
          }
          console.log(names)
        });
      });
    };
    loadQuestions();
  });
}
