## Che cos'è?

Il processo `tnslsnr`, indipendente dal database: non parte con `STARTUP` e non si ferma con `SHUTDOWN`.

## A cosa serve?

Accetta le connessioni dei client (pacchetti TNS), cerca il servizio richiesto e crea il processo server o passa la connessione a un dispatcher, restando libero per nuove richieste.

## Codice

```bash
lsnrctl start            # avvia il listener LISTENER
ps -ef | grep tnslsnr    # listener attivi, con utente e Oracle Home
```
