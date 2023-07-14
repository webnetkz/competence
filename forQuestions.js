function createAnswer(options = {
    text: 'this is test',
    type: 'radio',
    name: 'radio'
})
{
    const answerAnswer = document.createElement('div');
            answerAnswer.classList.add('uchet-answer');
    const answerLabel = document.createElement('label');
        answerLabel.classList.add(`uchet-${options.type}`);
    const answerInput = document.createElement('input');
            answerInput.type = options.type;
            answerInput.name = options.name;
            answerInput.setAttribute('hidden', '');
    const answerSpan = document.createElement('span');
            answerSpan.classList.add(`uchet-${options.type}-input`);
    const answerText = document.createElement('p');
            answerText.innerText = options.text;

    answerLabel.appendChild(answerInput);
    answerLabel.appendChild(answerSpan);
    answerAnswer.appendChild(answerLabel);
    answerAnswer.appendChild(answerText);

return answerAnswer;
}

function clearQuestion()
{
    let questionContainer = document.querySelector('.uchet-simple-test-question');
    let answersContainer = document.querySelector('.uchet-simple-test-answers');

    if(answersContainer)
    {
        questionContainer.inneText = '';

        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
        }
    }


    return {qustion: questionContainer, answer: answersContainer}
}

function getQuestion(question=1)
{
    let containers = clearQuestion();

    fetch(`./assets/json/question_${question}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
        
            containers.qustion.innerText = data.question;

            data.answers.forEach((answer) => {
                containers.answer.appendChild(createAnswer({
                    text: answer.text,
                    type: data.type,
                    name: data.type
                }));
            });

        })
        .catch(function() {
            stopTest();
        });
}

function nextQuestion()
{
  window.question = window.question + 1;
  getQuestion(window.question);
}

function backQuestion()
{
  window.question = window.question - 1;
  getQuestion(window.question);
}

function stopTest()
{
    if(document.querySelector('.uchet-simple-test-container'))
    {
        document.querySelector('.uchet-simple-test-container').innerHTML = `
            <div class="uchet-statistics">
                <div class="uchet-total-questions">Общее количество вопросов: <span id="uchet-total-questions">333</span></div>
                <div class="uchet-correct-answers">Правильные ответы: <span id="uchet-correct-answers">333</span></div>
                <div class="uchet-incorrect-answers">Неправильные ответы: <span id="uchet-incorrect-answers">0</span></div>
                <div class="uchet-time-answers">Затраченное время: <span id="uchet-time-answers">12:01</span></div>
            </div>
        `;
    }
}

window.question = 1;
getQuestion(question);