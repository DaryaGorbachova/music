const tabsBefore = document.querySelector('textarea');
const from = document.getElementById('keyfrom');
const to = document.getElementById('keyto');
const convertbtn = document.getElementById('convert');
const answer = document.getElementById('answer');
const copybtn = document.getElementById('copybtn');

let output = '';
let input = [];
let final = '';

const major = ['c3', 'c+3', 'd3', 'd+3', 'e3', 'f3', 'f+3', 'g3', 'g+3', 'a3', 'a+3', 'b3', 
'c4', 'c+4', 'd4', 'd+4', 'e4', 'f4', 'f+4', 'g4', 'g+4', 'a4', 'a+4', 'b4',
'c5', 'c+5', 'd5', 'd+5', 'e5', 'f5', 'f+5', 'g5', 'g+5', 'a5', 'a+5', 'b5'];
const majordo = ['do3', 'do+3', 're3', 're+3', 'mi3', 'fa3', 'fa+3', 'sol3', 'sol+3', 'la3', 'la+3', 'si3',
'do4', 'do+4', 're4', 're+4', 'mi4', 'fa4', 'fa+4', 'sol4', 'sol+4', 'la4', 'la+4', 'si4',
'do5', 'do+5', 're5', 're+5', 'mi5', 'fa5', 'fa+5', 'sol5', 'sol+5', 'la5', 'la+5', 'si5'];
const minordo = ['do3', 're-3', 're3', 'mi-3', 'mi3', 'fa3', 'sol-3', 'sol3', 'la-3', 'la3', 'si-3', 'si3',
'do4', 're-4', 're4', 'mi-4', 'mi4', 'fa4', 'sol-4', 'sol4', 'la-4', 'la4', 'si-4', 'si4',
'do5', 're-5', 're5', 'mi-5', 'mi5', 'fa5', 'sol-5', 'sol5', 'la-5', 'la5', 'si-5', 'si5'];
const minor = ['c3', 'd-3', 'd3', 'e-3', 'e3', 'f3', 'g-3', 'g3', 'a-3', 'a3', 'b-3', 'b3',
'c4', 'd-4', 'd4', 'e-4', 'e4', 'f4', 'g-4', 'g4', 'a-4', 'a4', 'b-4', 'b4',
'c5', 'd-5', 'd5', 'e-5', 'e5', 'f5', 'g-5', 'g5', 'a-5', 'a5', 'b-5', 'b5'];



convertbtn.addEventListener('click', () => {
    clear();
    if (tabsBefore.value.length < 1) {
        alert('Write your tabs first!')
        return false;
    }
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
console.log(begin, end)
let plus = 0;
let octava = '4';

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < major.length; j++) {
        plus = j + gap;
        plus = plus % major.length;
if (plus + j < 0) {
    plus = major.length + plus;

    }

    if (input[i] == major[j]) {
        output += ` ${major[plus]} `;
    }   else  if (input[i] == minor[j]) {
        output += ` ${minor[plus]} `;
    }   else  if (input[i] == majordo[j]) {
        output += ` ${majordo[plus]} `;
    }   else  if (input[i] == minordo[j]) {
        output += ` ${minordo[plus]} `;
    }  
            
}
 
}
copybtn.innerHTML = 'Copy to cliboard';
}

function normalize() {

    let tab = '';
    let text = tabsBefore.value;
    if (text.slice(-1) !== ' ') text += ' ';
    console.log(text.code)
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ',') {
            if (text[i- 1]  !== ',' && text[i- 1]  !== '3' && text[i- 1]  !== '4' && text[i- 1]  !== '5') tab += '4';
            
        } else if (text[i] === '♯' ||text[i] === '#') tab += '+'
        else if (text[i] === '~') continue
        else if (text[i] === '♭') tab += '-'
        else if (text[i] !== ' ') tab += text[i].toLowerCase();
        else if (text[i] === ' ') {

            if (text[i- 1]  !== ',' && text[i- 1]  !== '3' && text[i- 1]  !== '4' && text[i- 1]  !== '5') tab += '4';
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
    answer.style.display = 'block';
    copybtn.style.display = 'block';
    for (let i = 0; i < output.length; i++) {
       if (output[i] == '-') {
           final += '&#9837~';
           continue;
       }
       else if (output[i] == '+') {
           final += '&#9839~';
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

function copy(id)
{
var r = document.createRange();
r.selectNode(answer);
window.getSelection().removeAllRanges();
window.getSelection().addRange(r);
document.execCommand('copy');
window.getSelection().removeAllRanges();
copybtn.innerHTML = 'Copied!'
}
