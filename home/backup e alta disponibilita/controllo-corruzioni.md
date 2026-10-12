## Che cos'è?

La verifica di RMAN sulla presenza di corruzioni nel database o nei singoli blocchi.

## A cosa serve?

Dopo un crash, accertarsi che non ci siano corruzioni.

## Codice

```text
# da rman target /: legge tutti i blocchi senza fare il backup
VALIDATE DATABASE;
BACKUP VALIDATE CHECK LOGICAL DATABASE;
```

```sql
-- blocchi corrotti trovati dall'ultimo controllo
SELECT file#, block#, blocks, corruption_type FROM v$database_block_corruption;
```
