(function($){

    function _getCode(token, email) {

        $('#grupInput').toggleClass('show');
        $('#groupButtons').toggleClass('show');
        $('#spiner').toggleClass('hide');

        let request = $.ajax({
            url: 'https://evo1c.ladcloud.ru/setnewemail',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: {newEmail: email}
        });

        request.done((msg)=>{
            $('#grupInputCod').toggleClass('hide');
            $('#confirmCod').toggleClass('hide');
            $('#spiner').toggleClass('hide');
        });

        request.fail((jqXHR, textStatus)=>{
            console.log(textStatus);
        });

    }

    function _confirmCode(token, code) {

        $('#grupInputCode').toggleClass('hide');
        $('#confirmCode').toggleClass('hide');
        $('#spiner').toggleClass('hide');

        let request = $.ajax({
            url: 'https://evo1c.ladcloud.ru/verifycode',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: {code: code}
        });

        request.done((msg)=>{
            $('#grupInputCod').toggleClass('hide');
            $('#confirmCod').toggleClass('hide');
            $('#spiner').toggleClass('hide');
            $('#showInput').toggleClass('hide');
            $('#emailText').toggleClass('hide').text(msg);
            $('#showCodeInput').addClass('hide');
        });

        request.fail((jqXHR, textStatus)=>{
            $('#warningCode').removeClass('hide').addClass('show');
            $('#spiner').toggleClass('hide');
        });

    }

    function _validateEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function _showWarning() {
        $('#warning').removeClass('hide');
    }

    function _hideWarning() {
        $('#warning').addClass('hide');
    }

    function _resetRequest(token) {
        $('.reset_1').addClass('hide');
        $('.reset_3').removeClass('hide');

        let request = $.ajax({
            url: 'https://evo1c.ladcloud.ru/resetPasswordRequest',
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        request.done((msg)=>{
            $('.reset_3').addClass('hide');
            $('.reset_2').removeClass('hide');
        });

        request.fail((jqXHR, textStatus)=>{
            $('.reset_3').addClass('hide');
            $('.reset_5').removeClass('hide');
        });
    }

    function _confirmReset(token, code) {
        $('.reset_2').addClass('hide');
        $('.reset_3').removeClass('hide');
        let request = $.ajax({
            url: 'https://evo1c.ladcloud.ru/resetPassword',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            data: {code: code}
        });

        request.done((msg)=>{
            $('.reset_3').addClass('hide');
            $('.reset_4').removeClass('hide');
            $('#badCode').addClass('hide');
        });

        request.fail((jqXHR, textStatus)=>{
            if (jqXHR.responseText === 'Неверный код') {
                $('.reset_3').addClass('hide');
                $('.reset_2').removeClass('hide');
                $('#badCode').removeClass('hide');
            } else {
                $('.reset_3').addClass('hide');
                $('.reset_5').removeClass('hide');
            }
        });
    }

    $.fn.changeEmail = function(options) {


        $('#newEmailInput').on('focus', (e)=>{
            _hideWarning();
        });

        $('#showInput, #cancel').on('click', (e)=>{
            $('#grupInput').toggleClass('show');
            $('#groupButtons').toggleClass('show');
            $('#showInput').toggleClass('hide');
            $('#emailText').toggleClass('hide');
        });

        $('#confirm').on('click', (e)=>{

            let newEmail = $('#newEmailInput').val();

            if(_validateEmail(newEmail)) {
                _getCode(options.token, newEmail);
            } else {
                _showWarning();
            }
        });

        $('#confirmCod').on('click', (e)=>{
            _confirmCode(options.token, $('#cod').val());
        });

        $('#resetButton').on('click', (e) => {
            _resetRequest(options.token);
        });

        $('#confirmReset').on('click', (e) => {
            console.log('confirmReset');
            let code = $('#cod2').val();
            _confirmReset(options.token, code);
        });

        $('#cancelReset').on('click', (e) => {
            $('.reset_1').removeClass('hide');
            $('.reset_2').addClass('hide');
            $('.reset_3').addClass('hide');
            $('.reset_4').addClass('hide');
            $('#badCode').addClass('hide');
        });

    };

})(jQuery);
