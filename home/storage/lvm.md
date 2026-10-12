## Che cos'è?

Il Logical Volume Manager: uno strato di astrazione tra il disco e il file system.

## A cosa serve?

Prepara un disco RAW seguendo la gerarchia Physical Volume, Volume Group, Logical Volume, formattazione e mount.

## Codice

```bash
sudo pvcreate /dev/sdb                        # 1. Physical Volume
sudo vgcreate vg_oracle /dev/sdb              # 2. Volume Group
sudo lvcreate -n lv_data -L 50G vg_oracle     # 3. Logical Volume
sudo mkfs.xfs /dev/vg_oracle/lv_data          # 4. formattazione
sudo mkdir -p /u02
sudo mount /dev/vg_oracle/lv_data /u02        # 5. mount
sudo chown oracle:oinstall /u02               # Oracle deve poterci scrivere

# controllo
sudo pvdisplay
sudo vgdisplay
sudo lvdisplay
lsblk
```
