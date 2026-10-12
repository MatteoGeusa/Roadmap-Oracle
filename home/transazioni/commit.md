## Che cos'è?

Il comando TCL che chiude una transazione confermandola.

## A cosa serve?

Rende permanenti le modifiche: Oracle assegna un SCN, LGWR scrive il redo su disco e i lock vengono rilasciati. Da quel momento la durabilità è garantita anche in caso di crash.
