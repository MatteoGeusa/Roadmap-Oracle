## Che cos'è?

La sequenza di fasi con cui Oracle esegue una modifica: prima del COMMIT (parse, buffer hit o miss, lock, undo, redo e dirty buffer) e al COMMIT (SCN, LGWR, rilascio dei lock, DBWn).

## A cosa serve?

Mostra come lavorano insieme cache, undo, redo log e data file. Tutto ciò che intercorre tra un commit o rollback e il successivo è una transazione.
