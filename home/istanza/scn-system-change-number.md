## Che cos'è?

Il System Change Number: un numero progressivo univoco assegnato a ogni transazione committata.

## A cosa serve?

Confrontando gli SCN nei vari file, Oracle sa subito se un data file è aggiornato, senza confrontarne l'intero contenuto con i redo log. Lo usano anche il CR clone e il Flashback.
