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

export function USDFormatter(value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return formatter.format(value);
}
