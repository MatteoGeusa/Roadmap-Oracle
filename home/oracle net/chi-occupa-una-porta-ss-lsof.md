## Che cos'è?

I comandi `ss -tulpn`, `ss -tlpn 'sport = :1521'`, `lsof -i :1521`, `netstat -tulpn`.

## A cosa serve?

Scoprire quale processo occupa una porta, per esempio quando il listener non parte per indirizzo già in uso (TNS-12542).

## Codice

```bash
sudo ss -tulpn                    # socket TCP/UDP in ascolto, con processo e PID
sudo ss -tlpn 'sport = :1521'     # solo la porta 1521
sudo lsof -i :1521
sudo lsof -i -P -n | grep LISTEN
sudo netstat -tulpn               # vecchio stile (net-tools)
ps -ef | grep tnslsnr             # listener attivi, nome, utente e home
```
