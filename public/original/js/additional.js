// //slick.js
// $(window).resize(function() {
// 	if ( window.innerWidth > 1400 ){
// 		$('.slick-modal').slick('unslick');
// 	} else {
// 		$('.slick-modal').slick({
// 			autoplay:false,
// 			infinite:true,
// 			swipe:true,
// 			swipeToSlide:true,
// 			arrows:true,
// 			dots:false,
// 			slidesToShow:1,
// 			slidesToScroll:1
// 		});
// 	}
// });

$(function() {
	$('.slick-modal').slick({
		autoplay:false,
		swipe:true,
		swipeToSlide:true,
		arrows:true,
		dots:false,
		slidesToShow:3,
		slidesToScroll:1,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow:1,
				}
			}
		],
	});
});
