## Che cos'è?

Il modo di avviare SQL*Plus con `sqlplus / as sysdba`.

## A cosa serve?

Accedere con l'utente del sistema operativo (quello con cui si è fatto l'accesso) e con i privilegi SYSDBA, i massimi. Permette di operare anche quando il database non è ancora aperto.

## Codice

```bash
# sul server, con l'utente del sistema operativo che ha installato Oracle
export ORACLE_SID=ORATEST
sqlplus / as sysdba
```

```sql
-- una volta dentro
SHOW USER
SELECT status FROM v$instance;
```
