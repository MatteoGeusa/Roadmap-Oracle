## Che cos'è?

Una porzione ricavata dallo spazio del Volume Group (`lvcreate`).

## A cosa serve?

Una volta formattato diventa un file system. Per l'LVM lo spazio risulta occupato già dal momento in cui si crea il logical volume.

## Codice

```bash
sudo lvcreate -n lv_data -L 50G vg_oracle    # 50 GB presi dal volume group vg_oracle
sudo lvdisplay
```
