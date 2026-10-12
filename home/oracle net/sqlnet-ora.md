## Che cos'è?

Un file di configurazione, lato client e lato server.

## A cosa serve?

Definisce il comportamento globale: metodi di risoluzione dei nomi, durata e timeout delle sessioni, tentativi di connessione, cifratura, filtri sugli IP.

## Codice

```text
# $TNS_ADMIN/sqlnet.ora

# metodi di risoluzione dei nomi
NAMES.DIRECTORY_PATH = (TNSNAMES, EZCONNECT)

# dead connection detection (minuti) e tempo massimo per il login (secondi)
SQLNET.EXPIRE_TIME = 10
SQLNET.INBOUND_CONNECT_TIMEOUT = 60

# cifratura del traffico, lato server
SQLNET.ENCRYPTION_SERVER = REQUIRED
SQLNET.ENCRYPTION_TYPES_SERVER = (AES256)

# solo questi IP possono collegarsi (vale dopo il riavvio del listener)
TCP.VALIDNODE_CHECKING = YES
TCP.INVITED_NODES = (192.168.56.101, 192.168.56.1)
```
