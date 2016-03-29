
 $(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  setTimeout(function() {
    $('button.show-news').closest("div").children[1];
    $('button.show-news').click(function() {
      $(this).siblings(".ticker-wrap").fadeToggle()
    });

    $(".button-collapse").on('click', function(event) {
      event.preventDefault();
      $(this).sideNav();
    })
  }, 250);

  $('form').on('submit', function(event) {
    event.preventDefault();
  })
});