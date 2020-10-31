/* 
 * Credits to css-tricks.com
 * The idea for the implementation of auto resizing was taken from
 * https://css-tricks.com/auto-growing-inputs-textareas/ 
*/

// Auto resize textarea to text
let lastNumberOfRows = 0;
const textarea = document.querySelector('.cust-textarea');
// On each keyup we check if the rows got bigger than the current textarea
textarea.addEventListener('keyup', () => {
  // '+1' because one linebreak means 2 rows already
  lastNumberOfRows = (textarea.value.match(/\n/g) || []).length + 1; 
  if(lastNumberOfRows > textarea.rows) {
    textarea.rows = lastNumberOfRows; 
  }
});

// Equivalent to the css mediaquery which handles the resizing of the 
// textarea for all screen bigger than 768 pixels
// This distinction is due to the following bug https://github.com/LasseWolter/solidbase_Website/issues/22 
if (screen.width < 768) {
    textarea.onfocus = function() {
        // Smooth scrolling instead of abrupt focus on textarea
        scrollToElement(textarea);
        textarea.rows = parseInt(Math.max(lastNumberOfRows, 5))
    }
    // When the use is done with the textarea shrink height to content
    textarea.onfocusout = function() {
        textarea.rows = lastNumberOfRows; 
    }

    // Further we'd also like to apply to autoscrolling to name and email 
    // for a better user expirience on mobile
    const name_input = document.getElementById('name-input');
    const email_input = document.getElementById('email-input');
    name_input.onfocus = function () {
        scrollToElement(name_input);
    }
    email_input.onfocus = function () {
        scrollToElement(email_input);
    }
}

// Smooth scroll to the element passed to the function minus navbar compensation
function scrollToElement(el) {
    window.scrollTo({
        // -110 to compensate for the navbar
        top: getTotalTopOffset(el) - 110,
        behavior: 'smooth'
    });
}

// Idea taken from https://muffinman.io/javascript-get-element-offset/ 
function getTotalTopOffset(el) {
  let top = 0;
  let element = el;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
}

// Very poor implementation but atm I don't have any other idea how 
// to overwrite the kwes standard message when no text but only newlines or
// spaces were added
// This message would be "message muss ausgefüllt werden"
//  -> where 'message' is a lowercase version of the id...
// Bugreport was sent to kwes - so hopefully this can be changed in the future
textarea.addEventListener('focusout', () => { 
    errMsg = document.getElementById('field-error-message');
    if(errMsg) {
        errMsg.textContent = ""
    }

    setTimeout( function () {
    errMsg = document.getElementById('field-error-message');
    if(errMsg) {
       errMsg.textContent = "Bitte geben Sie eine Nachricht ein.";
    }
    }, 500);

    // In case the reaction of the kwes-js event handler was slow for some reason
    setTimeout( function () {
    errMsg = document.getElementById('field-error-message');
    if(errMsg) {
       errMsg.textContent = "Bitte geben Sie eine Nachricht ein.";
    }
    }, 1000);
})


// Function executed whenever the pages is (re)loaded
function init() {
    $("#contact-form")[0].reset();
}

init() // Run init script on page (re)load
