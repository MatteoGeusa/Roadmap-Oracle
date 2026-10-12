## Che cos'è?

Un comando DML che elimina le righe scelte (`WHERE`) o tutte.

## A cosa serve?

Togliere righe con la possibilità di ROLLBACK prima del COMMIT. Genera undo per ogni riga (lento su tabelle grandi), lo spazio resta allocato e l'high water mark non scende; i trigger `ON DELETE` scattano.
