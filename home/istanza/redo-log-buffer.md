## Che cos'è?

Un'area della SGA: il registro in RAM di ogni modifica ai dati, prima del COMMIT. È diverso dai redo log file su disco.

## A cosa serve?

Raccoglie i redo record, che LGWR scrive fisicamente su disco al COMMIT.
