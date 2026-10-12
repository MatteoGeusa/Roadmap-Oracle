## Che cos'è?

Il contenuto del tablespace UNDO: non una copia dell'intero blocco, ma solo i vecchi valori delle colonne effettivamente modificate.

## A cosa serve?

Conserva deliberatamente il valore precedente prima che venga sovrascritto nel buffer, per il rollback e per la read consistency.
