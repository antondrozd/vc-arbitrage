export default function activateNavbarBehavior() {
  let scrollPosition = 0;
  const $sections = $('section');
  const $nav = $('nav');
  const navHeight = $nav.outerHeight();

  function handleScroll() {
    if ($(this).scrollTop() < scrollPosition) {
      $(window).off('scroll', handleScroll);
      $('.navbar').fadeIn(500, () => $(window).on('scroll', handleScroll));

      scrollPosition = $(this).scrollTop();
    } else {
      $(window).off('scroll', handleScroll);
      $('.navbar').fadeOut(500, () => $(window).on('scroll', handleScroll));

      scrollPosition = $(this).scrollTop();
    }

    $sections.each(function() {
      const top = $(this).offset().top - navHeight;
      const bottom = top + $(this).outerHeight();
      const sectionId = $(this).attr('id');

      if (scrollPosition >= top && scrollPosition <= bottom) {
        $nav.find('.nav-link').removeClass('active');
        $nav.find(`a[href="#${sectionId}"]`).addClass('active');
      }
    });
  }

  $(window).on('scroll', handleScroll);

  $('.navbar-brand').on('click', () => location.reload());
}
