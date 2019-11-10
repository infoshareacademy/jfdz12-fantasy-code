


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
const cookieInfo = document.querySelector(".cookie");
const cookieYesBtn = document.querySelector(".cookie-btn-yes");
const cookieNoBtn = document.querySelector(".cookie-btn-no");
const cookieShow = () => {
   if (!document.cookie) {
       cookieInfo.style.display = "block";
       cookieYesBtn.addEventListener("click", () => {
           document.cookie = "Info = ourCookie";
           cookieInfo.style.display = "none";
       })
       cookieNoBtn.addEventListener("click", () => {
           alert("Sorry! You need to fly away!")
       })
   }
};
cookieShow();
// end of cookieInfo