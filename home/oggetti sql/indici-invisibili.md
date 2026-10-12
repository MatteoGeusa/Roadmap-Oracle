## Che cos'è?

Un indice spento (`INVISIBLE`), da Oracle 12c: sulla stessa colonna possono esistere più indici, ma solo uno acceso alla volta.

## A cosa serve?

Sperimentare un indice diverso senza buttare giù quello che già funziona.

## Codice

```sql
-- un B-tree acceso sulla colonna
CREATE INDEX clienti_cognome_ix ON clienti (cognome);

-- per provarne un altro tipo, prima si spegne il primo
ALTER INDEX clienti_cognome_ix INVISIBLE;
CREATE BITMAP INDEX clienti_cognome_bix ON clienti (cognome);   -- nasce acceso

-- tornare al primo: uno solo acceso alla volta
ALTER INDEX clienti_cognome_bix INVISIBLE;
ALTER INDEX clienti_cognome_ix VISIBLE;

-- far usare gli indici spenti solo alla propria sessione, per i test
ALTER SESSION SET optimizer_use_invisible_indexes = TRUE;

SELECT index_name, index_type, visibility FROM user_indexes WHERE table_name = 'CLIENTI';
```
