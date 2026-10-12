## Che cos'è?

Strutture dati aggiuntive che Oracle crea e tiene aggiornate accanto alla tabella.

## A cosa serve?

Trovare rapidamente un valore in una colonna: i record non sono registrati in nessun ordine specifico, e senza indice Oracle dovrebbe scorrere tutte le righe.

## Codice

```sql
CREATE INDEX clienti_cognome_ix ON clienti (cognome);
DROP INDEX clienti_cognome_ix;

-- indici di una tabella
SELECT index_name, index_type, uniqueness, visibility
FROM user_indexes
WHERE table_name = 'CLIENTI';
```
