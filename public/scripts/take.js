// Client facing scripts here
{
  const renderQuestions = function(title, questions) {
    addHeader(title);

    $("#questions-content").append('<div class="glide__track flex items-center">');
    $('.glide__track').append(`<a class="prev">&#10094;&#10094;</a>`);

    $(".glide__track").append('<div class="glide__slides">');


    for (let question of questions) {
      console.log(
        "🚀 ~ file: Attempts.js:6 ~ renderQuestions ~ quiz:",
        question
      );
      $('.glide__slides').append(createQuestionElement(question));
    }

    $('.glide__slides').append('<div class="dot-container">');

    let questionCount = 1;
    for (let question of questions) {
      $('.dot-container').append(`<span class="dot" data-bullet-num="${questionCount}"></span>`);
      questionCount++;
    }

    $('.glide__track').append(`<a class="next">&#10095;&#10095;</a>`);

  };

  const addHeader = function(data) {
    const $header = $("#questions-content")
      .empty()
      .append(
        `<div id='title'><h1>${data}</h1></div>`
      );

    return $header;
  };

  const createQuestionElement = function(question) {
    let $answers = $("<div class='answers'>");

    for (let answer of question.answers) {
      $answers.append(`<div><label class="question-label"><div class="take-radio">
      <input type="radio" name="question-${answer.question_id}" value="${answer.answer_id}"></div><div>${answer.answer}</div></label></div>`);
    }

    const $questionCard = $(`<article class='question-card glide__slide flex'>`)
      .append($("<h2 class='title'>")
        .text(question.question.text))
      .append($answers);

    return $questionCard;
  };

  $(() => {
    const loadQuestions = function() {
      let quiz = window.location.href.split("/").slice(-2)[0];

      $.ajax({
        url: `/api/quizzes/${quiz}`,
        method: "GET",
      }).then((response) => {
        let title = '';
        let grouped = {};

        for (let answer of response.quiz) {
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

        console.log(questions);
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
            $('.finish-attempt-button').addClass('block').removeClass('hidden');
          }
        });

        $('.dot-container').on('click', (e) => {
          e.preventDefault();
          currentSlide(e.target.getAttribute('data-bullet-num'));
        });

        $('.prev').on('click', (e) => {
          e.preventDefault();
          plusSlides(-1);
        });

        $('.next').on('click', (e) => {
          e.preventDefault();
          plusSlides(1);
        });

        let slideIndex = 1;
        showSlides(slideIndex);

        // Next/previous controls
        function plusSlides(n) {
          showSlides(slideIndex += n);
        }

        // Thumbnail image controls
        function currentSlide(n) {
          showSlides(slideIndex = n);
        }

        function showSlides(n) {
          let i;
          let slides = document.getElementsByClassName("glide__slide");
          let dots = document.getElementsByClassName("dot");
          if (n > slides.length) { slideIndex = 1; }
          if (n < 1) { slideIndex = slides.length; }
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[slideIndex - 1].style.display = "block";
          dots[slideIndex - 1].className += " active";
        }

      });
    };
    loadQuestions();
  });
}
