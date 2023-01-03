'use strict'

class Marks {
    constructor() {
        this['⌫'] = { id: 'Erase'   , class: 'Actions' };
        this['C'] =  { id: 'Clear'   , class: 'Actions' };
        this['='] =  { id: 'Equal'   , class: 'Actions' };
        this['1'] =  { id: 'One'     , class: 'Numbers' };
        this['2'] =  { id: 'Two'     , class: 'Numbers' };
        this['3'] =  { id: 'Three'   , class: 'Numbers' };
        this['4'] =  { id: 'Four'    , class: 'Numbers' };
        this['5'] =  { id: 'Five'    , class: 'Numbers' };
        this['6'] =  { id: 'Six'     , class: 'Numbers' };
        this['7'] =  { id: 'Seven'   , class: 'Numbers' };
        this['8'] =  { id: 'Eight'   , class: 'Numbers' };
        this['9'] =  { id: 'Nine'    , class: 'Numbers' };
        this['0'] =  { id: 'Zero'    , class: 'Numbers' };
        this['.'] =  { id: 'Float'   , class: 'Numbers' };
        this['+'] =  { id: 'Plus'    , class: 'Operations' };
        this['-'] =  { id: 'Minus'   , class: 'Operations' };
        this['×'] =  { id: 'Multi'   , class: 'Operations' };
        this['÷'] =  { id: 'Divide'  , class: 'Operations' };
    }
}


class Calculator {
    constructor() {
        this.operators = ['-', '×', '÷', '+'];
    }

    /** input checking methods **/

    isCollisionBetween(strng, sign) {
        return (this.checkFirstSign(strng, sign) ||
                this.checkZero(strng, sign) ||
                this.checkOperators(strng, sign) ||
                this.checkFloats(strng, sign)
        );
    }

    checkFirstSign(str, theSign) {
        return str === '' && /\+|\×|\÷|\./.test(theSign);
    }
    
    checkZero(str, theSign) {
        return (/[0-9]/.test(theSign) &&
                (str === '0' ||
                 str.at(-1) === '0' && /\+|\-|\×|\÷/.test(str.at(-2))
                )
        );
    }

    checkOperators(str, theSign) {
        return /\+|\-|\×|\÷|\./.test(str.at(-1)) &&
               /\+|\-|\×|\÷|\./.test(theSign);
    }

    checkFloats(str, theSign) {
        if (theSign !== '.') {
            return false;
        } else {
            let lastDot = str.lastIndexOf('.');
            return str.includes('.') &&
                   /^[0-9]+$/g.test(str.slice(lastDot + 1, ));
        }
    }

    /** computing methods **/

    compute(inputedString) {
        let expression = this.convertToExpr(inputedString);
    
        for (let operator of this.operators) {
            while (expression.includes(operator)) {
                expression = this.computePartOf(expression, operator);
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
    
    computePartOf(expr, theOperator) {
        let tempResult;
        
        if (theOperator === '-') {
            while (expr.includes(theOperator)) {
                let pos = expr.indexOf(theOperator),
                    negativeNum = -(expr[(pos + 1)]);

                if (pos === 0) {
                    expr.splice(pos, 2, negativeNum);
                } else {
                    expr.splice(pos, 2, '+', negativeNum);
                }
            }
        } else {
            while (expr.includes(theOperator)) {
                let pos = expr.indexOf(theOperator);
            
                if (theOperator === '×') {
                    tempResult = expr[pos - 1] * expr[pos + 1];
                } else if (theOperator === '÷') {
                    tempResult = expr[pos - 1] / expr[pos + 1]; 
                } else if (theOperator === '+') {
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


class Button {
    constructor(text, className, id) {
        this.node = document.createElement('button');
        this.parent = document.getElementById('theGrid');

        this.node.innerHTML = text;
        this.node.className = className;
        this.node.id = id;

        this.parent.appendChild(this.node);

        this.node.addEventListener('click', function() {
            let inputEl = this.parentElement
                              .firstElementChild
                              .firstElementChild,
                outputEl = this.parentElement
                               .firstElementChild
                               .lastElementChild;
            
            if (this.innerHTML === '⌫') {
                inputEl.innerHTML = inputEl.innerHTML.slice(0, -1);
            } else if (this.innerHTML === 'C') {
                inputEl.innerHTML = '';
                outputEl.innerHTML = '';
            } else if (this.innerHTML === '=') {
                outputEl.innerHTML = inputEl.innerHTML;
                inputEl.innerHTML = calculatooo.compute(inputEl.innerHTML);
            } else {
                let displayedText = inputEl.innerHTML,
                    pressedSign = this.innerHTML;

                if (!calculatooo.isCollisionBetween(displayedText, pressedSign)) {
                    inputEl.innerHTML += this.innerHTML;
                }
            }
        });
    }
}


let calculatooo = new Calculator();
let marks = new Marks();
let buttons = new Object();

for (let mark in marks) {
    buttons[mark] = new Button( mark, marks[mark].class, marks[mark].id );
}
