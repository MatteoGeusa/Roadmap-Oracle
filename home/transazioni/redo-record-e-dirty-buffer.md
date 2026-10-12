## Che cos'è?

La fase in cui un redo record viene inserito nel redo log buffer in RAM e il blocco aggiornato viene contrassegnato come dirty buffer.

## A cosa serve?

Registra la modifica in attesa del COMMIT, quando il redo log buffer viene scritto negli online redo log; la scrittura del blocco su disco resta differita.
