## Che cos'è?

Un programma a riga di comando, scritto in C, che fa parte del software Oracle (sta nell'Oracle Home). Sintassi: `SQLPLUS [Options] [Logon | /NOLOG] [Start]`.

## A cosa serve?

Collegarsi al database ed eseguire comandi. Con `sqlplus / as sysdba` si accede come utente del sistema operativo con i privilegi SYSDBA.

## Codice

```bash
sqlplus / as sysdba                                      # utente del sistema operativo, privilegi SYSDBA
sqlplus nome_utente                                      # chiede la password: non resta nella cronologia
sqlplus nome_utente@SERVIZIO_A                           # alias del tnsnames.ora
sqlplus nome_utente@//192.168.56.101:1521/servizio_a     # Easy Connect
sqlplus /nolog                                           # senza connessione, poi CONNECT
```

```sql
-- dentro SQL*Plus
@script.sql
SHOW USER
EXIT
```
