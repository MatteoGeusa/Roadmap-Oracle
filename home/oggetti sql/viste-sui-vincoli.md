## Che cos'è?

Le viste `USER_CONSTRAINTS` e `USER_CONS_COLUMNS` (esistono anche `ALL_` e `DBA_CONSTRAINTS`).

## A cosa serve?

Vedere nome, tipo, stato, validazione e colonne dei vincoli; `R_CONSTRAINT_NAME` indica la PK o UNIQUE a cui punta una foreign key.

## Codice

```sql
SELECT constraint_name, constraint_type, status, validated, deferrable, r_constraint_name
FROM user_constraints
WHERE table_name = 'DIPENDENTI';

SELECT constraint_name, column_name, position
FROM user_cons_columns
WHERE table_name = 'DIPENDENTI';
```
