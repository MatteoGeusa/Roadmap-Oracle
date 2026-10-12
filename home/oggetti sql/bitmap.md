## Che cos'è?

Un indice con una foglia per ogni valore possibile della colonna; a ogni foglia è associata una mappa con un bit per ogni record della tabella.

## A cosa serve?

Velocizzare l'accesso alle colonne con pochi valori distinti, come SESSO (M o F).

## Codice

```sql
CREATE BITMAP INDEX persone_sesso_bix ON persone (sesso);

SELECT index_name, index_type FROM user_indexes WHERE table_name = 'PERSONE';
```
