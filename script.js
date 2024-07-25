$(document).ready(function () {
    let startingValue = 1;
    const maxValue = 10;

    function multiply(a, b) {
        return a * b;
    }

    function addNextTask(a, b) {
        const task = `
            <div class="task-container">
                <div>${a} x ${b} = <input type="number" class="result"></div>
            </div>
        `;
        $('#task-container').append(task);
    }

    // Функция для проверки ответа и перехода к следующему вопросу
    function checkResultAndGoNext(val, a, b) {
        if (val == multiply(a, b)) {
            $('.result').last().replaceWith(`<span>${val}</span>`);

            if (startingValue < maxValue) {
                startingValue++;
                const newB = startingValue;
                addNextTask(4, newB);
                bindKeyup();
            }

            $('#done').removeClass('wrong').addClass('right');
        } else {
            $('.result').last().addClass('wrong-input');
            $('#done').removeClass('right').addClass('wrong');
            setTimeout(() => {
                $('.result').last().removeClass('wrong-input');
                $('#done').removeClass('wrong');
            }, 1000);
        }
    }

    $('#done').on('click', function () {
        addNextTask(4, startingValue);
        bindKeyup(); // Привязываем обработчик к инпутам
        $('#done').prop('disabled', true);
    });

    function bindKeyup() {
        $('.result').off('keyup').on('keyup', function () {
            const val = $(this).val();
            const questionText = $(this).parent().text().split(' =')[0];
            const [a, b] = questionText.split(' x ').map(Number);

            if (val !== '') {
                $('#done').prop('disabled', false);
            } else {
                $('#done').prop('disabled', true);
            }

            checkResultAndGoNext(val, a, b);
        });
    }
});
