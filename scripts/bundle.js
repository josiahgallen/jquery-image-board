(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {

    var $dropDown = $('nav button');
    var $dropMenu = $('#add-pic');
    var $form = $('form');
    var $picWindow = $('#pic-window');
    var $cancel = $('a');

    var url = 'http://tiyfe.herokuapp.com/collections/josiah-myPix';

    $.get(url, function (response) {
        response.forEach(function (response) {
            $picWindow.prepend('<div class="post"><img src="' + response.picture + '"><div>' + response.caption + '</div></div>');
        });
    }, 'json');

    $dropDown.click(function () {
        $dropMenu.toggle('slow');
    });

    $form.submit(function (e) {
        e.preventDefault;
        var picURL = $('#new-pix').val();
        var caption = $('#new-pixcap').val();
        var $error = $('#error');
        if ((picURL.indexOf('.png') !== -1 || picURL.indexOf('.jpeg') !== -1 || picURL.indexOf('.gif') !== -1 || picURL.indexOf('.jpg') !== -1) && caption.length > 0) {
            $.post(url, {
                picture: picURL,
                caption: caption
            }, function (response) {
                $picWindow.append('<div class="post"><img src="' + response.picture + '"><div>' + response.caption + '</div></div>');
            }, 'json');
            $('#new-pix').val('');
            $('#new-pixcap').val('');
            $error.hide();
        } else {
            $error.show();
        }
    });

    $cancel.click(function () {
        $('#error').hide();
        $('#new-pix').val('');
        $('#new-pixcap').val('');
    });
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map