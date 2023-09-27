{
  $(() => {
    const $mainContent = $("#main-content");

    const $newQuizElement = $("<article class='quiz-card new-quizz'>")
      .append($("<h2>").text(`Create a New Quizz!`));

    // Redirects to quiz creation page
    $newQuizElement.on('click', () => {
      window.location.href = "/quizzes/new";
    });

    const renderUsersQuizzesCards = function(data) {
      $mainContent.empty();
      if (window.location.pathname === "/quizzes") {
        $mainContent.append($newQuizElement);
      }
      for (const quiz of data) {
        console.log("🚀 ~ file: quizzes.js:6 ~ renderQuizzes ~ quiz:", quiz);
        $mainContent.append(createUsersQuizElement(quiz));
      }
    };

    const createUsersQuizElement = function(quizObj) {
      const quizUrl = `${window.location.href}/${quizObj.quiz_id}/take`;
      console.log("🚀 ~ file: quizzes-users.js:27 ~ createUsersQuizElement ~ quizUrl:", quizUrl);
      const $quizCard = $("<article class='quiz-card'>")
        .append($("<h2>").text(`Quiz Title: ${quizObj.title}`))
        .append($("<p>").text(`${quizObj.is_public ? "Public" : "Private"}`))
        .append(`<button class="shareQuiz"
        data-clipboard-text="I just made a Quiz on QuizMe! I'm challenging you to take it! ${quizUrl}. Good luck!"
        >Share the quiz!</button>`);

      if (quizObj.is_public) {
        $quizCard.find("p").addClass("darker-green-tone");
      }
      else {
        $quizCard.find("p").addClass("blue-tone");

      }
      return $quizCard;
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