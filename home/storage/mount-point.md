## Che cos'è?

Il punto dell'alberatura delle directory a cui si aggancia un file system. Il mount richiede due parametri: il logical volume e il punto di mount.

## A cosa serve?

Rende accessibile il file system. Il nome di un file è il suo path assoluto, quindi dipende dal mount point: rimontando altrove, tutti i file cambiano nome. Se si monta su una directory già popolata, i file che conteneva diventano inaccessibili finché il file system resta montato.

## Codice

```bash
sudo mkdir -p /u02                            # una directory vuota
sudo mount /dev/vg_oracle/lv_data /u02
sudo chown oracle:oinstall /u02

# per rimontarlo a ogni avvio: una riga in /etc/fstab
echo '/dev/vg_oracle/lv_data  /u02  xfs  defaults  0 0' | sudo tee -a /etc/fstab
sudo mount -a                                 # nessun errore = riga corretta
```
