$(document).ready(function () {
    let startingValue = 1;
    const maxValue = 10;

    function multiply(a, b) {
        return a * b;
    }

    function addNextTask(a, b) {
        const task = `
                    <div class="task-container" style="display: none;">
                        <div>${a} x ${b} = <input type="number" class="result"></div>
                    </div>
                `;
        $('#task-container').append(task);
        $('#task-container .task-container').last().fadeIn(500);
        bindKeyup();
    }

    function checkResultAndGoNext(val, a, b) {
        if (val == multiply(a, b)) {
            $('.result').last().replaceWith(`<span>${val}</span>`);

            $('#done').addClass('right');
            setTimeout(() => {
                $('#done').removeClass('right');
            }, 500);

            if (startingValue < maxValue) {
                startingValue++;
                const newB = startingValue;
                addNextTask(4, newB);
            }

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
        const val = $('.result').last().val();
        const questionText = $('.result').last().parent().text().split(' =')[0];
        const [a, b] = questionText.split(' x ').map(Number);

        if (val !== '') {
            checkResultAndGoNext(val, a, b);
        }
    });

    function bindKeyup() {
        $('.result').off('keyup').on('keyup', function () {
            const val = $(this).val();
            const isValid = !isNaN(val) && val.trim() !== '';
            $('#done').prop('disabled', !isValid);
        });
    }

    addNextTask(4, startingValue);
    $('#done').prop('disabled', true);
});