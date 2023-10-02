{
  $(() => {
    let questionCounter = 1;
    // Dynamically add another question element on click
    $("#add-question").on('click', function(event) {
      event.preventDefault();
      questionCounter++;
      const $newQuestion = $(`
    <section class="new-question">
      <button class="question-button generate-question">AI Generate</button>
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

      if (questionCounter > 1) {
        console.log("🚀 ~ file: new-quiz.js:52 ~ $ ~ questionCounter:", questionCounter);
        // $(".remove-button").attr('hidden', false);
        console.log("🚀 ~ file: new-quiz.js:54 ~ $ ~ #remove-button:", $("#remove-question"));
        $("#remove-question").removeClass('hidden');
        // $(".remove-button").classList.remove('hidden');
      } else {
        $("#remove-question").addClass('hidden');
      }

      $newQuestion.insertAfter($(".new-question:last"));
    });

    $("#main-content").on('click', '#remove-question', function(event) {
      event.preventDefault();
      $(".new-question:last").remove();
      questionCounter--;
      if (questionCounter <= 1) {
        $("#remove-question").addClass('hidden'); // Hide the "Remove Previous Question" button if there's only one question
      }
    });

    // Delegation of the event listener on each button
    $("#main-content").on('click', ".generate-question", function(event) {
      event.preventDefault();
      console.log('1st generate button clicked');
      const theme = $("input[name=title]").val();
      console.log("🚀 ~ file: new-quiz.js:88 ~ $ ~ theme:", theme);
      const $generateButton = $(this);
      const $questionSection = $generateButton.closest(".new-question");
      const originalButtonText = $generateButton.text();

      // Disable button and insert spinner
      $generateButton.prop('disabled', true);
      $generateButton.html('<span class="loader"></span>');

      queryAi(theme)
        .then(formattedResponse => {
          assignQueryAnswersToFields(formattedResponse, $questionSection);
          // Restore button
          $generateButton.html(originalButtonText);
          $generateButton.prop("disabled", false);
        })
        .catch(err => {
          console.log("🚀 ~ file: new-quiz.js:106 ~ $ ~ err:", err);
          if (err.noTheme) {
            //change button inside
            $generateButton.text("Please provide a theme").addClass("error");
            setTimeout(() => {
              $generateButton.html(originalButtonText).removeClass("error");
              $generateButton.prop("disabled", false);
            }, 3000);
          }

        });
    });

    const formatQueryAiResponse = (response) => {
      const parts = response.split("\n");
      const formattedResponse = {};
      for (let i = 0; i < parts.length; i++) {
        const element = parts[i];
        if (element === 'QUESTION') {
          formattedResponse.question = parts[i + 1];
        } else if (element === 'ANSWERS') {
          formattedResponse.answer1 = parts[i + 1].substring(3);
          formattedResponse.answer2 = parts[i + 2].substring(3);
          formattedResponse.answer3 = parts[i + 3].substring(3);
          formattedResponse.answer4 = parts[i + 4].substring(3);
        } else if (element.startsWith('CORRECT ANSWER:')) {
          // Get the ID following the string
          console.log('correct answer', element.substring('CORRECT ANSWER: '.length)[0]);
          formattedResponse.correct = element.substring('CORRECT ANSWER: '.length)[0];
        }
      }
      return formattedResponse;
    };
    const assignQueryAnswersToFields = function(queryResponse, $questionElement) {
      const correctAnswerValue = `answer${queryResponse.correct}`;

      // Find the correct radio button within the current question section
      const $correctRadioButton = $questionElement.find(`input[type=radio][name=question${questionCounter}][value=${correctAnswerValue}]`);

      // Uncheck all radio buttons in the current question section
      $questionElement.find(`input[type=radio][name^=question${questionCounter}]`).prop('checked', false);

      // Check the correct radio button
      $correctRadioButton.prop('checked', true);
      console.log("🚀 ~ file: new-quiz.js:130 ~ $ ~ IS CHECKED???:", $correctRadioButton);

      // update each fields
      $questionElement.find(`input[type=text][name=question${questionCounter}]`).val(queryResponse.question);
      $questionElement.find(`input[type=radio][name=question${questionCounter}]`).val(`answer${queryResponse.correct}`);
      $questionElement.find(`input[type=text][name=answer1]`).val(queryResponse.answer1);
      $questionElement.find(`input[type=text][name=answer2]`).val(queryResponse.answer2);
      $questionElement.find(`input[type=text][name=answer3]`).val(queryResponse.answer3);
      $questionElement.find(`input[type=text][name=answer4]`).val(queryResponse.answer4);
    };

    const queryAi = function(theme) {
      if (!theme) {
        console.log('no theme provided');
        const noThemeError = new Error('No theme provided');
        noThemeError.noTheme = true;
        return Promise.reject(noThemeError);
      }
      const requestUrl = window.location.origin + "/api/questions/generate";
      console.log("🚀 ~ file: new-quiz.js:98 ~ queryAi ~ requestUrl:", requestUrl);
      return $.ajax(requestUrl, {
        method: 'POST',
        // data: JSON.stringify({ theme: theme })
        data: { theme: theme }
      })
        .then(response => {
          // Manipulate response.question string
          const formattedRes = formatQueryAiResponse(response.question);
          console.log("🚀 ~ file: new-quiz.js:128 ~ queryAi ~ formattedRes:", formattedRes);
          return formattedRes;
        })
        .catch(error => {
          console.error("An error occurred querying AI:", error);
          throw error;
        });
    };

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

    // On submit, format data
    $("#submit-quizz").on('click', function(event) {
      // TODO: Validation error
      event.preventDefault();

      // console.log("🚀 ~ file: new-quiz.js:69 ~ $ ~ isFormValidated():", isFormValidated());
      if (isFormValidated()) {
        console.log('form', $("#new-quizz").serializeArray());
        const formData = $("#new-quizz").serialize();

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
