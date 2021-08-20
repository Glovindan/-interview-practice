const checkboxOnClick = function() {
  $(this).toggleClass('button-checked');
  $(this).children(':first-child').toggleClass('checkbox-checked');
}

const getAnswerMarkup = function(text = "") {
  let answer = `
    <div class="question-answer">
        <div class="question-answer-checkbox radio" >
            <img src="img/checkbox.svg" alt="">
        </div>
        <div class="question-answer-text" contentEditable=true data-text="Введите вариант ответа">${text}</div>
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
const getQuestionMarkup = function(title = "", answers = []) {
  let answer =
            `<div class="question-wrapper">
                <div class="question-title" contentEditable=true data-text="Введите вопрос">${title}</div>

                <div class="question-answer-wrapper">
                    
                    <div class="add-button add-answer">
                        <div class="button-add-icon">+</div>
                        <div class="button-text">Добавить вариант ответа</div>
                        <div class="button-add-icon">+</div>
                    </div>
                </div>
            </div>`;
  let htmlAnswer = $.parseHTML(answer)

  $(htmlAnswer).children('.question-answer-wrapper').children('.add-answer').click(function() {
    let answerTextHTML = getAnswerMarkup();
    $(this).before(answerTextHTML)
  })

  answers.forEach((answerText) => {
    let answerTextHTML = getAnswerMarkup(answerText);
    $(htmlAnswer).children('.question-answer-wrapper').children('.add-answer').before(answerTextHTML);
  })

  return htmlAnswer;
}


$('.add-question').click(function () {
  const mainWrapper = $('.main-wrapper');
  let test = getQuestionMarkup();

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
  },4)
})

$('.question-answer').click(checkboxOnClick)