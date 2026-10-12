## Che cos'è?

Un backup logico: un'esportazione dei dati, fatta con Data Pump (`expdp` e `impdp`). Richiede un database già avviato.

## A cosa serve?

Esportare e reimportare dati, anche un singolo oggetto come snapshot di quel momento, senza le modifiche fatte dopo l'export. File di dump e di log stanno in una Oracle Directory.

## Codice

```sql
-- una volta sola, come DBA
CREATE OR REPLACE DIRECTORY dp_dir AS '/u01/app/oracle/export';
GRANT READ, WRITE ON DIRECTORY dp_dir TO nome_utente;
```

```bash
# export dello schema e import, da shell sul server (chiedono la password)
expdp nome_utente DIRECTORY=dp_dir DUMPFILE=nome_utente.dmp LOGFILE=nome_utente_exp.log SCHEMAS=nome_utente
impdp nome_utente DIRECTORY=dp_dir DUMPFILE=nome_utente.dmp LOGFILE=nome_utente_imp.log

# una sola tabella, come snapshot di questo momento
expdp nome_utente DIRECTORY=dp_dir DUMPFILE=emp.dmp LOGFILE=emp_exp.log TABLES=emp
```
