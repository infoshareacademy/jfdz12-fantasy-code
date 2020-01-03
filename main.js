const homeLink = document.getElementById('link-home');
const list = document.getElementsByClassName('menu');

const scrollTo = function() {
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

// Back to top button
const backToTopBtn = $('#top-btn');

$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    backToTopBtn.addClass('show');
  } else {
    backToTopBtn.removeClass('show');
  }
});

backToTopBtn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({
      scrollTop:0}, '300');
});

// cookieInfo
const cookies = document.querySelector(".cookies");
const cookiesYesBtn = document.querySelector(".cookies-btn-yes");
const cookiesNoBtn = document.querySelector(".cookies-btn-no");
const cookiesShow = () => {
   if (!document.cookie) {
       cookies.style.display = "block";
       cookiesYesBtn.addEventListener("click", () => {
           document.cookie = "Info = cookies";
           cookies.style.display = "none";
       });
       cookiesNoBtn.addEventListener("click", () => {
           alert("Sorry! You must accept!");
       });
   };
};
cookiesShow();
// end of cookieInfo

const linksFromMenu = document.querySelectorAll('.menu a');
const menu = document.querySelector('#menu-btn');
const closeMenu = (item) => {
  item.checked = false;
};

linksFromMenu.forEach(link => link.addEventListener('click',() => closeMenu(menu)));