## Che cos'è?

La prima fase di avvio (`STARTUP NOMOUNT`).

## A cosa serve?

Oracle legge il parameter file e alloca solo le risorse dell'istanza (SGA e processi in background). L'istanza non è ancora collegata a nessun database e l'unico file letto è il parameter file. È la fase da cui si lancia `CREATE DATABASE`.
