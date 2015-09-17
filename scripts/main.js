'use strict';
$(document).ready(function() {

    var $dropDown = $('nav button');
    var $dropMenu = $('#add-pic')
    var $form = $('form');
    var $picWindow = $('#pic-window');
    var $cancel = $('a');

    var url = 'http://tiyfe.herokuapp.com/collections/josiah-myPix';

    $.get(
        url,
        function(response) {
            response.forEach(function(response) {
                $picWindow.prepend('<div class="post"><img src="' + response.picture + '"><div>' + response.caption + '</div></div>');
            });
        },
        'json'
    )

    $dropDown.click(function() {
        $dropMenu.toggle('slow');
    })

    $form.submit(function(e) {
        e.preventDefault;
        var picURL = $('#new-pix').val();
        var caption = $('#new-pixcap').val();
        var $error = $('#error')
        if ((picURL.indexOf('.png') !== -1 || picURL.indexOf('.jpeg') !== -1 || picURL.indexOf('.gif') !== -1 || picURL.indexOf('.jpg') !== -1) && caption.length > 0) {
        $.post(
            url, {
                picture: picURL,
                caption: caption
            },
            function(response) {
                $picWindow.append('<div class="post"><img src="' + response.picture + '"><div>' + response.caption + '</div></div>');
            },
            'json'
        )
        $('#new-pix').val('');
    	$('#new-pixcap').val('');
    	$error.hide();
    } else {
    	$error.show();
    }
    })


    $cancel.click(function(){
    	$('#error').hide();
		$('#new-pix').val('');
		$('#new-pixcap').val('');

    })
})
