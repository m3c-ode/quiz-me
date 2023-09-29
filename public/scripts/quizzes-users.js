{
  $(() => {
    const $mainContent = $("#main-content");

    const $button = $("<article class='quiz-card new-quizz'>")
      .append($("<h2>").text(`Create a New Quizz!`));

    const $newQuizElement = $('#new-quiz-button')
      .append($button);

    // Redirects to quiz creation page
    $newQuizElement.on('click', () => {
      window.location.href = "/quizzes/new";
    });

    const renderUsersQuizzesCards = function(data) {
      $mainContent.empty();

      for (const quiz of data) {
        $mainContent.append(createUsersQuizElement(quiz));
      }
      addDeleteListener();

    };

    const createUsersQuizElement = function(quizObj) {
      const quizUrl = `${window.location.href}/${quizObj.quiz_id}/take`;
      const $quizCard = $("<article class='quiz-card'>")
        .append($("<h2>").text(`Quiz Title: ${quizObj.title}`))
        .append($("<p>").text(`${quizObj.is_public ? "Public" : "Private"}`))
        .append(`<button class="shareQuiz"
        data-clipboard-text="I just made a Quiz on QuizMe! I'm challenging you to take it! ${quizUrl}. Good luck!"
        >Share the quiz!</button>`)
        .append($(`<button class='delete-button' quiz-id=${quizObj.quiz_id}>`).text("Delete Me"));

      if (quizObj.is_public) {
        $quizCard.find("p").addClass("darker-green-tone");
      }
      else {
        $quizCard.find("p").addClass("blue-tone");

      }

      return $quizCard;
    };

    const addDeleteListener = function() {
      $(".delete-button").on('click', function(event) {
        event.preventDefault();
        console.log('delete clicked');
        const quizId = $(this).attr('quiz-id');
        // const $quizCard = $(this).closest(".quiz-card");
        // console.log("🚀 ~ file: quizzes-users.js:48 ~ $ ~ quizCard.data:", $quizCard.data());
        $(this).closest(".quiz-card").remove();
        $.ajax(`api/quizzes/${quizId}`, {
          method: 'DELETE'
        })
          .then((data) => {
            console.log('card deleted');
            console.log("🚀 ~ file: quizzes-users.js:60 ~ .then ~ DELETE data:", data);
          });
      });
    };

    const loadUsersQuizzes = function() {
      // Got userId from script in ejs template
      $.ajax(`api/users/${userId}/quizzes`)
        .then(response => {
          console.log("🚀 ~ file: quizzes.js:65 ~ loadUsersQuizzes ~ response:", response);
          renderUsersQuizzesCards(response.userQuizzes);
        });
    };

    loadUsersQuizzes();
  });
}
