## Che cos'è?

Un puntatore all'ultimo blocco del segmento che contiene record.

## A cosa serve?

Dice al database l'ultimo blocco oltre il quale non ci sono dati da cercare: un full table scan legge fino all'high water mark. `DELETE` non lo abbassa, `TRUNCATE` sì.
