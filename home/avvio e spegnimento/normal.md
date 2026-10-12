## Che cos'è?

La modalità di shutdown di default (`SHUTDOWN`).

## A cosa serve?

Non accetta nuove connessioni e resta in piedi finché ogni utente connesso non si scollega volontariamente; solo dopo il database viene spento.

## Codice

```sql
SHUTDOWN;          -- equivale a SHUTDOWN NORMAL
```
