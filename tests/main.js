window.$ = brightJs;

$.ready(() => {
  console.log('Document ready.');
  
  $("header")
    .html('<span style="font-weight: 900;">Bright.js heading</span>')
    .css('color', 'red');

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