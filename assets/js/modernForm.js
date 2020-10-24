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

// Execute once on page load in case the textarea already contains text 
textarea.style.height = calcHeight(textarea.value) + 'px';
