/* 
 * Credits to css-tricks.com
 * The idea for the implementation of auto resizing was taken from
 * https://css-tricks.com/auto-growing-inputs-textareas/ 
*/

// Auto resize textarea to text
const textarea = document.querySelector('.cust-textarea');
textarea.addEventListener('keyup', () => {
  textarea.style.height = calcHeight(textarea.value) + 'px';
});

// Dealing with Textarea Height
// Get line height from css "-2" to cut off the "px"
const lineHeight = parseInt(getComputedStyle(textarea).lineHeight.slice(0,-2));
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // lines x line-height + padding + border
  // "+1" because first linebreak indicates 2 lines, etc.
  let newHeight = (numberOfLineBreaks + 1) * lineHeight + 12 + 2;
  return newHeight;
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
