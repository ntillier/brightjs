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

  console.log($('#resume').index());

  const body = $(document.body);

  console.log(body.firstChild());
  console.log(body.lastChild());
  console.log(body.children())
  console.log(body.children(1))

  $(document.getElementById('resume'))
    .css({
      background: 'blue',
      color: 'white'
    });

});