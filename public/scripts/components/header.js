{
  $(() => {

    // Conditional if logged in or not
    // Get username after logging in
    let username = "YourName";
    $.ajax({
      method: 'GET',
      url: '/api/users/1'
    })
      .then(response => {
        updateHeader(response.user.username);
      });

    function updateHeader(name) {
      $("#header li:last-child").text(name);
    }
    // If logged-in
    $("#header")
      .append($("<ul>")
        .append(`
          <li>Home</li>
          <li>MyQuizzes</li>
          <li>MyAttempts</li>
          `)
        .append($("<li>").text(username))
      );



  });
}