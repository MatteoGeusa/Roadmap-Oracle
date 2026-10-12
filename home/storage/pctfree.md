## Che cos'è?

Un parametro (percent free), per segmento: la percentuale di spazio del blocco da lasciare libera. Si può definire alla creazione del database o delle singole tabelle.

## A cosa serve?

Preserva lo spazio perché un record già nel blocco possa essere modificato e occupare più spazio.

## Codice

```sql
CREATE TABLE ordini (
  id_ordine NUMBER PRIMARY KEY,
  note      VARCHAR2(4000)
) PCTFREE 20;                    -- lascia libero il 20% di ogni blocco

ALTER TABLE ordini PCTFREE 30;   -- vale per i blocchi usati da ora in poi

SELECT table_name, pct_free FROM user_tables WHERE table_name = 'ORDINI';
```
