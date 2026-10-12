## Che cos'è?

Programmi che girano costantemente per conto dell'istanza, uno dedicato a ogni funzione critica. Nascono tutti già in NOMOUNT.

## A cosa serve?

Separando i compiti si ottengono parallelismo e resilienza: se un processo fallisce, l'istanza può reagire senza fermarsi del tutto. `V$BGPROCESS` mostra quelli attivi.

## Codice

```sql
SELECT pname, description FROM v$bgprocess WHERE paddr <> '00';
```

```bash
# gli stessi processi visti dal sistema operativo: ora_<processo>_<SID>
ps -ef | grep ora_ | grep ORATEST
```
