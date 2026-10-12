## Che cos'è?

Transaction Control Language: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

## A cosa serve?

Controlla l'esito delle transazioni. Regola pratica: COMMIT o ROLLBACK il prima possibile, perché una transazione aperta a lungo tiene bloccati i lock e fa crescere il segmento di undo.
