import { resetArray } from "./arraymethods.js";
import { startSolve } from "./solver.js";

export let delay = 10;

export function enableControls() {
    $("#clearBtn").on("click", clearSudoku);
    $("#solveBtn").on("click", startSolve);
    $("#fasterBtn").on("click", decreaseDelay);
    $("#slowerBtn").on("click", increaseDelay);
}

function decreaseDelay() {
    if (delay < 10) {
        delay = 0;
        $("#fasterBtn").prob("disabled", true);
    }
    delay /= 2;
}

function increaseDelay() {
    delay == 0 ? delay = 10 : (delay *= 2);
}

function clearSudoku() {
    $(".cell").val("").removeClass("fixed");
    $("#info").text("");
    resetArray();
}