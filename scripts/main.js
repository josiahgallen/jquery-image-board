'use strict';
$(document).ready(function() {

    var $dropDown = $('nav button');
    var $dropMenu = $('#add-pic')
    var $form = $('#add-form');
    var $picWindow = $('#pic-window');
    var $cancel = $('a');
    var $registerBtn = $('#register-button');
    var $newUemail = $('#newuemail');
    var $createPass = $('#createpass');
    var $confirmPass = $('#confirmpass');

    var currentUser = 'guest';
    var url = 'http://tiyfe.herokuapp.com/collections/josiah-myPix';
    var urlCurrent = 'http://tiyfe.herokuapp.com/collections/josiah-myPix/55fcb8de58d84a0300000108'
    var urlUsers = 'http://tiyfe.herokuapp.com/collections/josiah-myPix-users';

    $registerBtn.click(function(e) {
        $('#login').hide();
        $registerBtn.hide();
        $('#sign-up').show();
        $('#back').show();
    });

    $('#back').click(function(e) {
        $('#login').show();
        $('#back').hide();
        $('#sign-up').hide();
        $registerBtn.show();
    })

    $('#login').submit(function(e) {
        e.preventDefault();
        var loginUser = $('#newuser').val();
        var password = $('#log-pass').val();
        $.get(
            urlUsers,
            function(response) {
                response.forEach(function(response) {
                    if (loginUser === response.username && password === response.password) {
                        $('#loginboxwrapper').toggle('up');
                        $('#sitewrapper').toggle('down');
                        $('#error').css({
                            color: 'white'
                        });
                        assignUser();
                    }
                })
            },
            'json'
        )
    })

    $('#sign-up').submit(function(e) {
        e.preventDefault();
        var newUemailString = $newUemail.val();
        var newPassWordString = $createPass.val();
        var newPassWordStringMatch = $confirmPass.val();

        if (newPassWordString === newPassWordStringMatch && newUemailString.indexOf('@') !== -1) {
            $.post(
                urlUsers, {
                    username: newUemailString,
                    password: newPassWordStringMatch
                },
                function(response) {
                    $('#loginboxwrapper').toggle('up');
                    $('#sitewrapper').toggle('down');
                    $('#error').css({
                        color: 'white'
                    });
                    assignUser2();
                },
                'json'
            )
        }

    })

    // setInterval(function() {
    //      console.log('test');
    //      if (!$('#newuser').val('')) {
    //         currentUser = $('#newuser').val();
    //     } else if (!$('#newuemail')){
    //         currentUser = $('#newuemail').val();
    //     } else {
    //         currentUser = 'guest';
    //     }

        $.get(
            url,
            function(response) {
                response.forEach(function(response) {
                    if (response._id !== '55fcb8de58d84a0300000108' /*&& response.user === currentUser*/) {
                        $picWindow.append('<div class="post"><img src="' + response.picture + '"><div class="cap">' + response.caption + '</div></div>');
                    }
                });
            },
            'json'
        )
     //}, 2000);

    $dropDown.click(function() {
        $dropMenu.toggle('slow');
    })

    $form.submit(function(e) {
        e.preventDefault();
        var picURL = $('#new-pix').val();
        var caption = $('#new-pixcap').val();
        var $error = $('#error')
        if ((picURL.indexOf('.png') !== -1 || picURL.indexOf('.jpeg') !== -1 || picURL.indexOf('.gif') !== -1 || picURL.indexOf('.jpg') !== -1) && caption.length > 0) {
            $.post(
                url, {
                    user: currentUser,
                    picture: picURL,
                    caption: caption
                },
                function(response) {
                    $picWindow.prepend('<div class="post"><img src="' + response.picture + '"><div class="cap">' + response.caption + '</div></div>');
                },
                'json'
            )
            $('#new-pix').val('');
            $('#new-pixcap').val('');
            $error.css({
                color: 'white'
            });
        } else {
            $error.css({
                color: 'red'
            });
        }
    })


    $cancel.click(function(e) {
        e.preventDefault();
        $('#newuser').val('');
        $('#log-pass').val('');
        $newUemail.val('');
        $createPass.val('');
        $confirmPass.val('');
        $('#error').css({
            color: 'white'
        });
        $('#new-pix').val('');
        $('#new-pixcap').val('');
    })

    function assignUser() {
        $.ajax({
            url: urlCurrent,
            type: 'PUT',
            data: 'currentuser=' + $('#newuser').val(),
            success: function(data) {
                console.log('success');
            }
        })
    }

    function assignUser2() {
        $.ajax({
            url: urlCurrent,
            type: 'PUT',
            data: 'currentuser=' + $('#newuemail').val(),
            success: function(data) {
                console.log('success');
            }
        })
    };
})
