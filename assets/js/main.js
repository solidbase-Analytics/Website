const navbar = document.getElementById('navbar');
let lastScrollY= window.scrollY; // as reference value to check if scrolling up or down

// Lets you scroll to the part of the page where element with this id is located
function scrollToId(idString) {
    let target = document.querySelector('#' + idString).offsetTop;
    scroll({
        top: target,
        behavior: 'smooth'
    });
    // Check if scrolling reached the target and then make sure navbar is visible
    //window.onscroll = null; // remove existing listener
    window.onscroll = () => { 
        let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        console.log(currentScrollOffset);
        if (currentScrollOffset === target) { 
            console.log('reached target');
            navbar.classList.remove('nav-hidden');
            window.onscroll = null; // remove listener
            window.onscroll = scrollDisappear; // set back to normal listener 
        }
    }
}

window.onscroll = scrollDisappear; // set back to normal listener 
// Make navbar automatically appear/disappear corresponding to scrolling
function scrollDisappear() {
    // If the collapsible part of the navbar is visible the navbar shouldn't disappear
    if($('#navcol-1.collapse.show').length === 1 ) {
        console.log('navcol');
        $('#navcol-1').collapse('hide');
    }

    // The navbar shouldn't disappear before the info-section has been reached
    let offsetTop =document.querySelector('#sec-info').offsetTop;
    if(window.scrollY > lastScrollY && window.scrollY >= offsetTop-100) {
        navbar.classList.add('nav-hidden');
    } 
    else {
        navbar.classList.remove('nav-hidden');
    };
    lastScrollY = window.scrollY; // save Y-scroll for future comparisions
}

// Buttons and their behaviour
let learnMoreButton = document.getElementById('learnMoreBtn');
learnMoreButton.onclick = function() {
    // Scroll to the info section by scrolling the corresponding offset
    scrollToId('sec-info');
}

let btnUseCases = document.getElementById('btnUseCases');
btnUseCases.onclick = scrollToId.bind(this, 'use-cases');

let btnOurServices = document.getElementById('btnOurServices');
btnOurServices.onclick = scrollToId.bind(this, 'sec-services');

// Define NavbarItem behaviour -> scrolling to the corresponding section
// The requirement for the following code to work is that
//      -> navbarItemsId: 'nav-' + navbarItem
//      -> corresponding sectionId: 'sec-' + navbarItem
const navbarItems = ['home', 'services', 'about-us', 'contact']
for (let id of navbarItems) {
    document.getElementById('nav-'+id).onclick = function() {
        scrollToId('sec-' + id);
        // Always hide the navbar as well as the navbar collapsible when jumped to a new section
        $('#navcol-1').collapse('hide');
    }
}
