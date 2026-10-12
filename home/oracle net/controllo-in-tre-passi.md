## Che cos'è?

La procedura di diagnostica: 1) l'alias si risolve? 2) il listener risponde? 3) il servizio è registrato?

## A cosa serve?

Isolare il problema un livello alla volta con `tnsping`, `lsnrctl status`, `lsnrctl services` e `v$listener_network`.

## Codice

```bash
tnsping SERVIZIO_A     # 1. l'alias si risolve? (TNS-03505 = alias non trovato)
lsnrctl status         # 2. il listener risponde? (TNS-12541 = nessun listener)
lsnrctl services       # 3. il servizio è registrato? (ORA-12514 = servizio sconosciuto)
```

```sql
-- il passo 3 visto dal database
SELECT network, type, value FROM v$listener_network;
```
