## Che cos'è?

Un disco RAW, o una parte di esso, inizializzato per l'LVM (`pvcreate`). `pvdisplay` mostra quelli esistenti.

## A cosa serve?

È la prima operazione da fare su un disco RAW: la somma dei Physical Volume forma il Volume Group.

## Codice

```bash
sudo pvcreate /dev/sdb     # tutto il disco
sudo pvcreate /dev/sdc1    # oppure solo una partizione
sudo pvdisplay
```
