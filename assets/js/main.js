const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY; // as reference value to check if scrolling up or down


// Make navbar automatically appear/disappear corresponding to scrolling
window.onscroll = scrollDisappear;
function scrollDisappear() {
    // If the collapsible part of the navbar is visible the navbar shouldn't disappear
    if ($('#navcol-1.collapse.show').length === 1) {
        console.log('navcol');
        $('#navcol-1').collapse('hide');
    }

    // The navbar shouldn't disappear before the info-section has been reached
    let offsetTop = document.querySelector('#sec-info').offsetTop;
    if (window.scrollY > lastScrollY && window.scrollY >= offsetTop - 100) {
        navbar.classList.add('nav-hidden');
    }
    else {
        navbar.classList.remove('nav-hidden');
    };
    lastScrollY = window.scrollY; // save Y-scroll for future comparisions
}


// Display navbar when users hovers over very top part of visible page
document.getElementById('navbar-overlay').onmouseover = () => {
    navbar.classList.remove('nav-hidden');
}

//--------------------------------------------------
// Buttons and their behaviour
let learnMoreButton = document.getElementById('learnMoreBtn')
if (learnMoreButton) {
    learnMoreButton.onclick = function () {
        // Scroll to the info section by scrolling the corresponding offset
        scrollToId('sec-info');
    }
}

let btnUseCases = document.getElementById('btnUseCases');
if (btnUseCases) {
    btnUseCases.onclick = scrollToId.bind(this, 'use-cases');
}

let btnOurServices = document.getElementById('btnOurServices');
if (btnOurServices) {
    btnOurServices.onclick = scrollToId.bind(this, 'sec-services');
}

//--------------------------------------------------
// Utility functions 



// taken from https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

// Lets you scroll to the part of the page where element with this id is located
function scrollToId(idString) {
    let target = document.querySelector('#' + idString).offsetTop;
    scroll({
        top: target,
        behavior: 'smooth'
    });
    // Don't remove navbar during automatic scrolling (pause scrollDisappear for 1sec)
    window.onscroll = null; // remove existing listener
    setTimeout(() => window.onscroll = scrollDisappear, 1000);
}
