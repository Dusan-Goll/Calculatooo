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

    display(pressedButton) {
        let pressedSign = pressedButton.innerHTML;

        if (this.checkInput(pressedSign)) {
            this.input.value += pressedSign;
        }
    };

    checkInput(sign) {

        let text = this.input.value;
        
        if (text === '' && !/[0-9]|\-/.test(sign)) {
            return false;

        /*** zde pridat serii dalsich checku ***/
        
        } else return true;
    }
}


class Computer extends Calculator {

    constructor() {
        super();
        this.sings = ['×', '÷', '-', '+'];
    }

    eraseSign() {
        this.input.value = this.input.value.slice(0, -1);
    }

    clearAll() {
        this.input.value = '';
    }

    getResult() {
        this.output.value = this.compute();
        this.input.value  = this.output.value;
    }
    
    compute() {
        let expression = this.convertToExpr(this.input.value);
    
        for (let sign of this.sings) {
            while (expression.includes(sign)) {
                expression = this.computePartOf(expression, sign);
            }
        }
        
        if (expression.length != 1) {
            this.throwError();
        } else return expression[0];
    }

    convertToExpr(strng) {
        let mathExpre = new Array(),
            tempNum = null;
        
        for (let i = 0; i < strng.length; i++) {
            if (/[0-9]|\./.test(strng[i])) {
                (tempNum === null)? tempNum = strng[i] : tempNum += strng[i];
                
                if (i === (strng.length - 1)) {
                    mathExpre.push(+tempNum);
                }
            } else {
                if (tempNum !== null) {
                    mathExpre.push(+tempNum);
                    tempNum = null;
                }

                if (/\+|\-|\×|\÷/.test(strng[i])) {
                    if (i !== (strng.length - 1)) {
                        mathExpre.push(strng[i]);
                    }
                }
            }
        }
        return mathExpre;
    }

    computePartOf(expr, sign) {  // 'operator' instead 'sign'
        let tempResult;
        
        if (sign === '-') {
            while (expr.includes(sign)) {
                let pos = expr.indexOf(sign),
                    negativeNum = -(expr[(pos + 1)]);

                expr.splice(pos, 2, '+', negativeNum);
            }
        } else {
            while (expr.includes(sign)) {
                let pos = expr.indexOf(sign);
            
                if (sign === '×') {
                    tempResult = expr[pos - 1] * expr[pos + 1];
                } else if (sign === '÷') {
                    tempResult = expr[pos - 1] / expr[pos + 1]; 
                } else if (sign === '+') {
                    tempResult = expr[pos - 1] + expr[pos + 1];
                }

                expr.splice((pos - 1), 3, tempResult);
            }
        }
        return expr;
    }

    throwError() {
        throw console.error(
                'Array has either none or more than one item.'
        );
    }
}


let calculatooo = new Computer();
