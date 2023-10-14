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
    .css('background', 'yellow');

  $(document.body).css('font-family', 'sans-serif');

  $(".paragraph");

  $("#summary")
    .text("A small summary...")
    .on('click', () => {
      alert('Clicked.');
    })
    .css('background', 'yellow');

  $(document.getElementById('resume'))
    .css({
      background: 'blue',
      color: 'white'
    });

});