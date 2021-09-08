const addQuestion = function () {
  const mainWrapper = $('.main-wrapper');
  let questionMarkup = getQuestionMarkup("",[""])
  $(mainWrapper).children(':last-child').before(questionMarkup);
}

const addQuestionWithMarkup = function (markup) {
  const mainWrapper = $('.main-wrapper');
  let questionMarkup = markup;
  $(mainWrapper).children(':last-child').before(questionMarkup);
}

const deleteQuestion = function() {
  const parent = $(this).parent().parent();
  $(parent).css("-webkit-animation","delete .3s");
  $(parent).bind('webkitAnimationEnd',function(){
    $(parent).remove();
  });
}

const addAnswer = function () {
  let answerTextHTML = getAnswerMarkup();
  $(this).before(answerTextHTML)

  if($(this).parent().children(".answer-wrapper").length === 10) {
    $(this).hide();
  }
}
const deleteAnswer = function() {
  const parent = $(this).parent().parent().parent();
  $(parent).css("-webkit-animation","delete .3s");
  $(parent).bind('webkitAnimationEnd',function(){
    $(parent).remove();
  });

  if($(parent).parent().children(".answer-wrapper").length === 10) {
    const button = $(parent).parent().children(".add-answer");//Некрасиво
    $(button).show();
  }

  if($(parent).parent().children(".answer-wrapper").length === 1) {
    const question = $(parent).parent().parent().parent().children('.delete-question-wrapper').children('.question-delete');//Некрасиво
    $(question).trigger('click');
  }
}

const getAnswerMarkup = function(text = "") {
  let answer = `
    <div class="answer-wrapper">
      <div class="question-answer">
        <div class="checkbox-wrapper">
          <div class="question-answer-checkbox"></div>
        </div>
        <div class="text-wrapper">
          <div class="question-answer-text" contentEditable=true myPlaceholder="Введите вариант ответа">${text}</div>
        </div>
        <div class="delete-wrapper">
          <div class="question-answer-delete unselectable">
              <img src="img/cancel.svg" alt="">
          </div>
        </div>
      </div>
    </div>`

  return $.parseHTML(answer);
}


const getQuestionMarkup = function(title = "", answers = []) {
  let answer =
    `<div class="another-wrapper">
      <div class="question-wrapper">
        <div class="question-title" contentEditable=true myPlaceholder="Введите вопрос">${title}</div>

        <div class="question-answer-wrapper">
        
          <div class="add-button add-answer unselectable">
              <div class="button-add-icon">+</div>
              <div class="button-text">Добавить вариант ответа</div>
              <div class="button-add-icon">+</div>
          </div>
        </div>
      </div>

      <div class="delete-question-wrapper">
        <div class="question-delete unselectable">
          <img src="img/trash.svg" alt="">
        </div>
      </div>
    </div>
      `;
  let htmlAnswer = $.parseHTML(answer)

  answers.forEach((answerText) => {
    let answerTextHTML = getAnswerMarkup(answerText);
    $(htmlAnswer).children('.question-wrapper').children('.question-answer-wrapper').children('.add-answer').before(answerTextHTML);
  })

  return htmlAnswer;
}

addQuestionWithMarkup(getQuestionMarkup("Ваш пол",["Мужчина","Женщина","Не указано"]));
addQuestionWithMarkup(getQuestionMarkup(" Кто заботится о ваших питомцах?",["Я","Партнер","Родители","Дети"]));


$(document).on('click','.add-question',addQuestion);
$(document).on('click','.question-delete',deleteQuestion);

$(document).on('click','.add-answer',addAnswer);
$(document).on('click','.question-answer-delete',deleteAnswer);