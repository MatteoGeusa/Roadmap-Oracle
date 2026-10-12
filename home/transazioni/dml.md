## Che cos'è?

Data Manipulation Language: `INSERT`, `UPDATE`, `DELETE`, `SELECT`.

## A cosa serve?

Manipola i **dati** dentro le strutture.

## Codice

```sql
INSERT INTO reparti (id_reparto, nome) VALUES (50, 'Ricerca');
UPDATE reparti SET nome = 'Ricerca e sviluppo' WHERE id_reparto = 50;
SELECT * FROM reparti WHERE id_reparto = 50;
DELETE FROM reparti WHERE id_reparto = 50;
COMMIT;    -- le DML vanno confermate, o annullate con ROLLBACK
```
