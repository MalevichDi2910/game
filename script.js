$(document).ready(function () {
    let currentValue = 1;
    const maxValue = 10;
    let rowPositionTop = 0;

    function multiply(a, b) {
        return a * b;
    }

    function addNextTask(a, b) {
        const task = `
            <div class="task-container" style="display: none;">
                ${a} x ${b} = <input type="number" class="result">
            </div>
        `;
        $('#task-container').append(task);
        $('#task-container .task-container').last().fadeIn(500);
        bindKeyup();
    }

    function addCubes(count) {
        const row = $('<div class="cube-row"></div>').css('top', rowPositionTop + 'px').appendTo('#cubes-container');

        for (let i = 0; i < count; i++) {
            row.append('<div class="cube animate"></div>');
        }

        rowPositionTop += 56;
    }

    function initializeTask(taskNum, numCubes) {
        addNextTask(taskNum, currentValue);
        addCubes(numCubes);
        $('#done').prop('disabled', true);
    }

    function updateTasksAndCubes(taskNum, numCubes) {
        addNextTask(taskNum, currentValue);
        addCubes(numCubes);
    }

    function handleCorrectAnswer(val) {
        $('.result').last().replaceWith(`<span>${val}</span>`);
        $('#done').addClass('right');
        setTimeout(() => {
            $('#done').removeClass('right');
        }, 500);

        if (currentValue < maxValue) {
            currentValue++;
            updateTasksAndCubes(4, 4)
        } else {
            resetGame();
        }
    }

    function handleIncorrectAnswer() {
        $('.result').last().addClass('wrong-input');
        $('#done').removeClass('right').addClass('wrong');
        setTimeout(() => {
            $('.result').last().removeClass('wrong-input');
            $('#done').removeClass('wrong');
        }, 1000);
    }

    function checkResultAndGoNext(val, a, b) {
        if (val == multiply(a, b)) {
            handleCorrectAnswer(val);
        } else {
            handleIncorrectAnswer();
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
            const val = $(this).val().trim();
            const isValid = !isNaN(val) && val !== '';
            $('#done').prop('disabled', !isValid);
        });
    }

    function resetGame() {
        currentValue = 1;
        rowPositionTop = 0;
        $('#task-container').empty();
        $('#cubes-container').empty();
        initializeTask(4, 4);
    }

    initializeTask(4, 4);
});
