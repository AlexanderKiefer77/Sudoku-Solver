import { getUnsolvedPosition, hasContradiction, setValue } from "./arraymethods.js";
import { delay } from "./controls.js";
import { sleep } from "./utils.js";

let solving = false;

export function toggleSolve() {
    solving ? stopSolve() : startSolve();
}

function stopSolve() {
    solving = false;
    $("#solveBtn").text("Solve");
}

async function startSolve() {
    solving = true;
    $(".cell")
        .filter(function () {
            return $(this).val()
        })
        .addClass("fixed");
    $("#info").text("Solving...");
    $("#solveBtn").text("Stop");
    $(".cell, #clearBtn").prop("disabled", true);
    $("#sudoku").addClass("solving");
    const solution = await solveSudoku();
    if (solution == true) {
        $("#info").text("The Sudoku is solved");
    } else if (solution == false) {
        $("#info").text("The Sudoku cannot be solved");
    } else if (solution == "stopped") {
         $("#info").text("");
    }
    $(".cell, #clearBtn").prop("disabled", false);
    $("#sudoku").removeClass("solving");
    stopSolve();
}


/**
 * IDEE: Wir lösen das Rätsel rekursiv !
 * 
 * Ein Sudoku ist lösbar, wenn es entweder keine leere Zelle gibt,
 * oder aber es eine leere Zelle gibt, für die man einen Wert von 1 bis 9 findet,
 * der keinen Sudoku-Regeln widerspricht und mit dem das Sudoku gelöst werden kann.
 * Anderfalls muss diese Zelle leer bleiben.
 */

async function solveSudoku() {
    if (delay) await sleep(delay);
    const pos = getUnsolvedPosition();
    if (!pos) return true;
    const { row, col } = pos;
    for (let val = 1; val <= 9; val++) {
        if (!hasContradiction(row, col, val)) {
            setValue(row, col, val);
            if (!solving) return "stopped";
            if (await solveSudoku() == true) {
                return true;
            }
        }
    }
    setValue(row, col, 0);
    return false;
}
