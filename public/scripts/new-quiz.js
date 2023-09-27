{
  $(() => {
    let questionCounter = 1;
    // Dynamically add another question element on click
    $(".add-question").on('click', function(event) {
      event.preventDefault();
      questionCounter++;
      const $newQuestion = $(`
    <section class="new-question">
      <label for="question${questionCounter}">
        Choose A Question
      </label>
      <input required type="text" name="question${questionCounter}">
      <section class="new-answers">
      <label for="answer1">
      Answer 1
      </label>
        <div class="choose-answer">
          <span class="radio-label">Is Answer?</span>
          <input required type="radio" class="radio-button" name="question${questionCounter}" value="answer1">
          </div>
          <input required type="text" name="answer1">
        <label for="answer2">
          Answer 2
        </label><div class="choose-answer">
          <span class="radio-label">Is Answer?</span>
          <input type="radio" class="radio-button" name="question${questionCounter}" value="answer2">
          </div>
        <input required type="text" name="answer2">
        <label for="answer3">
          Answer 3
        </label>
        <div class="choose-answer">
          <span class="radio-label">Is Answer?</span>
          <input type="radio" class="radio-button" name="question${questionCounter}" value="answer3">
        </div>
        <input required type="text" name="answer3">
        <label for="answer4">
          Answer 4
        </label>
        <div class="choose-answer">
          <span class="radio-label">Is Answer?</span>
          <input type="radio" class="radio-button" name="question${questionCounter}" value="answer4">
        </div>
        <input required type="text" name="answer4">
      </section>
    </section>
    `);

      $newQuestion.insertAfter($(".new-question:last"));
    });

    function generateValidationMessages(questionCount) {
      const messages = {
        title: "Give your Quizz a title!"
      };
      for (let i = 1; i <= questionCount; i++) {
        const questionName = `question${i}`;
        messages[questionName] = "Need a Question to Answer!";
      }
      return messages;
    }


    function isFormValidated() {
      let isValid = true;
      $(".error-message").remove();
      $(".radio-error").remove();
      $("input[required]").each(function() {

        // Add event listener to input elements
        $("input[required]").on('input', function() {
          const $input = $(this);
          $input.next('.error-message').remove(); // Remove the error message next to it when the user types in the input
        });

        // Add event listener to radio buttons
        $(".radio-button").on('change', function() {
          const $radio = $(this);
          $radio.closest('.new-answers').find('.radio-error').remove(); // Remove the error message related to a radio-button
        });


        const $input = $(this);
        if (!$input[0].checkValidity()) {

          const $errorMessage = $("<div class='error'>");

          if ($input.attr('name').startsWith('question') && $input.attr('type') === 'text') {
            $errorMessage.addClass("error-message");
            console.log("error in question");
            $input.after($errorMessage.text("Need a Question to Answer!"));
          }
          if ($input.hasClass('radio-button')) {
            $errorMessage.addClass("radio-error");
            $errorMessage.text("Tell us which answer is right!");
            console.log('invalid radio button');
            console.log("🚀 ~ file: new-quiz.js:63 ~ $ ~ $input:", $input);
            $input.closest(".new-answers").append($errorMessage);
          }
          if ($input.attr('name').startsWith('answer') && $input.attr('type') === 'text') {
            $errorMessage.addClass("error-message");
            console.log("error in answer");
            $input.after($errorMessage.text("Need an Answer!"));
          }
          if ($input.attr('name') === 'title') {
            $errorMessage.addClass("error-message");
            console.log("error in title");
            $input.after($errorMessage.text("Give your Quizz a title!"));
          }
          isValid = false;
        }
      });
      return isValid;
    }


    let question;

    // $("#new-quizz").validate({
    //   messages: generateValidationMessages(questionCounter),
    //   errorElement: "div"
    // });

    // On submit, format data
    $("#submit-quizz").on('click', function(event) {
      // TODO: Validation error
      event.preventDefault();

      // console.log("🚀 ~ file: new-quiz.js:69 ~ $ ~ isFormValidated():", isFormValidated());
      if (isFormValidated()) {
        console.log('form', $(this).serializeArray());
        const formData = $(this).serialize();
        console.log("🚀 ~ file: new-quiz.js:45 ~ formData:", formData);

        $.ajax({
          method: 'POST',
          url: "/api/quizzes",
          data: formData
        })
          .then(() => window.location.href = "/quizzes");
      }
    });


  });
}