## Che cos'è?

Il comando a riga di comando che gestisce il listener.

## A cosa serve?

Avviare e fermare il listener (`start`, `stop`), vederne stato e servizi (`status`, `services`) e fargli rileggere il `listener.ora` (`reload`).

## Codice

```bash
lsnrctl start        # avvia LISTENER (lsnrctl start NOME per un altro listener)
lsnrctl stop
lsnrctl status       # stato, file usato, indirizzi di ascolto, servizi
lsnrctl services     # dettaglio dei servizi e degli handler
lsnrctl reload       # rilegge listener.ora senza fermarsi
```
