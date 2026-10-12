## Che cos'è?

La sezione obbligatoria del `listener.ora`: `DESCRIPTION`, `ADDRESS_LIST`, `ADDRESS` con `PROTOCOL`, `HOST`, `PORT`.

## A cosa serve?

Definire su quali indirizzi, porte e protocolli (TCP, IPC) il listener ascolta.

## Codice

```text
# listener.ora
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.56.101)(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )
```

```bash
# nuovi indirizzi: riavvio del listener
lsnrctl stop
lsnrctl start
lsnrctl status    # sezione "Listening Endpoints Summary"
```
