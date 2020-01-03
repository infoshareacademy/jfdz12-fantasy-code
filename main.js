const homeLink = document.getElementById('link-home');
const list = document.getElementsByClassName('menu');





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
const cookies = document.querySelector(".cookies");
const cookiesYesBtn = document.querySelector(".cookies-btn-yes");
const cookiesNoBtn = document.querySelector(".cookies-btn-no");
const cookiesShow = () => {
    console.log(document.cookie)
   if (!document.cookie) {
       cookies.style.display = "block";
       cookiesYesBtn.addEventListener("click", () => {
           document.cookie = "Info = cookies";
           cookies.style.display = "none";
       })
       cookiesNoBtn.addEventListener("click", () => {
           alert("Sorry! You must accept!")
       })
   }
};
cookiesShow();
// end of cookieInfo


const linksFromMenu = document.querySelectorAll('.menu a');
const menu = document.querySelector('#menu-btn');
const closeMenu = (item) => {
  item.checked = false;
};

linksFromMenu.forEach(link => link.addEventListener('click',()=>closeMenu(menu)));

// Highlight active section in menu

// cache the navigation links 
const $navigationLinks = document.querySelectorAll('nav > ul > li > a');
// cache (in reversed order) the sections
const $sections = document.getElementsByTagName('section');

// map each section id to their corresponding navigation link
const sectionIdToNavigationLink = {};
for (let i = $sections.length-1; i >= 0; i--) {
	const id = $sections[i].id;
	//console.log(`nav > ul > li > a[href='#${id}']`);
	sectionIdToNavigationLink[id] = document.querySelectorAll(`nav > ul > li > a [href='#${id}']`) || null;
}

//ERROR: Object sectionIdToNavigationLink with proper keys, but null values

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
	let lastCall, timeoutId;
	return function () {
		const now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
				fn.call();
			}, interval - (now - lastCall) );
		} else {
			// otherwise, we directly call the function 
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
	// get the current vertical position of the scroll bar
	const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
	// iterate the sections
	for (let i = $sections.length-1; i >= 0; i--) {
		const currentSection = $sections[i];
		// get the position of the section
		const sectionTop = getOffset(currentSection).top;
	   // if the user has scrolled over the top of the section
		if (scrollPosition >= sectionTop - 250) {
			// get the section id
			const id = currentSection.id;
			// get the corresponding navigation link
			const $navigationLink = sectionIdToNavigationLink[id];
			// if the link is not active
			if (typeof $navigationLink[0] !== 'undefined') {
				if (!$navigationLink[0].classList.contains('active')) {
					// remove .active class from all the links
					for (let i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
                    }
					// add .active class to the current link
					$navigationLink[0].className += ('active');
				}
			} else {
					// remove .active class from all the links
					for (let i = 0; i < $navigationLinks.length; i++) {
						$navigationLinks[i].className = $navigationLinks[i].className.replace(/ active/, '');
					}
			}	
			// we have found our section, so we return false to exit the each loop
            return false;
		}
	}
}

window.addEventListener('scroll',throttle(highlightNavigation,150));
