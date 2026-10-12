## Che cos'è?

Una variabile d'ambiente con la directory dei file di configurazione di Oracle Net.

## A cosa serve?

Dice a Oracle dove trovare `listener.ora`, `tnsnames.ora` e `sqlnet.ora`. Buona pratica: tenerla fuori dall'Oracle Home. Conta il `TNS_ADMIN` dell'ambiente con cui si avvia il database.

## Codice

```bash
# nel .bash_profile dell'utente oracle: i file di rete fuori dall'Oracle Home
export TNS_ADMIN=/u01/app/oracle/network/admin
mkdir -p $TNS_ADMIN
```
