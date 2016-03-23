
 $(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  setTimeout(function() {
  	$('a').click(function(event) {
  		event.preventDefault();
  		$('.modal-trigger').leanModal();
  	});
  }, 500);

  var lastScrollTop = 0;

	$(window).scroll(function () {
		var st = $(this).scrollTop();

  	if (st < lastScrollTop){
      $('nav').fadeIn();
  	} else {
    	$('nav').fadeOut();
  	}
  	lastScrollTop = st;
	});
});