// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
      .done((response) => {
        console.log("🚀 ~ file: users.js:9 ~ .done ~ response:", response);
        const $usersList = $('#users');
        $usersList.empty();

        for (const user of response.users) {
          $(`<li class="user">`).text(user.username).appendTo($usersList);
        }
      });
  });
});
