const tabsBefore = document.querySelector('textarea');
const from = document.getElementById('keyfrom');
const to = document.getElementById('keyto');
const convertbtn = document.getElementById('convert');
const answer = document.getElementById('answer');
const copybtn = document.getElementById('copybtn');

let output = '';
let input = [];
let final = '';

const major = ['c', 'c+', 'd', 'd+', 'e', 'f', 'f+', 'g', 'g+', 'a', 'a+', 'b'];
const majordo = ['do', 'do+', 're', 're+', 'mi', 'fa', 'fa+', 'sol', 'sol+', 'la', 'la+', 'si'];
const minordo = ['do', 're-', 're', 'mi-', 'mi', 'fa', 'sol-', 'sol', 'la-', 'la', 'si-', 'si'];
const minor = ['c', 'd-', 'd', 'e-', 'e', 'f', 'g-', 'g', 'a-', 'a', 'b-', 'b'];


convertbtn.addEventListener('click', () => {
    clear();
    normalize();
    convert();
    write();
})

copybtn.addEventListener('click', () => {
    copy();
})

function convert() {
let gap = 0;
let begin = 0;
let end = 0;
for (let i = 0; i < major.length; i++) {
    if (from.value == major[i] || from.value == minor[i]) {
        begin = i;
    }
    if (to.value == major[i] || to.value == minor[i]) end = i;
}
gap = end - begin;
console.log('gap', gap)
let plus = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < major.length; j++) {
        plus = j + gap + begin;
        plus = plus % major.length;
if (plus < 0) {
    plus = major.length - plus;
    }

    if (input[i] == major[j]) {
        output += ` ${major[plus]}`;
    }   else  if (input[i] == minor[j]) {
        output += ` ${minor[plus]}`;
    }   else  if (input[i] == majordo[j]) {
        output += ` ${majordo[plus]}`;
    }   else  if (input[i] == minordo[j]) {
        output += ` ${minordo[plus]}`;
    }  
            
}

console.log(plus)    
}
console.log(output);
}

function normalize() {
    let tab = '';
    let text = tabsBefore.value;
    if (text.slice(-1) !== ' ') text += ' ';
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') tab += text[i].toLowerCase();
        else if (text[i] === ' ') {
            input.push(tab);
            tab = '';
        }
    }
}

function clear () {
    input = [];
    output = '';
    final = '';
}

function write () {
    for (let i = 0; i < output.length; i++) {
       if (output[i] == '-') {
           final += '&#9837';
           continue;
       }
       else if (output[i] == '+') {
           final += '&#9839';
           continue;
       }
        if (output[i - 1] == ' ') {
            final += output[i].toUpperCase();
            continue;
        }
        else final += output[i];
    }
    final = final.slice(1)
    console.log(final);
    answer.innerHTML = final;
}

function copy () {

}
