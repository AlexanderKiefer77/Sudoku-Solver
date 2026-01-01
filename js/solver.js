let solving = false;

export function startSolve() {
    solving = true;
    $(".cell")
        .filter(function () {
            return $(this).val()
        })
        .addClass("fixed");
    $("#info").text("Solving...");
    $(".cell, #clearBtn").prop("disabled", true);
    $("#sudoku").addClass("solving");
}