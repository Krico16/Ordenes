$(function () {
    $('.repeater').repeater({
        initEmpty: false,
        hide: function (deleteElement) {
            if (confirm('Desea eliminar estos datos?')) {
                $(this).slideUp(deleteElement);
            }
        },
        isFirstItemUndeletable: true
    })

    $("input.p").inputmask({
        alias: 'decimal',
        allowMinus: false,
        digits: 2,
        max: 9999.99
    })

    $("#send").on('click', function(e){
        e.preventDefault();
        var values = $(".repeater").repeaterVal().grupo;
        var vals = Array();
        values.forEach(element => {
            vals.push(element);
        });
        console.log(vals);
        var id = $("#pid").val();
        $.ajax({
            url: '/projects/continue/' + id,
            method: 'POST',
            data: { asd: vals},
            success: (res) => {
                if(res == 'Saved'){
                    window.location = '../projects'
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    });
})