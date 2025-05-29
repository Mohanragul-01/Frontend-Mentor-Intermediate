const form = document.getElementById('email-form');
const email = document.getElementById('email');
const small = form.querySelector('small');
const toggle = document.getElementById('toggle');
const toggleIcon = document.getElementById('toggle-icon');
const menu = document.getElementById('menu');

let showMenu = false;

toggle.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        toggleIcon.src = 'images/icon-close.svg';
        menu.classList.add('show');
        showMenu = true;
    } 
    else {
        toggleIcon.src = 'images/icon-hamburger.svg';
        menu.classList.remove('show');
        showMenu = false;
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess();
    } 
    else {
        showError('Please insert a valid email');
    }
}

function showError(message) {
    form.classList.add('error');
    small.innerText = message;
}

function showSuccess() {
    form.className = 'email-form';
    small.innerText = '';
    email.value = '';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (email.value != '') {
        checkEmail(email);
    } 
    else {
        showError('Email field is empty');
    }
});

let cardIndex = 1;
const cards = document.getElementsByClassName('card');
const dots = document.getElementsByClassName('dot');
const isDesktop = window.matchMedia("(min-width: 769px)").matches;

showCards(cardIndex);

function currentCard(n) {
    showCards(cardIndex = n);
}

function nextCard() {
    if (isDesktop) {
        cardIndex += 3;
        if (cardIndex > cards.length) {
            cardIndex = 1;
        }
    } 
    else {
        cardIndex++;
        if (cardIndex > cards.length) {
            cardIndex = 1;
        }
    }
    showCards(cardIndex);
}

function showCards(n) {
    let i;
    if (isDesktop) {
        let startIndex = n - 1;
        if (startIndex > cards.length - 3) {
            startIndex = cards.length - 3;
        }
        if (startIndex < 0) {
            startIndex = 0;
        }
        
        for (i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active-card');
        }
        for (i = startIndex; i < startIndex + 3 && i < cards.length; i++) {
            cards[i].classList.add('active-card');
        }
    } 
    else {
        if (n > cards.length) {
            cardIndex = 1;
        }
        if (n < 1) {
            cardIndex = cards.length;
        }
        
        for (i = 0; i < cards.length; i++) {
            cards[i].classList.remove('active-card');
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        
        cards[cardIndex - 1].classList.add('active-card');
        dots[cardIndex - 1].classList.add('active');
    }
}

setInterval(nextCard, 5000);
