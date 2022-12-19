'use strict'

class Calculator {
    constructor() {
        this.input = document.querySelector('input');
        this.output = document.querySelector('output');
        this.equalate = document.getElementById('Equalation');
        this.clear = document.getElementById('Clear');
        this.erase = document.getElementById('Erase');

        this.allButtons = this.getAllButtons();
        this.numbers = this.getNumbers();
        this.operations = this.getOperations();
    }
    NLtoArr(nodeList) {
        return Array.prototype.slice.call(nodeList);
    }
    getAllButtons() {
        return this.NLtoArr(
            document.querySelectorAll('button')
        );
    }
    getNumbers() {
        return this.NLtoArr(document.getElementsByClassName('Numbers'));
    }
    getOperations() {
        return this.NLtoArr(document.getElementsByClassName('Operations'));
    }
    /* addSignOf(button) {
        this.input.value += button.textContent;
    };
    press(button) {
        button.addEventListener('click', this.addSignOf);
    } */
}


// Chtelo by to funkci, co bude pri mackani buttonu kalkulacky
// kontrolovat, zda-li prvni znak je cislo, nebo neco jineho
// a v pripade ze nebude cislo, tak opravit input
// a taky kdyz uzivatel zmackne vicekrat napr. 'plus', tak to
// prida do inputu (a zobrazi) jen to puvodni 'plus'.

let someString = '850+63×12-30÷5+78-3×2÷2+140';


/*** input string handling ***/
// object-oriented -> transfer arguments to object properties
class Computer extends Calculator {
    
    compute() {
        let expression = this.convertToExpr(this.input.value),
            checkSigns = ['×', '÷', '+', '-'];
    
        for (let anSign of checkSigns) {
            while (expression.includes(anSign)) {
                expression = this.computePartOf(expression, anSign);
            }
        }
    
        if (expression.length != 1) {
            throw console.error('Array has more than one item.');
        } else return expression[0];
    }

    convertToExpr(strng) {
        let mathExpre = new Array(),
            tempNum = null;
        
        for (let i = 0; i < strng.length; i++) {
            if (/[0-9]/.test(strng[i])) {
                (tempNum === null)? tempNum = strng[i] : tempNum += strng[i];
                if (i === (strng.length - 1)) {
                    mathExpre.push(+tempNum);
                }
            } else {
                if (tempNum !== null) {
                    mathExpre.push(+tempNum);
                }
                tempNum = null;
                if (/\+|\u{2d}|\u{d7}|\u{f7}/u.test(strng[i])) {
                    mathExpre.push(strng[i]);
                }
            }
        }
        return mathExpre;
    }

    computePartOf(expr, sign) {
        let tempResult;
    
        while (expr.includes(sign)) {
            let pos = expr.indexOf(sign);
    
            if (sign === '×') {
                tempResult = expr[pos - 1] * expr[pos + 1];
            } else if (sign === '÷') {
                tempResult = expr[pos - 1] / expr[pos + 1];
            } else if (sign === '+') {
                tempResult = expr[pos - 1] + expr[pos + 1];
            } else if (sign === '-') {
                tempResult = expr[pos - 1] - expr[pos + 1];
            }
    
            expr.splice((pos - 1), 3, tempResult);
        }
        return expr;
    }
}


let calculatooo = new Computer();

calculatooo.equalate.addEventListener(
    'click', function() {
        calculatooo.output.value = calculatooo.compute();
        calculatooo.input.value  = calculatooo.output.value;
    }
)
