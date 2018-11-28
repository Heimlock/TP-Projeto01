// JavaScript for themezinho items
(function($) {
$(document).ready(function() {
	"use strict";
	
	
	// Hamburger
	$('.hamburger-menu').on('click', function(e) {
		$(this).toggleClass('open');
		$('.navigation').toggleClass('open');
	});

	
	
	// Search Open
	$('.search .search-open').on('click', function(e) {
		$('.search .search-open').addClass('hide');
		$('.search .search-close').addClass('show');
		$('.search-box').addClass('open');
	});
	
	
	
	// Search Close
	$('.search .search-close').on('click', function(e) {
		$('.search .search-open').removeClass('hide');
		$('.search .search-close').removeClass('show');
		$('.search-box').removeClass('open');
	});
	
	
	
	// Fancybox
		$(".fancybox").fancybox({
		helpers: {
		overlay: {
		  locked: false
			}
		  }
		});
	
	
	
	// Masonry
	$(window).load(function(){
		$('.grid').isotope({
		  itemSelector: '.grid-item',
		  percentPosition: true,
		  masonry: {
		  columnWidth: '.grid-sizer'
		  }
		});
	});
	
	
	
	// File Attachment
	
		if (!document.getElementById("FileAttachment")) {
		} 
		else {
		document.getElementById("FileAttachment").onchange = function () {
		document.getElementById("fileuploadurl").value = this.files[0].name;
		};
		};



	
	// OWL Carousel		
 		$(".owl-carousel").owlCarousel({
			loop:true,
			nav:false,
			center:true,
			dots:true,
			autoplay:false,
			autoplayTimeout:3000,
			autoplayHoverPause:false,
			smartSpeed:450,
			responsive:{
			375:{
				items:1
			},
			640:{
				items:1
			},
			768:{
				items:2
			},
			1024:{
				items:2
			}
		   }
	  	});
	
	
	
	
	// OWL Slide		
 		$(".owl-slide").owlCarousel({
			items:1,
			loop:true,
			nav:false,
			center:true,
			dots:true,
			autoplay:false,
			autoplayTimeout:3000,
			autoplayHoverPause:false,
			smartSpeed:450
	  	});
	
	
	
	// Parallax effect
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 0,
			responsive:true
		});
	
	
	// Datepicker
	var dateSelect     = $('#flight-datepicker');
	var dateDepart     = $('#start-date');
	var dateReturn     = $('#end-date');
	var spanDepart     = $('.date-depart');
	var spanReturn     = $('.date-return');
	var spanDateFormat = 'D MMMM yyyy';

	dateSelect.datepicker({
	  autoclose: true,
	  format: "mm/dd/yyyy",
	  maxViewMode: 0,
	  startDate: "now"
	}).on('change', function() {
	  var start = $.format.date(dateDepart.datepicker('getDate'), spanDateFormat);
	  var end = $.format.date(dateReturn.datepicker('getDate'), spanDateFormat);
	  spanDepart.text(start);
	  spanReturn.text(end);

		$('.date-text').each(function() {
		var word = $(this).html();
		var index = word.indexOf(' ');
		if(index == -1) {
			index = word.length;
		}
		$(this).html('<span>' + word.substring(0, index) + '</span>' + word.substring(index, word.length));
	});
	});
	});

	// Counter Effect
		if (!document.getElementById("counter")) {
		} 
		else {
		
		var lastWasLower = false;
			$(document).scroll(function(){
			
			var p = $( "#counter" );
			var position = p.position();
			var position2 = position.top;
		
			if ($(document).scrollTop() > position2-300){
			if (!lastWasLower)
				$('#1').html('11');
				$('#2').html('47');
				$('#3').html('52');
		
			lastWasLower = true;
				} else {
			lastWasLower = false;
			}
			});		
		};
	
})(jQuery);
