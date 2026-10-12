## Che cos'è?

Un indice ad albero bilanciato (balanced tree): livelli di gruppi che fanno da indice per il livello inferiore, fino alle foglie con i singoli valori, ciascuno associato al suo rowid.

## A cosa serve?

Arrivare al dato percorrendo l'albero un livello alla volta. Conviene quando la colonna è selettiva.

## Codice

```sql
-- B-tree è il tipo di indice di default
CREATE INDEX clienti_cognome_ix ON clienti (cognome);

SELECT * FROM clienti WHERE cognome = 'ROSSI';
```
