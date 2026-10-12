## Che cos'è?

La parte della shared pool che contiene i piani di esecuzione già calcolati per le query.

## A cosa serve?

Evita di ricalcolare il piano: se lo stesso identico statement viene riproposto e Oracle lo trova qui, lo riusa (soft parse). Anche una vista ne beneficia, perché la sua query viene rieseguita ogni volta.
