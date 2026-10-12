Le proprietà ACID sono le garanzie che il database offre su ogni transazione.

| Proprietà | Significato | Esempio |
| --- | --- | --- |
| **A**tomicità | La transazione va a buon fine per intero, o viene fatto rollback di tutto | Bonifico bancario: se l'addebito riesce ma l'accredito fallisce, viene annullato anche l'addebito |
| **C**oerenza (consistenza) | Il database passa sempre da uno stato valido a un altro stato valido | Un vincolo di integrità (es. `CHECK salary > 0`) non può mai essere violato, nemmeno a metà transazione |
| **I**solamento | Finché la transazione non termina, le altre sessioni non vedono le modifiche intermedie | Se aggiorno lo stipendio di un dipendente, un altro utente che fa SELECT nel frattempo vede ancora il valore vecchio |
| **D**urabilità | Dopo il COMMIT, le modifiche sono permanenti (anche in caso di crash) | Garantita fisicamente dal **redo log** — vedi sezioni 4 e 5 |