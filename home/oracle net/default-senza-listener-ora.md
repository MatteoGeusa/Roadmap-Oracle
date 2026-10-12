## Che cos'è?

Il comportamento del listener quando il `listener.ora` non esiste.

## A cosa serve?

Usa i default: nome `LISTENER`, TCP porta 1521, `HOST=` vuoto, cioè tutti gli IP della macchina (127.0.0.1 compreso). È normale che il file non esista.

## Codice

```bash
lsnrctl start
lsnrctl status | grep -i "parameter file"   # nessuna riga: il listener usa i default
```
