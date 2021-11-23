// https://www.youtube.com/watch?v=k49ZR3hRMzA

let editor;
let language;
let theme;

let x = 0;
let w = 0;
let resizer;
let outputPanel;






function selectTheme() {
    let select = document.getElementById("themes");
    theme = "ace/theme/" + select.options[select.selectedIndex].value;

    editor.setTheme(theme);
}






function selectLanguage() {
    let select = document.getElementById("languages");
    language = select.options[select.selectedIndex].value;

    temp = language
    if (temp == "c" || temp == "cpp") {
        temp = "c_cpp";
    }
    temp = "ace/mode/" + temp

    editor.session.setMode(temp);
}






const dragHandler = function(e) {
    // get mouse x position
    x = e.clientX;

    // calculate width of the outputPanel
    let style = window.getComputedStyle(outputPanel);
    w = parseInt(style.width, 10);

    // attach the listenser to document
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}






const mouseMoveHandler = function(e) {
    // distance the mouse has moved
    let dx = e.clientX - x;
    // adjust the dimensions of the element
    outputPanel.style.width = `${w - dx}px`;
}






const mouseUpHandler = function() {
    // remove the handler of 'mousemove and 'mouseup'
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}






function runCode() {
    $.ajax ({

        url: "/run_code",

        method: "POST",

        data: {
            language: language,
            code: editor.getSession().getValue()
        },

        success: function(data) {
            $(output).replaceWith(data)
        },

        error: function() {
            var msg = "";
            if (xhr.status === 0) {
                msg = "Not connect.\n Verify Network.";
            } else if (xhr.status == 404) {
                msg = "Requested page not found. [404]";
            } else if (xhr.status == 500) {
                msg = "Internal Server Error [500].";
            } else if (exception === "parsererror") {
                msg = "Requested JSON parse failed.";
            } else if (exception === "timeout") {
                msg = "Time out error.";
            } else if (exception === "abort") {
                msg = "Ajax request aborted.";
            } else {
                msg = "Error:" + xhr.status + " " + xhr.responseText;
            }
            if (callbackError) {
                callbackError(msg);
            }
        }
    })
}






window.onload = function() {
    language = "python";            // python is the default language
    theme = "ace/theme/one_dark";   // one dark is the default theme

    // set the default language and theme
    editor = ace.edit("editor");
    editor.setTheme(theme);
    editor.session.setMode("ace/mode/" + language);

    // initialize the outputPanel and resizer
    resizer = document.getElementById("resizer");
    outputPanel = document.getElementById("output-panel");

    // add the event handler to the resizer
    resizer.addEventListener('mousedown', dragHandler);
}