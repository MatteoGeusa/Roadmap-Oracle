## Che cos'è?

Il metodo di risoluzione con la stringa completa, senza file: `host:porta/servizio`.

## A cosa serve?

Collegarsi senza `tnsnames.ora` (come fa SQL Developer). Il servizio è obbligatorio: senza dà ORA-12504.

## Codice

```bash
# host:porta/servizio, il servizio è obbligatorio
sqlplus nome_utente@//192.168.56.101:1521/servizio_a
tnsping 192.168.56.101:1521/servizio_a
```

```text
# sqlnet.ora del client: EZCONNECT tra i metodi ammessi
NAMES.DIRECTORY_PATH = (TNSNAMES, EZCONNECT)
```
