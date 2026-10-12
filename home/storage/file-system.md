## Che cos'è?

Una porzione di disco formattata e organizzata in modo che il sistema operativo possa usarla per memorizzare file. Non si crea dal nulla: è un logical volume formattato.

## A cosa serve?

Ospita i file, e quindi i datafile di Oracle. Per renderlo accessibile va montato su un mount point.

## Codice

```bash
df -h       # file system montati e spazio libero
lsblk -f    # tipo di file system e mount point di ogni volume
```
