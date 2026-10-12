## Che cos'è?

Un vincolo scritto accanto alla colonna nel `CREATE TABLE`.

## A cosa serve?

Definire vincoli su una sola colonna; `NOT NULL` si può scrivere solo così.

## Codice

```sql
CREATE TABLE reparti (
  id_reparto NUMBER       CONSTRAINT reparti_pk PRIMARY KEY,
  nome       VARCHAR2(50) CONSTRAINT reparti_nome_nn NOT NULL
);
```
