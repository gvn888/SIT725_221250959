const clickMe = () => {
    alert("You clicked it.")
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class=col s4 center-align">'+
        '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
        '</div><div class="card-content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
        '<div class="card-reveal">'+
            '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
            '<p class="card-text">'+item.description+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

$(document).ready(function() {

    $("#images").on("click", function (e) {
        e.preventDefault();

        fetch("/api/images")
            .then(response => response.json())
            .then(data => {
                const container = $("#imageList");
                container.empty();

                if (!data.images || data.images.length === 0) {
                    container.append("<p>No images found.</p>");
                    return;
                }

                data.images.forEach(img => {
                    const card = `
                        <div class="card small" style="display:inline-block; margin:10px; width:200px;">
                            <div class="card-image">
                                <img src="${img.url}" style="height:150px; object-fit:contain;">
                            </div>
                            <div class="card-content">
                                <span class="card-title" style="font-size:1rem">${img.name}</span>
                            </div>
                        </div>
                    `;
                    container.append(card);
                });
            })
            .catch(err => {
                console.error("Error loading images:", err);
            });
    });
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
});