## Che cos'è?

Il nome con cui i client si collegano a un database (`SERVICE_NAME`) e che viene annunciato al listener. Il nome dell'istanza (SID) non diventa un servizio.

## A cosa serve?

Indirizzare le connessioni: si usa sempre `SERVICE_NAME`, mai il SID, ed è obbligatorio per le PDB, che hanno un servizio ciascuna.

## Codice

```sql
SELECT name, network_name FROM dba_services;    -- servizi definiti
SELECT name FROM v$active_services;             -- servizi attivi
```

```bash
# ci si collega sempre per SERVICE_NAME, mai per SID
sqlplus nome_utente@//192.168.56.101:1521/servizio_a
```
