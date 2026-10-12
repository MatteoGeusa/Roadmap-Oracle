## Che cos'è?

Uno dei tre tipi di file fisici del database: contiene i **redo record**.

## A cosa serve?

Registra ogni comando o modifica (DDL e DML) non ancora applicato ai data file. LGWR ci scrive a ogni COMMIT, ed è il redo log a garantire fisicamente la durabilità: dopo un crash, SMON lo riapplica per ricostruire i blocchi mancanti.
