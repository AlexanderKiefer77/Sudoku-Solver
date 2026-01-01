let solving = false;

function stopSolve() {
    solving = false;
}

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
    const solution = solveSudoku();
    if (solution == true) {
        $("#info").text("The Sudoku is solved");
    } else if (solution == false) {
        $("#info").text("The Sudoku cannot be solved");
    }
    $(".cell, #clearBtn").prop("disabled", false);
    $("#sudoku").removeClass("solving");
    stopSolve();
}

function solveSudoku() {

}