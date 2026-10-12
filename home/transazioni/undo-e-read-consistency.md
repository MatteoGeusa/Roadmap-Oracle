## Che cos'è?

Il meccanismo di **read consistency**, basato sul tablespace UNDO: è ciò che rende reale la proprietà di Isolamento.

## A cosa serve?

Chi legge vede sempre una fotografia consistente dei dati: se una riga è in corso di modifica (non ancora committata) da un altro utente, Oracle ricostruisce dall'undo la versione precedente.
