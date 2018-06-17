$(document).ready(function() {
	
	/*change navbar properties on scroll*/
	var scrollTop = 0;
	$(window).scroll(function() {
		scrollTop = $(window).scrollTop();
		if (scrollTop >= 40) {
			$(".navbar").addClass("navbar-scrolled");
		}else if (scrollTop < 40) {
			$(".navbar").removeClass("navbar-scrolled");
		}
	});

	/*smooth scroll to anchor*/
	$("a[href*=\\#]").on('click', function() {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 50
		}, 300);
	});

	/*slide*/
	$(".carousel").carousel({
		interval: 3000
	});

	$(".load-btn").click(function(){
		$(".load-btn").html("<p>Loading...</p>")
		$.ajax({
			url: "work.html",
			success: function(data){
				$(".work-content").append(data);
				$(".fetch").slideDown(1000);
				$(".load-btn").hide();
				$(".show-less-btn").show();
			},
			error: function() {
				$(".load-btn").html("<p>Failed to fetch data. Try Again</p>")
			}
		});
		
	});

	$(".show-less-btn").click(function(){
		$(".fetch").slideUp(1000, function(){
			$(".fetch").remove();
		});
		$(".show-less-btn").hide();
		$(".load-btn").html("<p>Load more work</p>")
		$(".load-btn").show();
	});
});