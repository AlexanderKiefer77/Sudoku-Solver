import { getUnsolvedPosition, hasContradiction, setValue } from "./arraymethods.js";
import { sleep } from "./utils.js";

let solving = false;

function stopSolve() {
    solving = false;
}

export async function startSolve() {
    solving = true;
    $(".cell")
        .filter(function () {
            return $(this).val()
        })
        .addClass("fixed");
    $("#info").text("Solving...");
    $(".cell, #clearBtn").prop("disabled", true);
    $("#sudoku").addClass("solving");
    const solution = await solveSudoku();
    if (solution == true) {
        $("#info").text("The Sudoku is solved");
    } else if (solution == false) {
        $("#info").text("The Sudoku cannot be solved");
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
    await sleep(1000);
    const pos = getUnsolvedPosition();
    if (!pos) return true;
    const { row, col } = pos;
    for (let val = 1; val <= 9; val++) {
        if (!hasContradiction(row, col, val)) {
            setValue(row, col, val);
            if (await solveSudoku()) {
                return true;
            }
        }
    }
    setValue(row, col, 0);
    return false;
}
