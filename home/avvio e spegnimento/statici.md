## Che cos'è?

Un parametro che non si può modificare a caldo.

## A cosa serve?

Per cambiarlo serve riavviare l'istanza, a prescindere dal tipo di file (PFILE o SPFILE).

## Codice

```sql
-- un parametro statico si cambia solo su file...
ALTER SYSTEM SET processes = 500 SCOPE = SPFILE;

-- ...e vale dopo il riavvio
SHUTDOWN IMMEDIATE;
STARTUP;
SHOW PARAMETER processes

-- elenco dei parametri statici
SELECT name FROM v$parameter WHERE issys_modifiable = 'FALSE' ORDER BY name;
```
