window.$ = brightJs;

$.ready(() => {
  console.log('Ready.');
  
  const header = $("header").css('color', 'red');

  $(document.body).css('font-family', 'sans-serif');

  const paragraphs = $(".paragraph");

  $("#summary")
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