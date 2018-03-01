$(function () {
    var socket = io();
    
    $(document).keypress(function(e) {
        if(e.which == 13) {
            var nickname = $('#nickname').val();
            if(nickname.length > 0) {
                console.log('Nickname set as: ' + nickname);
                socket.emit('nickname', nickname);
                $('#nicknameval').val(nickname);
                $('#nickname').val('');
                $( "#nicknameContainer" ).hide();
            }
        }
    });

    $('form').submit(function(){
        var msg = $('#nicknameval').val() + ': ' + $('#m').val();
        $('#messages').append($('<div class="my_msg"><p>' + msg + '</p></div><div class="clear"></div>'));
        $('html, body').animate({ 
            scrollTop: $(document).height()-$(window).height()}, 
            10, 
            "swing"
        );
        socket.emit('chat message', msg);
        $('#m').val('');
        return false;
    });
    
    socket.on('chat message', function(msg){
        $('#messages').append($('<div class="other_msg"><p>' + msg + '</p></div><div class="clear"></div>'));
        $('html, body').animate({ 
            scrollTop: $(document).height()-$(window).height()}, 
            10, 
            "swing"
        );
    });
    
    socket.on('general message', function(msg){
        $('#messages').append($('<div class="general_msg">' + msg + '</div><div class="clear"></div>'));
        $('html, body').animate({ 
            scrollTop: $(document).height()-$(window).height()}, 
            10, 
            "swing"
        );
    });

    socket.on('nickname', function(nickname){
        $('#users').append($('<span>').text((nickname) + ' '));
    });
});