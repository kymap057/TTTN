
$(window).on('load', function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
});
jQuery(document).ready(function($){ 	
	if($(".top-page").length > 0){
		$(window).scroll(function () {
			var e = $(window).scrollTop();
			if (e > 300) {
                $(".top-page").css('display','inline-flex')
			} else {
				$(".top-page").hide()
			}
		});
		$(".top-page").click(function () {
			$('body,html').animate({
				scrollTop: 0
			})
		})
	}		
});