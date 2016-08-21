var site = "http://fathomless-woodland-51903.herokuapp.com"

// login page and hide//hide quote-container
$(".chatContainer").hide()

$("#login").on("submit", function(e) {
    loginId = $("#inputId").val();
    console.log(loginId);
    $("#login").hide();
    $(".chatContainer").show();

    e.preventDefault();
})

$(document).ready(() => {
var getChatData = function(){
  $.getJSON({
      url: `${site}/messages`,
      headers: {
          "Authorization": "Token token=supadupasecret"
      },

      success: (response) => {
          var chatHTML = response.data.map((post) => {
            // var timeF = moment(`${post.created-at}`.startOf('hour').fromNow();
             return `<li data-id=${post.id} data-username=${post.attributes.username}>${post.attributes.username}: ${post.attributes.text} <button class="delete">Delete</button></li>`;
          })
          $("#chatList").html(chatHTML.join("\n"));
      }
  });
}

getChatData();

var intervalID = function() {
  window.setInterval(getChatData, 2000);
};
intervalID();

    var date = new Date();

    $("#chatForm").submit(function(event) {
            //new and trying to connect my text area to the submit button/function
            //  $("#text").click(function(){
            //    var message = $('textarea').val();

            console.log("This is working");
            // $.post({
            //     url: `${site}/messages`,
            //     headers: {
            //         "Authorization": "Token token=supadupasecret"
            //     },
                // data: $(this).serialize(),
                // message is the larger key
                // data: {message: "id"},
                // data: {username: "kchambers", text: "Hello"},

                $.post({
                    url: `${site}/messages`,
                    headers: {
                        "Authorization": "Token token=supadupasecret"
                    },
                    data: {message: {
                        "username": "kchambers",
                        "text": $("#text").val()
                    }},
                    dataType: "json",
                    success: function(response) {

                        //when a post is successful, make a call to another GET request


                    },
                    error: function(error) {
                      console.log('error!!', error);
                    }

                });
                event.preventDefault();
                // error: function(){
                //   alert("this isnt working");
                // }
            // }); //add inputId after <li>




            $("input").val("");
            // })
        })
        // clicking on UL and targeting the delete button on click event
        $("#chatList").on("click", ".delete", function(event) {
            var self = $(this);
            console.log(self.parent().data());
            $.ajax({
        // calling method of Delete with .ajax and passing to the URL
        url: `${site}/messages/${self.parent().data("id")}`,
        headers: {
            "Authorization": "Token token=supadupasecret"
        },
        type: "DELETE",
        success: function(data) {
            self.parent().remove();

        // if a delete is a success. remove list item
        // delete button is a child of the li
        }
        })
        })


})





//Get messages
