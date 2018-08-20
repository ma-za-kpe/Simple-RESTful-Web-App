var userListData = [];

$(document).ready(() =>{
  populateTable();

  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo)

  $('#btnAddUser').on('click', addUser);

  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

})

function populateTable() {

  var tableContent = '';

$.getJSON('/users/userlist', (data) => {
  console.log(data)
  userListData = data;
  $.each(data, (key, value) => {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + value.username + '">' + value.username + '</a></td>';
      tableContent += '<td>' + value.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + value._id + '">delete</a></td>';
      tableContent += '</tr>';
  })
$('#userList table tbody').html(tableContent);
})

}

function showUserInfo(event) {
   event.preventDefault();

   var thisUserName = $(this).attr('rel');

   var arrayPosition = userListData.map((arrayItem) => {
      return arrayItem.username;
    }).indexOf(thisUserName);

    var thisUserObject = userListData[arrayPosition];

    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

}

function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser  input#inputUserName').val(),
      'email': $('#addUser  input#inputUserEmail').val(),
      'fullname': $('#addUser  input#inputUserFullname').val(),
      'age': $('#addUser  input#inputUserAge').val(),
      'location': $('#addUser  input#inputUserLocation').val(),
      'gender': $('#addUser  input#inputUserGender').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }

};


function deleteUser(event) {

  event.preventDefault();

  var confirmation = confirm('Are you sure you want to delete this user?');

  if (confirmation === true) {

    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      populateTable();

    });

  }
  else {

    return false;

  }

}
