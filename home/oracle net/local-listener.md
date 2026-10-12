## Che cos'è?

Un parametro dell'istanza.

## A cosa serve?

Dice a LREG dove si trova il listener; il database non legge il `listener.ora`. Se è vuoto, LREG usa `(HOST=<hostname>)(PORT=1521)`, che deve essere un indirizzo su cui il listener ascolta davvero.

## Codice

```sql
-- indirizzo esplicito
ALTER SYSTEM SET local_listener = '(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.56.101)(PORT=1521))' SCOPE = BOTH;

-- via IPC: non dipende dall'IP del listener
ALTER SYSTEM SET local_listener = '(ADDRESS=(PROTOCOL=IPC)(KEY=EXTPROC1521))' SCOPE = BOTH;

-- più listener
ALTER SYSTEM SET local_listener = '(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.56.101)(PORT=1521))(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.56.101)(PORT=1522)))' SCOPE = BOTH;

-- un alias del tnsnames.ora del server, es.
-- LISTENER_ORATEST = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
ALTER SYSTEM SET local_listener = 'LISTENER_ORATEST' SCOPE = BOTH;

ALTER SYSTEM REGISTER;

-- tornare al default
ALTER SYSTEM SET local_listener = '' SCOPE = BOTH;
ALTER SYSTEM RESET local_listener SCOPE = SPFILE;   -- toglie il parametro dallo SPFILE
```
