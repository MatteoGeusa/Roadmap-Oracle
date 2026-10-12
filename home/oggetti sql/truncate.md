## Che cos'è?

Un comando DDL, con COMMIT implicito, che elimina tutte le righe senza `WHERE`.

## A cosa serve?

Svuotare una tabella velocemente: quasi nessun undo e redo, rilascia gli extent (o li tiene con `REUSE STORAGE`) e riporta giù l'high water mark. Non si torna indietro con ROLLBACK.
