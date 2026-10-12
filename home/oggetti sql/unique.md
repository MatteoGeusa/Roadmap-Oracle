## Che cos'è?

Il vincolo di unicità su colonne diverse dalla chiave primaria (es. il codice fiscale). Crea, o riusa, un indice univoco.

## A cosa serve?

Impedire che due righe abbiano gli stessi valori in quelle colonne. Ammette più righe con valore NULL.

## Codice

```sql
ALTER TABLE dipendenti ADD CONSTRAINT dipendenti_cf_uk UNIQUE (cod_fiscale);

INSERT INTO dipendenti (id_dip, cod_fiscale) VALUES (1, 'RSSMRA80A01H501U');
INSERT INTO dipendenti (id_dip, cod_fiscale) VALUES (2, 'RSSMRA80A01H501U');   -- ORA-00001
INSERT INTO dipendenti (id_dip, cod_fiscale) VALUES (3, NULL);                 -- ammesso, anche più volte
```
