## Che cos'è?

Una directory predefinita che esiste già nel database.

## A cosa serve?

È quella che Data Pump usa se non se ne indica un'altra.

## Codice

```sql
SELECT directory_path FROM dba_directories WHERE directory_name = 'DATA_PUMP_DIR';

-- un utente non DBA deve ricevere il permesso
GRANT READ, WRITE ON DIRECTORY data_pump_dir TO nome_utente;
```

```bash
# senza DIRECTORY= Data Pump usa DATA_PUMP_DIR
expdp nome_utente DUMPFILE=nome_utente.dmp SCHEMAS=nome_utente
```
