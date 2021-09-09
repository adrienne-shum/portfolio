(function($) {
	var windowwidth = $(document).width();
	$(document).ready(function(){


		if ( $('body').hasClass('tagged-page') ) {
			$("#banner").empty();
		}


		setTimeout(function(){
			$('#posts').css({
				'opacity': '1',
				'visibility' : 'visible'
			});
		}, 5000);

// $(window).scroll(function(){
//     if ($("body").scrollTop() > 200) {
//         console.log('has scrolled more than 200');
//         $('#backToTop').css({
//             'visibility': 'visible',
//             'opacity': '1'
//         });
//     } else {
//         $('#backToTop').css({
//             'visibility': 'hidden',
//             'opacity': '0'
//         });
//         $('.banner-text').css({
//             'opacity': '1'
//         });
//     }
// });

	$('#backToTop').on('click', function(){	TweenLite.to( window, .5, {scrollTo:{y: 0 }, ease:Power2.easeOut}) })
	});

	$antsIsoCont = $('#stash-ants');
	antsIsotope = $antsIsoCont.imagesLoaded(function(){
		$("article").fitVids();
		$('.stash-photoset.ips').stashIPS();
		TweenMax.fromTo("#posts", 1, {opacity:0, y:100, ease:Power2.easeOut, force3D: true},{opacity:1, y:0, ease:Power2.easeOut, force3D: true});   

		$antsIsoCont.isotope({
			itemSelector: '.ants-item-two',
			percentPosition: true,
			transitionDuration: 0,
			masonry: {
				columnWidth: '.ants-sizer-two',
				gutter: '.ants-gutter-two'
			}
		});

		TweenLite.to('#stash-preloader', .5, {opacity: 0, onComplete: removePre});
		function removePre() {
			$('#stash-preloader').remove();
			$('.banner-img, .mobile-banner-img').css({
				'transform': 'none'
			});
			$('.banner-text').css({
				'opacity': '1'
			});
		}
	});


	if ( $('.post-video').length > 0 ) {
		$('.post').each(function(){
			TweenMax.to(".post", 0.4, {autoAlpha:1, ease:Power2.easeOut});
		});
	}



	var controller = new ScrollMagic.Controller();
	var $container = $('#stash-ants');

	$container.infinitescroll({
		navSelector: ".standard-pagination",
		nextSelector: ".standard-pagination a.older",
		itemSelector: ".ants-item-two",
		bufferPx : 1600,
		extraScrollPx: 300,
		loading: {
			msgText: '<div id="ants-loader"><div class="loading-icon"></div></div>',
			finishedMsg: "",
			img: '',
			speed: 'fast',
			finished: function() {
			}
		},
	},function( newElements ) {

		var $newElems = $(newElements).css({ opacity: 0, visibility:'hidden'});
		var $newElemsIDs = $(newElements).map(function () { return this.id; }).get();

		$newElems.imagesLoaded(function(){

			$($newElems).each(function(){
				var currentPost = this;
				var scene = new ScrollMagic.Scene({triggerElement: currentPost, triggerHook: "onEnter", offset:-150, reverse: true});
				scene.addTo(controller);
				scene.setTween(TweenMax.fromTo(currentPost, 0.7, { autoAlpha:0, y:30, ease: Power2.easeInOut},{autoAlpha:1, y:0, ease: Power2.easeInOut, force3D: true}, 0));
			});

			$('.stash-photoset.ips').stashIPS();
			$("article").fitVids();

			$container.isotope( 'appended', $newElems, true );  

		});

		Tumblr.LikeButton.get_status_by_post_ids($newElemsIDs);
	});

	if ( $('.permalink #stash-preloader').length ) {
		TweenLite.to('#stash-preloader', .5, {opacity: 0, onComplete: removePre});
		function removePre() {
			$('#stash-preloader').remove();
			$('.banner-img, .mobile-banner-img').css({
				'transform': 'none'
			});
			$('.banner-text').css({
				'opacity': '1'
			});
		}
	}

})(window.jQuery);