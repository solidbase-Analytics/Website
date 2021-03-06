/* 
 * Credits to css-tricks.com
 * The idea for the implementation of auto resizing was taken from
 * https://css-tricks.com/auto-growing-inputs-textareas/ 
*/

// This script should only be executed on the contact page
// This is ensured by the following if-statement
if (window.location.pathname.toLowerCase().includes('contact')) {
    // Info Modal is opened on click on email address and auto-closed after 30s
    document.getElementById('email-link').onclick = function () {
        $("#email-modal").modal('show');
        setTimeout(function () {
            $("#email-modal").modal('hide');
        }, 30000);
    }

    // Trigger a copy to clipboard action when clicked on this span
    let copySpan = document.getElementById('copy-span');
    if (copySpan) {
        copySpan.onclick = () => {
            document.execCommand("copy");
            $('#copy-span').popover('show');
        }
        copySpan.addEventListener("copy", function (event) {
            event.preventDefault();
            if (event.clipboardData) {
                event.clipboardData.setData("text/plain", copySpan.innerHTML);
            }
        })
    }

    // FOLLOWING ONLY RELEVANT IN CASE OF CONTACT FORM 
    // Auto resize textarea to text
    //    let lastNumberOfRows = 0;
    //    const textarea = document.querySelector('.cust-textarea');
    //    // On each keyup we check if the rows got bigger than the current textarea
    //    textarea.addEventListener('keyup', () => {
    //        // '+1' because one linebreak means 2 rows already
    //        lastNumberOfRows = (textarea.value.match(/\n/g) || []).length + 1;
    //        if (lastNumberOfRows > textarea.rows) {
    //            textarea.rows = lastNumberOfRows;
    //        }
    //    });
    //
    //    // Taken from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser 
    //    function mobileAndTabletCheck() {
    //        let check = false;
    //        (function (a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;})(navigator.userAgent || navigator.vendor || window.opera);
    //        return check;
    //    };
    //
    //    // Detecting if someone is using a mobile or a tablet to make form behave differently
    //    // This distinction is due to the following bug https://github.com/LasseWolter/solidbase_Website/issues/22 
    //
    //    const name_input = document.getElementById('name-input');
    //    const email_input = document.getElementById('email-input');
    //    if (mobileAndTabletCheck()) {
    //        textarea.onfocus = function () {
    //            // Smooth scrolling instead of abrupt focus on textarea
    //            scrollToElement(textarea);
    //            textarea.rows = parseInt(Math.max(lastNumberOfRows, 5))
    //        }
    //        // Further we'd also like to apply to autoscrolling to name and email 
    //        // for a better user expirience on mobile
    //        name_input.onfocus = function () {
    //            scrollToElement(name_input);
    //        }
    //        email_input.onfocus = function () {
    //            scrollToElement(email_input);
    //        }
    //    }
    //
    //    // This function ensures that the user doesn't accidentally lose progress
    //    // If one of the input fields contains content the user is asked via alert
    //    // if he/she really wants to leave the page
    //    window.addEventListener('beforeunload', function(e) {
    //        if(textarea.value || name_input.value || email_input.value) {
    //            e.preventDefault();
    //            e.returnValue = 'M??chten Sie die Kontakt-Seite wirklich verlassen?';
    //        }
    //    })
    //
    //    // Smooth scroll to the element passed to the function minus navbar compensation
    //    function scrollToElement(el) {
    //        window.scrollTo({
    //            // -110 to compensate for the navbar
    //            top: getTotalTopOffset(el) - 110,
    //            behavior: 'smooth'
    //        });
    //    }
    //
    //    // Idea taken from https://muffinman.io/javascript-get-element-offset/ 
    //    function getTotalTopOffset(el) {
    //        let top = 0;
    //        let element = el;
    //
    //        // Loop through the DOM tree
    //        // and add it's parent's offset to get page offset
    //        do {
    //            top += element.offsetTop || 0;
    //            element = element.offsetParent;
    //        } while (element);
    //
    //        return top;
    //    }
    //
    //    // Very poor implementation but atm I don't have any other idea how 
    //    // to overwrite the kwes standard message when no text but only newlines or
    //    // spaces were added
    //    // This message would be "message muss ausgef??llt werden"
    //    //  -> where 'message' is a lowercase version of the id...
    //    // Bugreport was sent to kwes - so hopefully this can be changed in the future
    //    textarea.addEventListener('focusout', () => {
    //        errMsg = document.getElementById('field-error-message');
    //        if (errMsg) {
    //            errMsg.textContent = ""
    //        }
    //
    //        setTimeout(function () {
    //            errMsg = document.getElementById('field-error-message');
    //            if (errMsg) {
    //                errMsg.textContent = "Bitte geben Sie eine Nachricht ein.";
    //            }
    //        }, 500);
    //
    //        // In case the reaction of the kwes-js event handler was slow for some reason
    //        setTimeout(function () {
    //            errMsg = document.getElementById('field-error-message');
    //            if (errMsg) {
    //                errMsg.textContent = "Bitte geben Sie eine Nachricht ein.";
    //            }
    //        }, 1000);
    //    })
    //    // Function executed whenever the pages is (re)loaded
    //    function init() {
    //        $("#contact-form")[0].reset();
    //    }
    //
    //    init() // Run init script on page (re)load
    //
}
