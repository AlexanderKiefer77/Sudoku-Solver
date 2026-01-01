import { resetArray } from "./arraymethods.js";
import { addBlocks, addCells, focusOnFirstCell } from "./cells.js";

$(() => {// damit werden diese Funktionen erst aufgerufen, wenn alles geladen ist
    resetArray();
    addBlocks();
    addCells();
    focusOnFirstCell();
});
