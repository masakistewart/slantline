
 $(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  setTimeout(function() {
    $('button.show-news').closest("div").children[1];
    $('button.show-news').click(function() {
      $(this).siblings(".ticker-wrap").fadeToggle()
    });
  }, 300);

  $('form').on('submit', function(event) {
    event.preventDefault();
  })

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