## Che cos'è?

Il metodo di risoluzione con gli alias su un server LDAP.

## A cosa serve?

Un controllo centralizzato degli alias, tipico degli ambienti aziendali.

## Codice

```text
# sqlnet.ora: prima LDAP, poi il tnsnames.ora
NAMES.DIRECTORY_PATH = (LDAP, TNSNAMES)
```

```text
# ldap.ora, nella stessa cartella: server LDAP (porta e porta SSL) e contesto degli alias
DIRECTORY_SERVERS = (ldap.azienda.it:389:636)
DEFAULT_ADMIN_CONTEXT = "dc=azienda,dc=it"
DIRECTORY_SERVER_TYPE = OID
```
