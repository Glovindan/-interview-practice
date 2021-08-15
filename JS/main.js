$('.question-answer').click(function (){
  $(this).toggleClass('button-checked');
  $(this).children(':first-child').toggleClass('checkbox-checked');
})