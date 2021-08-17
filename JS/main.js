const checkboxOnClick = function() {
  $(this).toggleClass('button-checked');
  $(this).children(':first-child').toggleClass('checkbox-checked');
}

const getAnswerMarkup = function(text) {
  let answer = `
    <div class="question-answer">
        <div class="question-answer-checkbox radio">
            <img src="img/checkbox.svg" alt="">
        </div>
        <div>${text}</div>
    </div>`

  let htmlAnswer = $.parseHTML(answer);
  return htmlAnswer;
}

//<div class="question-answer">
//                         <div class="question-answer-checkbox radio">
//                             <img src="img/checkbox.svg" alt="">
//                         </div>
//                         <div>Лучше</div>
//                     </div>
//                     <div class="question-answer">
//                         <div class="question-answer-checkbox radio">
//                             <img src="img/checkbox.svg" alt="">
//                         </div>
//                         <div>Не отличается</div>
//                     </div>
//                     <div class="question-answer">
//                         <div class="question-answer-checkbox radio">
//                             <img src="img/checkbox.svg" alt="">
//                         </div>
//                         <div>Хуже</div>
//                     </div>
const getQuestionMarkup = function(title, answers = []) {
  let answer =
            `<div class="question-wrapper">
                <div class="question-title">
                    ${title}
                </div>

                <div class="question-answer-wrapper">
                    
                </div>
            </div>`;
  let htmlAnswer = $.parseHTML(answer)
  answers.forEach((answerText) => {
    let answerTextHTML = getAnswerMarkup(answerText);
    $(answerTextHTML).click(checkboxOnClick);
    $(htmlAnswer).children('.question-answer-wrapper').append(answerTextHTML);
  })

  return htmlAnswer;
}


$('.add-question').click(function () {
  const mainWrapper = $('.main-wrapper');
  let test = getQuestionMarkup("Жопа",["Ass","Boob","Soul"]);
  $(test).toggleClass('question-wrapper-start');
  $(test).toggleClass('question-wrapper-start');
  console.log($(test).html())
  $(mainWrapper).children(':last-child').before(test);

  //Код снизу сопровождает добавляемый элемент
  let lastScrollTop = $(document).scrollTop();
  $(document).scroll(function (){
    let scrollTop = $(this).scrollTop();

    if(scrollTop < lastScrollTop) {
      clearInterval(interval);
      $(this).off('scroll');
    }
  })
  let interval = setInterval(() => {
    lastScrollTop = $(document).scrollTop();
    window.scrollTo(0,document.body.scrollHeight);
  },1)
})

$('.question-answer').click(checkboxOnClick)