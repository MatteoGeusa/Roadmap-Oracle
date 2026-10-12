## Che cos'è?

Le viste `v$listener_network`, `v$active_services`, `dba_services`, `v$parameter`, `v$dispatcher`.

## A cosa serve?

Vedere da SQL listener e servizi annunciati, servizi attivi o solo definiti, parametri di rete e dispatcher. Da SQL si vede solo la registrazione dinamica.

## Codice

```sql
SET LINESIZE 200
COL network FORMAT a20
COL type    FORMAT a20
COL value   FORMAT a100
SELECT network, type, value FROM v$listener_network;

SELECT name FROM v$active_services;              -- attivi
SELECT name, network_name FROM dba_services;     -- definiti, anche non avviati
SELECT name, network, status FROM v$dispatcher;

SELECT SYS_CONTEXT('USERENV', 'SERVER_HOST')  AS server_host,
       SYS_CONTEXT('USERENV', 'IP_ADDRESS')   AS client_ip,   -- vuoto con sqlplus / as sysdba
       SYS_CONTEXT('USERENV', 'SERVICE_NAME') AS servizio
FROM dual;
```
