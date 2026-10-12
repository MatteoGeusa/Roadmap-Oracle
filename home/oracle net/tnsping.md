## Che cos'è?

Un comando di diagnostica: `tnsping ALIAS` oppure `tnsping host:porta/servizio`.

## A cosa serve?

Mostra quale `sqlnet.ora` usa e come traduce l'alias (TNS-03505 = alias non trovato), e verifica che il listener risponda.

## Codice

```bash
tnsping SERVIZIO_A                        # con un alias del tnsnames.ora
tnsping 192.168.56.101:1521/servizio_a    # con Easy Connect
```
