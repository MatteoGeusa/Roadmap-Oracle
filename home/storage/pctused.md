## Che cos'è?

Una soglia di riempimento del blocco.

## A cosa serve?

Rende di nuovo disponibile un blocco quando scende sotto quella soglia, per un aggiornamento che libera molto spazio o per una cancellazione.

## Codice

```sql
-- PCTUSED conta solo nei tablespace con gestione manuale dello spazio:
-- con quella automatica (il default) viene ignorato
CREATE TABLESPACE dati_manuali
  DATAFILE '/u02/oradata/ORATEST/dati_manuali01.dbf' SIZE 100M
  SEGMENT SPACE MANAGEMENT MANUAL;

CREATE TABLE ordini_storico (
  id_ordine NUMBER,
  note      VARCHAR2(4000)
) PCTFREE 10 PCTUSED 40 TABLESPACE dati_manuali;

SELECT table_name, pct_free, pct_used FROM user_tables WHERE table_name = 'ORDINI_STORICO';
```
