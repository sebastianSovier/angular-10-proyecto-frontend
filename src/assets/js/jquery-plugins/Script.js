
$(document).ready(function () {
    ////////////////////COMPORTAMIENTO TABLA SELECCIONABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    $(document).on("mouseover", ".seleccionable > tbody > tr", function () {
        $(this).css("cursor", "pointer");
        
        if (!$(this).hasClass("seleccionado"))
            $(this).css("background-color", "#f2f2f2");
    });
    $(document).on("mouseleave", ".seleccionable > tbody > tr", function () {
        var colorFondo = $(this).css("background-color");
        if (colorFondo != "rgb(204, 204, 204)")
            $(this).css("background-color", "");
    });
    $(document).on("click", ".seleccionable > tbody > tr", function () {
        $(".seleccionable > tbody > tr").css("background-color", "");
        $(".seleccionado").removeClass("seleccionado");
        $(this).css("background-color", "#cccccc");
        $(this).addClass("seleccionado");
    });
    ////////////////////COMPORTAMIENTO TABLA SELECCIONABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\







});