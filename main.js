const scrollTo= function(){
    let element = document.getElementById("hero");
element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" });
};


$('#link-home').click(() => {
    $('html, body').animate({
        scrollTop: $('.hero').offset().top
    }, 500);
});

$('#link-functions').click(() => {
    $('html, body').animate({
        scrollTop: $('#functions').offset().top-20
    }, 500);
});

$('#link-authors').click(() => {
    $('html, body').animate({
        scrollTop: $('#authors').offset().top-20
    }, 500);
});

$('#link-extras').click(() => {
    $('html, body').animate({
        scrollTop: $('#extras').offset().top-20
    }, 500);
});

// cookieInfo

// end of cookieInfo
