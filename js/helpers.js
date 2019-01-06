export function scrollTo($element, speed) {
  const position = $element.offset().top;
  const navBarHeight = $('.navbar').outerHeight() || 0;

  $('body, html').animate(
    {
      scrollTop: position - navBarHeight
    },
    speed
  );
}
