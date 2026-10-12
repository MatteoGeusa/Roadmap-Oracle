## Che cos'è?

La Program Global Area: memoria **privata**, riservata a ciascun processo server o sessione e non condivisa, nemmeno in RAC. Si divide in SQL work area e memoria di sessione.

## A cosa serve?

Ospita ciò che serve solo alla singola sessione: per esempio l'ordinamento dei risultati di una query (`ORDER BY`).
