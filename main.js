const homeLink = document.getElementById('link-home');
const list = document.getElementsByClassName('menu');
const menuHeight = document.getElementById('nav-menu').offsetHeight;

const scrollTo = function() {
    let element = document.getElementById("hero");
element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" });
};

$('#link-home').click(() => {
    $('html, body').animate({
        scrollTop: $('.hero').offset().top,
    }, 500);
});

$('#link-functions').click(() => {
    $('html, body').animate({
        scrollTop: $('#functions').offset().top-menuHeight,
    }, 500);
});

$('#link-authors').click(() => {
    $('html, body').animate({
        scrollTop: $('#authors').offset().top-menuHeight,
    }, 500);
});

$('#link-subscribe').click(() => {
    $('html, body').animate({
        scrollTop: $('#subscribe').offset().top-menuHeight,
    }, 500);
});

$('#link-extras').click(() => {
    $('html, body').animate({
        scrollTop: $('#extras').offset().top-menuHeight,
    }, 500);
});

// Back to top button
const backToTopBtn = $('#top-btn');

$(window).scroll(function() {
  if ($(window).scrollTop() > 200) {
    backToTopBtn.addClass('show');
  } else {
    backToTopBtn.removeClass('show');
  };
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

// Highlight active section in menu
const $navigationLinks = document.querySelectorAll('nav > ul > li > a');
const $sections = document.getElementsByTagName('section');

const sectionIdToNavigationLink = {};
for (let i = $sections.length-1; i >= 0; i--) {
	const id = $sections[i].id;
	sectionIdToNavigationLink[id] = document.querySelectorAll(`nav > ul > li > a[href='#${id}']`) || null;
}

function throttle(fn, interval) {
	let lastCall, timeoutId;
	return function () {
		const now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
				fn.call();
			}, interval - (now - lastCall) );
		} else {
			lastCall = now;
			fn.call();
		}
	};
}

function getOffset(el) {
	let _x = 0;
	let _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

function highlightNavigation() {
	const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
	for (let i = $sections.length-1; i >= 0; i--) {
		const currentSection = $sections[i];
		const sectionTop = getOffset(currentSection).top;
		if (scrollPosition >= sectionTop - 250) {
			const id = currentSection.id;
			const $navigationLink = sectionIdToNavigationLink[id];
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('active')) {
					for (let i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace('active', '');
                    }
					$navigationLink[0].className += ('active');
				}
			} else {
					for (let i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace('active', '');
					}
			}
        	return false;
		}
	}
}

window.addEventListener('scroll',throttle(highlightNavigation,150));
