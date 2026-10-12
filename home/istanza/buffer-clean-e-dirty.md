## Che cos'è?

I due stati di un buffer: **clean** se è identico alla copia su disco, **dirty** se è stato modificato e non ancora scritto.

## A cosa serve?

Indicano cosa va scritto su disco: DBWn scrive i dirty buffer nei data file, e l'LRU non libera un dirty buffer finché DBWn non l'ha scritto.
