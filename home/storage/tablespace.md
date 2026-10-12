## Che cos'è?

Un contenitore **logico**, composto da uno o più datafile: è l'unità logica più grande.

## A cosa serve?

Stabilisce in quale datafile va scritto un segment: alla creazione di una tabella si indica il tablespace (o Oracle usa quello di default) e Oracle sceglie poi in quale datafile scrivere.

## Codice

```sql
CREATE TABLESPACE dati
  DATAFILE '/u02/oradata/ORATEST/dati01.dbf' SIZE 500M AUTOEXTEND ON NEXT 100M MAXSIZE 5G;

-- una tabella in un tablespace preciso
CREATE TABLE clienti (id_cliente NUMBER, cognome VARCHAR2(50)) TABLESPACE dati;

-- tablespace di default e quota di un utente
ALTER USER nome_utente DEFAULT TABLESPACE dati QUOTA 1G ON dati;

-- spazio libero per tablespace
SELECT tablespace_name, ROUND(SUM(bytes) / 1024 / 1024) AS mb_liberi
FROM dba_free_space
GROUP BY tablespace_name;
```
