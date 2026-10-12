## Che cos'è?

Il tablespace di UNDO creato da `CREATE DATABASE` (`UNDOTBS1`), indicato dal parametro `undo_tablespace`.

## A cosa serve?

Conserva gli undo record: servono per il rollback e per fornire una vista coerente alle altre sessioni.
