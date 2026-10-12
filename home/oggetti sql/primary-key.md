## Che cos'è?

Il vincolo che definisce la colonna (o le colonne) chiave primaria della tabella. Una sola per tabella; crea, o riusa, un indice univoco.

## A cosa serve?

La colonna diventa obbligatoria e non è mai possibile inserire due righe con lo stesso valore nella chiave.

## Codice

```sql
-- su una colonna
CREATE TABLE reparti (
  id_reparto NUMBER CONSTRAINT reparti_pk PRIMARY KEY,
  nome       VARCHAR2(50)
);

-- su più colonne, o su una tabella esistente
ALTER TABLE presenze ADD CONSTRAINT presenze_pk PRIMARY KEY (id_dip, giorno);

INSERT INTO reparti VALUES (10, 'Vendite');
INSERT INTO reparti VALUES (10, 'Acquisti');   -- ORA-00001
```
