## Che cos'è?

Il meccanismo che riporta una tabella a uno stato precedente nel tempo, sfruttando i dati di undo già mantenuti dal database.

## A cosa serve?

Rimedia agli errori umani, come un COMMIT eseguito per sbaglio, senza bisogno di un backup separato. ACID garantisce la durabilità dopo il commit, quindi serve un meccanismo diverso per tornare indietro.
