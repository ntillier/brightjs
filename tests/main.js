window.$ = brightJs;

$.ready(() => {
  console.log('Document ready.');

  // styling one component
  $("header")
    .html('<span style="font-weight: 900;">Bright.js heading</span>')
    .css('color', 'red');

  // styling many components
  $('a')
    .css({
      color: 'blue',
      'text-decoration': 'none'
    })
    .filter((node) => node.hash === '#summary')
    .id('summary-link')
    .css('background', 'yellow');

  $(document.body).css('font-family', 'sans-serif');

  const paragraphs = $(".paragraph")
    .addClass('content')
    .removeClass('paragraph');

  $("#summary")
    .text("A small summary...")
    .on('click', () => {
      alert('Clicked.');
    })
    .css('background', 'yellow');

  const body = $(document.body);

  paragraphs.clone().appendTo(body);

  paragraphs.append('<h1>Append</h1>', '<h2>Append 2</h2>', $('header'));

});