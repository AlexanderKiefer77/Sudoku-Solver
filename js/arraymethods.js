export let array = [];

// Setzt das Spielfeld-Array auf einen leeren Zustand zurück.
// Es wird ein neues 9x9-Array erstellt, das ausschließlich mit 0 gefüllt ist.
export function resetArray() {
    array = new Array(9)          // Erzeugt ein Array mit 9 Zeilen
        .fill(0)                  // Initialisiert jede Zeile
        .map(() => new Array(9)   // Erzeugt für jede Zeile ein neues Array mit 9 Spalten
            .fill(0));            // Füllt jede Zelle mit dem Wert 0
}

export function getUnsolvedPosition() {
    const row = array.findIndex((row) => row.some((x) => x == 0));
    if (row == -1) {
        return null;
    }
    const col = array[row].findIndex((x) => x == 0);
    return { row, col };
}

