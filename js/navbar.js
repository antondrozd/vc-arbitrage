export default function activateNavbarBehavior() {
  let scrollPosition = 0;

  $(window).on('scroll', function() {
    if ($(this).scrollTop() < scrollPosition) {
      $('.navbar').fadeIn();
      scrollPosition = $(this).scrollTop();
    } else {
      $('.navbar').fadeOut();
      scrollPosition = $(this).scrollTop();
    }
  });
}
