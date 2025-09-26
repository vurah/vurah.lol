;(function () {
    var timeouts = [];
    if ($.cookie('video_time')) {
        app.videoElement.currentTime = $.cookie('video_time');
    }
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
    $(window).on('keydown', function (event) {
        if (event.keyCode === 123) return false;
        if (event.ctrlKey && event.shiftKey && event.keyCode === 73) return false;
        if (event.ctrlKey && event.keyCode === 73) return false;
        if (event.ctrlKey && event.shiftKey && event.keyCode === 74) return false;
        if (event.ctrlKey && event.keyCode === 74) return false;
    });
    $(document).on('click', '.next', function () {
        next();
    });
    timeouts.forEach(function (timeout) {
        clearTimeout(timeout);
    });
    function next() {
        timeouts.forEach(function (timeout) {
            clearTimeout(timeout);
        });
        $('.startthing').remove();
        setTimeout(function () {
            new Typed('#Bruh', {
                strings: app.Texts,
                typeSpeed: 40,
                backDelay: 500,
                onComplete: function () {
                    return $('span').siblings('.typed-cursor').css('opacity', '0');
                }
            });
        }, 1350);
        setTimeout(function () {
            app.videoElement.play();
            app.videoElement.addEventListener('timeupdate', function () {
                $.cookie('video_time', app.videoElement.currentTime, { expires: 1 });
            }, false);
            $('.navbar').css('visibility', 'visible').hide().fadeIn(500);
            $('.background').css('visibility', 'visible').hide().fadeIn(500);
            $('.main').css('visibility', 'visible').hide().fadeIn(500);
            $('.background').fadeIn(200, function () {
                $('#background').animate({ volume: app.musicVolume }, app.musicFadeIn);
            });
        }, 200);
    }
})();
