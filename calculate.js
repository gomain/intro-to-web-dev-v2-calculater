
(function() {
    'use strict'

    /* calculator state */
    var value = 0;
    var buffer = '';
    const INPUT = 'INPUT';
    const BUFFER = 'BUFFER';
    var mode = INPUT;

    /** operator tokens **/
    const NONE = 'NONE';
    const DEVIDE = 'DEVIDE';
    const MULTIPLY = 'MUTIPLY';
    const MINUS = 'MINUS';
    const PLUS = 'PLUS';
    var operator = NONE;

    function updateDisplay() {
        document.querySelector('#display').innerText = (mode === INPUT) ?
            value : (buffer.length === 0) ? "0" : buffer;
    };

    function clickNumber(n) {
        if (mode === INPUT) {
            buffer = '' + n;
            mode = BUFFER;
        } else { // mode === BUFFER
            buffer = ((buffer === "0") ? '' : buffer) + n;
        }
    };

    function clickOperator(oper) {
        if (mode === BUFFER) {
            calculate();
            mode = INPUT;
        }
        operator = oper;
        mode = INPUT;
    };

    function calculate() {
        let buffVal = parseInt(buffer,10) || 0;
        value = op(value,buffVal);

        function op(l,r) {
            switch (operator) {
            case DEVIDE:
                return l / r;
            case MULTIPLY:
                return l * r;
            case MINUS:
                return l - r;
            case PLUS:
                return l + r;
            default:
                return r;
            }
        };
    };

    function clear() {
        value = 0;
        buffer = '';
        operator = NONE;
        mode = INPUT;
    };

    /* event listeners on each button */
    /** numbers **/
    document.querySelector('#one').addEventListener('click',() => clickNumber(1));
    document.querySelector('#two').addEventListener('click',() => clickNumber(2));
    document.querySelector('#three').addEventListener('click',() => clickNumber(3));
    document.querySelector('#four').addEventListener('click',() => clickNumber(4));
    document.querySelector('#five').addEventListener('click',() => clickNumber(5));
    document.querySelector('#six').addEventListener('click',() => clickNumber(6));
    document.querySelector('#seven').addEventListener('click',() => clickNumber(7));
    document.querySelector('#eight').addEventListener('click',() => clickNumber(8));
    document.querySelector('#nine').addEventListener('click',() => clickNumber(9));
    document.querySelector('#zero').addEventListener('click',() => clickNumber(0));
    /** operators **/
    document.querySelector('#divide').addEventListener('click',() => clickOperator(DEVIDE));
    document.querySelector('#multiply').addEventListener('click',() => clickOperator(MULTIPLY));
    document.querySelector('#minus').addEventListener('click',() => clickOperator(MINUS));
    document.querySelector('#plus').addEventListener('click',() => clickOperator(PLUS));
    /** functional buttons **/
    document.querySelector('#clear').addEventListener('click', () => clear());

    document.querySelector('#equal').addEventListener('click',function () {
        calculate();
        mode = INPUT;
    });

    document.querySelector('#back').addEventListener('click',function () {
        switch (mode) {
        case INPUT:
            clear();
            break;
        default:
            buffer = buffer.substring(0,buffer.length-1);
        };
    });

    /* event listener on any button */
    document.querySelector('.buttons').addEventListener('click',() => updateDisplay());

    /* display initail state */
    updateDisplay();
})();
