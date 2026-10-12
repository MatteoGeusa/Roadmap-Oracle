## Che cos'è?

Un disco appena collegato alla macchina: non formattato e non utilizzabile.

## A cosa serve?

È il punto di partenza: la prima operazione è inizializzarlo (tutto o in parte) come Physical Volume.

## Codice

```bash
lsblk                 # il nuovo disco (es. sdb) compare senza partizioni né mount point
sudo lvmdiskscan      # dischi e volumi visti dall'LVM
```
