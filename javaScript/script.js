// Media queries >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let isDesktop, isTablet, isMobile;

const desktopScreen = matchMedia('screen and (min-width: 1025px)');
const tabletScreen = matchMedia(
	'screen and (min-width: 650px) and (max-width: 1024px)'
);
const mobileScreen = matchMedia('screen and (max-width: 650px)');

function checkScreenSize() {
	isDesktop = desktopScreen.matches;
	isTablet = tabletScreen.matches;
	isMobile = mobileScreen.matches;

	if (isDesktop) {
		let desktopCounter = 0;
		let desktopCurrentSlide = 1;
		$('.arrow').click(function () {
			if ($(this).hasClass('forward') && desktopCurrentSlide !== 3) {
				$('.testimonial').css('right', `${desktopCounter + 52}%`);
				desktopCounter += 52;
				desktopCurrentSlide++;
				if (desktopCurrentSlide !== 1) {
					$('.back').show('slow');
				}
			} else if ($(this).hasClass('back') && desktopCurrentSlide !== 1) {
				$('.testimonial').css('right', `${desktopCounter - 52}%`);
				desktopCounter -= 52;
				desktopCurrentSlide--;
				if (desktopCurrentSlide !== 3) {
					$('.forward').show('slow');
				}
			}

			if (desktopCurrentSlide === 1) {
				$('.back').hide('slow');
			} else if (desktopCurrentSlide === 3) {
				$('.forward').hide('slow');
			}
		});
	}
}

checkScreenSize();

desktopScreen.addListener(checkScreenSize);
tabletScreen.addListener(checkScreenSize);
mobileScreen.addListener(checkScreenSize);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$('.toggle').click(function () {
	$('.main-nav').slideToggle('linear');
	$(this).hide().toggleClass('active');
	$(this).siblings().fadeToggle();

	setTimeout(() => {
		$(this).siblings().toggleClass('active');
	}, 100);
	$('.overlay').slideToggle(250);
});

$(this).click(function (event) {
	if (
		$('.close').hasClass('active') &&
		![...$('.main-nav *')].includes(event.target)
	) {
		$('.close').click();
	}
});

const date = new Date();
$("a[href='']").attr('href', '#');
$('.copy-right .year').text(`${date.getFullYear()}`);

let counter = 0,
	currentSlide = 1,
	firstTestimonial = $('.testimonial:first-of-type'),
	slideTrackers = [...$('.slide-tracker > *')];

const testimonials = $('.testimonial');
testimonials.on('swipeleft', function () {
	if (currentSlide !== 4 && !isDesktop) {
		$('.testimonial').css('right', `${counter + 100}%`);
		counter += 100;
		currentSlide++;
		moveTracker();
	}
});

testimonials.on('swiperight', function () {
	if (currentSlide !== 1 && !isDesktop) {
		$('.testimonial').css('right', `${counter - 100}%`);
		counter -= 100;
		currentSlide--;
		moveTracker();
	}
});

function moveTracker() {
	slideTrackers.forEach((tracker) => {
		tracker.classList.remove('active');
	});

	slideTrackers[currentSlide - 1].classList.add('active');
}

try {
	firstTestimonial.swipeleft();
	firstTestimonial.swiperight();
	$('.arrow.forward').click();
	$('.arrow.back').click();
} catch {}

// Intersection observer

const elements = document.querySelectorAll('.sub-section, .testimonial');
const options = {
	threshold: 0.25,
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate');
		} else {
			entry.target.classList.remove('animate');
		}
	});
}, options);

elements.forEach((element) => {
	observer.observe(element);
});

// Email validation >>>>>>>>>>>>>>>>>>>>>>>>>>

const re = /\w+([-_.\w]*)*@\w+([-_.\w]*)\.\w+/;

const emailField = $('.input-container input');
const inputContainer = $('.input-container');
const signUp = $('.sign-up button');

signUp.click(validateEmail);
emailField.focusout(validateEmail);

function validateEmail() {
	inputContainer.removeClass('invalid');
	setTimeout(() => {
		if (!re.test(emailField.val()) && emailField.val() !== '') {
			inputContainer.addClass('invalid');
		} else {
			inputContainer.removeClass('invalid');
		}
	}, 1);
}
