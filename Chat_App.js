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
    var getChatData = function() {
        $.getJSON({
            url: `${site}/messages`,
            headers: {
                "Authorization": "Token token=supadupasecret"
            },

            success: (response) => {
                var chatHTML = response.data.map((post) => {
                    var date = $ `{message.attributes.time}`;
                    var formattedDate = moment(date).fromNow();
                    return `<li data-id=${post.id}> ${post.attributes.username} : ${post.attributes.text} - ${formattedDate} <button class="delete">Delete</button></li>`;
                    //  ${post.attributes.['created-at']}
                    //  `<li data-id=${message.id}> ${message.attributes.username} / ${message.attributes['created-at']} </li>`);
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
            $.post({
                url: `${site}/messages`,
                headers: {
                    "Authorization": "Token token=supadupasecret"
                },
                data: {
                    message: {
                        "username": "Emo Kylo Ren",
                        "text": $("#text").val()
                    }
                },
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
