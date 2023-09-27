// Client facing scripts here
{
  $(() => {
    const $mainContent = $("#main-content");

    const $newQuizElement = $("<article class='quiz-card new-quizz'>")
      .append($("<h2>").text(`Create a New Quizz!`));

    $newQuizElement.on('click', () => {
      window.location.href = "/quizzes/new";
    });

    const renderPublicQuizzesCards = function(data) {
      $mainContent.empty();
      // if (window.location.pathname === "/quizzes") {
      //   $mainContent.append($newQuizElement);
      // }
      for (const quiz of data) {
        console.log("🚀 ~ file: quizzes.js:6 ~ renderQuizzes ~ quiz:", quiz);
        $mainContent.append(createPublicQuizElement(quiz));
      }
    };

    const createPublicQuizElement = function(quizObj) {
      const $quizCard = $("<article class='quiz-card'>")
        .append($("<h2>").text(`Quiz Title: ${quizObj.quiz_title}`))
        .append("<button>Take the Quiz!</button>");
      return $quizCard;
    };




    const addNewQuizElement = () => {
      console.log('inside the function');
      const newQuizElement = $("<article class='quiz-card new-quizz'>")
        .append($("<h2>").text(`Create a New Quizz!`));
      console.log("🚀 ~ file: quizzes.js:27 ~ addNewQuizElement ~ newQuizElement:", newQuizElement);
      $("#main-content").prepend(newQuizElement);
    };

    // if (window.location.pathname === '/quizzes') {
    //   const newQuizElement = $("<article class='quiz-card new-quizz'>")
    //     .append($("<h2>").text(`Create a New Quizz!`));
    //   $mainContent.append(newQuizElement);
    //   // $mainContent.prepend(newQuizElement);
    // }

    // $(document).ready(function() {
    const loadPublicQuizzes = function() {
      $.ajax({
        url: "api/quizzes",
        method: 'GET'
      })
        .then(response => {
          renderPublicQuizzesCards(response.quizzes);
        });
    };

    // const loadUsersQuizzes = function() {
    //   // Got userId from script in ejs template
    //   $.ajax(`api/users/${userId}/quizzes`)
    //     .then(response => {
    //       console.log("🚀 ~ file: quizzes.js:65 ~ loadUsersQuizzes ~ response:", response);
    //       renderQuizzesCards(response.userQuizzes);
    //     });
    // };
    // if (window.location.pathname === "/quizzes") {
    //   loadUsersQuizzes();
    // } else {
    loadPublicQuizzes();
    // }
  });
  // });
}
