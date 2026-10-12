## Che cos'è?

La somma di uno o più Physical Volume: la sua capacità è la somma dei PV che contiene (`vgcreate`, `vgdisplay`).

## A cosa serve?

Fornisce lo spazio da cui si ricavano i Logical Volume. Si può creare appena esiste almeno un PV.

## Codice

```bash
sudo vgcreate vg_oracle /dev/sdb    # serve almeno un Physical Volume
sudo vgextend vg_oracle /dev/sdc    # più spazio: si aggiunge un altro PV
sudo vgdisplay
```
