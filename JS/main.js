const checkboxOnClick = function() {
  $(this).toggleClass('button-checked');
  $(this).children(':first-child').toggleClass('checkbox-checked');
}

const addQuestion = function () {
  const mainWrapper = $('.main-wrapper');
  let questionMarkup = getQuestionMarkup("",[""]);
  console.log($(questionMarkup).html())
  $(mainWrapper).children(':last-child').before(questionMarkup);
}

const getAnswerMarkup = function(text = "") {
  let answer = `
    <div class="answer-wrapper">
        <div class="question-answer">
          <div class="question-answer-checkbox"></div>
          <div class="question-answer-text" contentEditable=true myPlaceholder="Введите вариант ответа">${text}</div>
        </div>
    </div>`

  return $.parseHTML(answer);
}


const getQuestionMarkup = function(title = "", answers = []) {
  let answer =
            `<div class="question-wrapper">
                <div class="question-title" contentEditable=true myPlaceholder="Введите вопрос">${title}</div>

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


$('.add-question').click(addQuestion)

// $('.question-answer').click(checkboxOnClick)