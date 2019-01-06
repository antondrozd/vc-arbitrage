export function scrollTo($element, speed) {
  const position = $element.offset().top;

  $('body, html').animate(
    {
      scrollTop: position
    },
    speed
  );
}
