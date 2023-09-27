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
      <input type="text" name="question${questionCounter}">
      <section class="new-answers">
        <div>
          <label for="answer1">
            Answer 1
          </label>
          <input type="radio" name="question${questionCounter}" value="answer1">
          <!-- <div> -->
          <input type="text" name="answer1">
          <!-- </div> -->
        </div>
        <label for="answer2">
          Answer 2
        </label>
        <input type="radio" name="question${questionCounter}" value="answer2">
        <input type="text" name="answer2">
        <label for="answer3">
          Answer 3
        </label>
        <input type="radio" name="question${questionCounter}" value="answer3">
        <input type="text" name="answer3">
        <label for="answer4">
          Answer 4
        </label>
        <input type="radio" name="question${questionCounter}" value="answer4">
        <input type="text" name="answer4">
      </section>
    </section>
    `);

      $newQuestion.insertAfter($(".new-question:last"));
    });

    // On submit, format data
    $("#new-quizz").on('submit', function(event) {
      // TODO: Validation error
      event.preventDefault();
      console.log('form', $(this).serializeArray());
      const formData = $(this).serialize();
      console.log("🚀 ~ file: new-quiz.js:45 ~ formData:", formData);
      $.ajax({
        method: 'POST',
        url: "/api/quizzes",
        data: formData
      });
    });


  });
}