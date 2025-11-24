const clickMe = () => {
    alert("You clicked it.")
}

$(document).ready(function() {
    $('materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    })
})