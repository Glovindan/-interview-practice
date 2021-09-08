const addQuestion = function () {
  const mainWrapper = $('.main-wrapper');
  let questionMarkup = getQuestionMarkup("",[""])
  $(mainWrapper).children(':last-child').before(questionMarkup);
}

const addQuestionWithMarkup = function (markup) {
  const mainWrapper = $('.main-wrapper');
  $(mainWrapper).children(':last-child').before(markup);
}

function deleteQuestion() {
  const parent = $(this).parents('.question-button-wrapper');
  $(parent).css("-webkit-animation","delete .3s");
  $(parent).one('webkitAnimationEnd',function(){
    $(parent).remove();
  });
}

const addAnswer = function () {
  let answerTextHTML = getAnswerMarkup();
  $(this).before($(answerTextHTML))

  if($(this).parent().children(".answer-animation-wrapper").length === 10) {
    $(this).css("-webkit-animation","fadeOut .3s");
    $(this).one('webkitAnimationEnd',function(){
      $(this).hide();
    });
  }
}
const deleteAnswer = function() {
  const answerWrapper = $(this).parents('.answer-animation-wrapper');
  $(answerWrapper).css("-webkit-animation","delete .3s");
  $(answerWrapper).one('webkitAnimationEnd',function(){
    $(answerWrapper).remove();
  })

  if($(answerWrapper).parent().children(".answer-animation-wrapper").length === 10) {
    const button = $(answerWrapper).parent().children(".add-answer");
    $(button).show();
    $(button).css("-webkit-animation","fadeIn .3s");
  }

  if($(answerWrapper).parent().children(".answer-animation-wrapper").length === 1) {
    const question = $(answerWrapper).parents('.question-button-wrapper').children().find('.question-delete');
    $(question).trigger('click');
  }
}

const getAnswerMarkup = function(text = "") {
  let answer = `
    <div class="answer-animation-wrapper">
      <div class="answer-wrapper">
        <div class="answer-checkbox-wrapper">
          <div class="answer-checkbox"></div>
        </div>
        
        <div class="answer-text-wrapper">
          <div class="answer-text" contentEditable=true myPlaceholder="Введите вариант ответа">${text}</div>
        </div>
        
        <div class="answer-delete-wrapper">
          <div class="answer-delete unselectable">
              <img src="img/cancel.svg" alt="">
          </div>
        </div>
      </div>
    </div>`

  return $.parseHTML(answer);
}


const getQuestionMarkup = function(title = "", answers = []) {
  let answer =
    `<div class="question-button-wrapper">
      <div class="question-wrapper">
        <div class="question-title" contentEditable=true myPlaceholder="Введите вопрос">${title}</div>

        <div class="answer-button-wrapper">
          <div class="add-button add-answer unselectable">
              <div class="button-add-icon">+</div>
              <div class="button-text">Добавить вариант ответа</div>
              <div class="button-add-icon">+</div>
          </div>
        </div>
      </div>

      <div class="question-delete-wrapper">
        <div class="question-delete unselectable">
          <img src="img/trash.svg" alt="">
        </div>
      </div>
    </div>
      `;
  let htmlAnswer = $.parseHTML(answer)

  answers.forEach((answerText) => {
    let answerTextHTML = getAnswerMarkup(answerText);
    $(htmlAnswer).children().find('.add-answer').before(answerTextHTML);
  })

  return htmlAnswer;
}

addQuestionWithMarkup(getQuestionMarkup("Ваш пол",["Мужчина","Женщина","Не указано"]));
addQuestionWithMarkup(getQuestionMarkup(" Кто заботится о ваших питомцах?",["Я","Партнер","Родители","Дети"]));


$(document).on('click','.add-question',addQuestion);
$(document).on('click','.question-delete',deleteQuestion);

$(document).on('click','.add-answer',addAnswer);
$(document).on('click','.answer-delete',deleteAnswer);