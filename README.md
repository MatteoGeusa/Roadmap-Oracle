# Roadmap Oracle Database

Una roadmap interattiva per imparare Oracle Database, nello stile di roadmap.sh. Chi legge
esplora la roadmap, apre gli appunti di ogni argomento in un pannello laterale e segna i
propri progressi. Il sito è statico e pubblicato su GitHub Pages; tutti i contenuti stanno
nella cartella `home/`.

L'**indice** a destra segue la roadmap, non le cartelle di `home/`: i titoli fanno da
sezioni, sotto ogni titolo compaiono gli argomenti collegati e sotto ogni argomento i suoi
sotto-argomenti, nell'ordine in cui stanno nella mappa (dall'alto in basso). Un
sotto-argomento collegato a un altro sotto-argomento, invece che direttamente
all'argomento, compare annidato sotto di lui, a qualsiasi profondità: serve per i
dettagli. Nel pannello le sezioni si aprono con un clic;
la casella di ricerca filtra l'indice e i pulsanti ⊞ e ⊟ espandono o comprimono tutto. Le note
compaiono solo se hanno un documento. Per far comparire un nodo al posto giusto basta
collegarlo nella roadmap al nodo sopra di lui.

## Avvio in locale

Serve [Node.js](https://nodejs.org/) 20 o successivo.

```sh
npm install
npm run dev
```

- http://localhost:5173/ è il sito come lo vedono i lettori.
- http://localhost:5173/admin è dove si modificano i contenuti (solo mentre `npm run dev` è attivo).

## Come contribuire: aggiungere documenti o modificare la roadmap

Possono contribuire solo i collaboratori, e ogni modifica deve essere approvata dal
proprietario del repository ([@MatteoGeusa](https://github.com/MatteoGeusa)) prima di
arrivare sul sito.

### 1. Ottenere l'accesso

Chiedi al proprietario di aggiungerti come collaboratore. I collaboratori vengono aggiunti
a mano dal proprietario (su GitHub: Settings → Collaborators); accetta l'invito che ricevi
via email. Senza invito puoi leggere il repository ma non contribuire.

### 2. Lavorare su un proprio branch

Nessuno può fare push direttamente su `main`: si lavora su un branch e lo si propone con una
pull request.

```sh
git clone https://github.com/MatteoGeusa/Roadmap-Oracle.git
cd Roadmap-Oracle
npm install
git switch -c nome-argomento     # un nuovo branch per la tua modifica
npm run dev
```

Apri http://localhost:5173/admin e fai le tue modifiche (vedi [Modificare in /admin](#modificare-in-admin)).
Tutto ciò che salvi viene scritto in `home/`; controlla il risultato su http://localhost:5173/.

### 3. Aprire una pull request

```sh
git add home
git commit -m "Aggiunge il documento sui JOIN"
git push -u origin nome-argomento
```

Poi apri su GitHub una pull request verso `main` (il link compare nell'output del push) e
descrivi cosa hai aggiunto o cambiato.

### 4. Controlli e approvazione

- Per ogni pull request il sito viene compilato automaticamente. Il controllo fallisce se una
  roadmap non è un JSON valido, ha id ripetuti, collega nodi che non esistono o collega un
  nodo a un documento che non è in `home/`: leggi il log, correggi, fai commit e push sullo
  stesso branch.
- Il proprietario rivede la pull request e la approva o chiede modifiche. Se aggiungi commit
  dopo l'approvazione, serve una nuova approvazione.
- Una volta approvata, il proprietario la unisce a `main` e il sito viene pubblicato in un
  paio di minuti.

Tieni ogni pull request circoscritta (un argomento o un gruppo di modifiche collegate): la
revisione è più rapida.

## Modificare in /admin

La pagina ha tre colonne:

- **Contenuti** (a sinistra): le cartelle e i documenti markdown di `home/`. Con i pulsanti
  in alto crei cartelle e documenti (finiscono nella cartella selezionata); con le icone ✎ e
  🗑 su ogni riga rinomini, sposti (scrivendo un nuovo percorso) o elimini. Gli elementi
  eliminati finiscono in `.trash/`, che non va nei commit, e si possono recuperare da lì.
- **Roadmap** (al centro): aggiungi titoli, argomenti, sotto-argomenti e note con i pulsanti
  in alto, trascina i nodi per posizionarli e trascina dal pallino di un nodo a un altro per
  collegarli. `Canc` elimina la selezione; `Shift`+trascina seleziona più nodi.
- **Pannello** (a destra, quando qualcosa è selezionato): testo, tipo e priorità
  (importante / opzionale) del nodo e il suo documento, scritto nell'editor markdown
  (Scrivi / Anteprima, anche a schermo intero). Un nodo senza documento può crearne uno nuovo
  o collegarne uno esistente. Cliccando un documento nei contenuti si apre qui, selezionando
  il nodo collegato.

**Salva** (o `Ctrl+S`) scrive insieme la roadmap e tutti i documenti modificati.

Rinominare o spostare un documento aggiorna i nodi che lo collegano; eliminarlo li scollega.

**Immagini**: nell'editor markdown usa il pulsante 🖼, oppure incolla un'immagine (`Ctrl+V`,
comodo per gli screenshot) o trascinala sul testo. Il file viene salvato subito nella cartella
del documento, con un nome senza spazi né accenti (se il nome è già preso diventa `nome-2.png`),
e nel testo compare `![nome](nome.png)` dove si trova il cursore. Formati: `.png`, `.jpg`,
`.gif`, `.webp`, `.svg`, fino a 10 MB. Se sposti il documento in un'altra cartella, sposta
anche le sue immagini.

## File dei contenuti

- `home/*.roadmap.json`: una roadmap. Quella direttamente in `home/` è mostrata nella home;
  ogni roadmap è anche raggiungibile al suo percorso senza estensione
  (`home/oracle.roadmap.json` → `/oracle`).
- `home/**/*.md`: i documenti, mostrati accanto alla roadmap quando un lettore li apre, oppure
  come pagina al loro percorso (`home/sql/join.md` → `/sql/join.md`). I link relativi tra
  documenti funzionano.
- Immagini e altri file (`.png`, `.svg`, `.pdf`...) si possono mettere ovunque in `home/` e
  richiamare da un documento con un percorso relativo, ad esempio `![schema](schema.png)`.
  Le immagini si caricano dall'editor (vedi sopra); gli altri file vanno aggiunti con git.
  In entrambi i casi finiscono nel commit con `git add home`.

## Altri comandi

| Comando           | Cosa fa                                                      |
| ----------------- | ------------------------------------------------------------ |
| `npm run build`   | Compila il sito statico in `dist/` (e controlla i contenuti) |
| `npm run preview` | Serve la build di `dist/` su http://localhost:4173/          |
