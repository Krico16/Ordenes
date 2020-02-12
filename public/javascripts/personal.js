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
        var values = $(".repeater").repeaterVal();
        var id = $("#pid").val();
        $.ajax({
            url: '/projects/continue/' + id,
            data: values,
            method: 'POST',
            dataType: 'json',
            success: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        })
    });
})