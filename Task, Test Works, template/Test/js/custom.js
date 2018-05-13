var $= jQuery;
$(document).ready(function() {
    //action scroll to 'explore'
    $('.to-bottom').bind('click.smoothscroll',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    //init masonry

    var $grid = $('.news-all').masonry({
        itemSelector: '.news-single',
        columnWidth: 360,
        gutter: 14
    });

    //modal video
    
    $('.video-play-link').click(function () {
        $(this).addClass('use-this-video');
        var thisVideo = $(this).parent().find('.modal-video');
        thisVideo.fadeIn();
       $('#modal2').css("display","flex").find('.content-text').empty().append(thisVideo);
    });

    $('#modal2 .close').click(function () {
        var thisVideo = $(this).parent().find('.modal-video');
        thisVideo.hide()
        $('.use-this-video').removeClass('use-this-video').parent().append(thisVideo);
        $('#modal2').hide();
    });

    //action to play/pause video in news
    $('.video-play').click(function () {
        var myVideo = document.getElementById("myVideo");
        if (myVideo.paused) {
            myVideo.play();
            $(this).css("opacity","0");
        }
        else {
            myVideo.pause();
            $(this).css("opacity","1");
        }
    });

    //action to button (from news) 'load more'
    $('.load-more').click(function () {
        var news = $('.news-single').clone();
        $grid.append(news).masonry('appended', news);
        return false
    });

    //action to show modal window
    $('.link').click(function () {
        $('#modal').css("display","flex");
        return false
    });

    //action to close modal window
    $('#modal .close').click(function () {
        $('#modal').hide();
    });

    //action to show favorites news
    $('.show-favorites').click(function () {
        if($(this).hasClass('added-to2')){
            $(this).removeClass('added-to2');
            $('.news-single').show();
            $('.news-single.hide').hide();
            $('.news-all').masonry();
            $('.load-more').show();
            return false;
        }
        else {
            $(this).addClass('added-to2');
            $('.news-single').hide();
            $('.to-favorite.added').parent().parent().show();
            $('.news-all').masonry();
            $('.load-more').hide();
            return false
        }
    });

    //added and removed favorites from local storage
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(function(favorite) {
        document.getElementById(favorite).className = 'to-favorite added';
    });

    function favoritButton() {
        if(favorites != 0){
            $('.show-favorites').addClass('added-to')
        }
        else {
            $('.show-favorites').removeClass('added-to')
        }
    }

    favoritButton();

    document.querySelector('.news-all').addEventListener('click', function(e) {
        var id = e.target.id,
            item = e.target,
            index = favorites.indexOf(id);
        if (!id) return;
        if (index == -1) {
            favorites.push(id);
            item.className = 'to-favorite added';
        } else {
            favorites.splice(index, 1);
            item.className = 'to-favorite';
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        favoritButton();
    });

    //twitter slider
    $('.twitter-feed-all').slick({
        nextArrow: '<span class="next">Newer</span>',
        prevArrow: '<span class="prev">Older</span>',
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        variableWidth: true,
        autoPlay:true,
        initialSlide: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
                    variableWidth: false,
                    slidesToScroll: 4,
                    verticalSwiping: true,
                    vertical: true,
                    dots: false
                }
            }]
    });

    //action to show form
    $('#open-form').click(function () {
        $('.engage').addClass('form-open');
        $('#form-content').hide();
        $('.contact_us__form').fadeIn("slow");
        return false
    });

    //action to close form
    $('.close-form').click(function () {
        $('.engage').removeClass('form-open');
        $('.contact_us__form').hide();
        $('#form-content').fadeIn("slow");
    });

    //form actions
    $('#name').parent().parent().show();
    $(".engage input").keydown(function(e){
        if(e.which === 13){
            $(".input_enter").click();
        }
    });
    $('#submit').on('click',function () {
        $.ajax({
            url: "/"
        }).done(function() {
            $('.contact_us__form_item').hide();
            $('.succses').parent().show();
        });
    });
    $('.input_enter').on('click',function () {
        if ($(this).parent().find('.input').val().length > 1) {
            $(this).prevAll().eq(1).show()
                .parent().parent().next().show()
                .find('.input').focus().parent().find('.input_enter').show();
            $(this).parent().parent().find('label').hide();
            $(this).hide();
            $(this).parent().find('.input_remove').show();
            $(this).parent().find('.input').focusout( function () {
                $(this).parent().find('.input_enter').hide();
                $(this).parent().find('.input_remove').show();
            });
        }
        else {
            $(this).parent().find('.input_enter').hide();
            $(this).parent().find('.input_remove').show();
        }
    });
    $('.input_remove').on('click', function () {
        $(this).parent().find('.input_remove').hide();
        $(this).parent().find('.input_enter').show();
        $(this).parent().find('.input').focus().val('');
    });
    $('.engage .input').focusin( function () {
        $(this).parent().find('.input_remove').hide();
        $(this).parent().find('.input_enter').show();
    });

    //email verification
    $('#email').keypress(function() {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,10}\.)?[a-z]{2,10}$/i,
            params = {
                true: {
                    text: 'Ok',
                    border: 'none',
                    color: 'green'
                },
                false: {
                    text: 'Email is not valid',
                    border: '2px solid #ff0000',
                    color: 'red'
                }
            };
        var param = params[pattern.test($(this).val())];
        $(this).css({'border' : param.border});
        $('.email_ver').text(param.text).css("color", param.color);
    });
});
