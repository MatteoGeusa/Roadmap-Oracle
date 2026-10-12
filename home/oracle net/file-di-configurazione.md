## Che cos'è?

I file `listener.ora`, `tnsnames.ora` e `sqlnet.ora`, in `$ORACLE_HOME/network/admin` oppure nella directory indicata da `TNS_ADMIN`.

## A cosa serve?

Configurano il listener, gli alias di connessione e il comportamento globale di Oracle Net. In `network/admin/samples/` ci sono solo esempi, con sintassi datata.

## Codice

```bash
echo $TNS_ADMIN                             # se è valorizzata, i file sono lì
ls $ORACLE_HOME/network/admin               # altrimenti qui

lsnrctl status | grep -i "parameter file"   # listener.ora in uso
tnsping SERVIZIO_A                          # "Used parameter files": sqlnet.ora in uso
```
