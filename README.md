# Generatore Provvedimenti Disciplinari Baskin EISI

Pagina HTML unica, da aprire nel browser (anche offline e da cellulare), da usare online o da installare come app (PWA), che aiuta il Giudice Unico a scrivere i provvedimenti disciplinari del Baskin:

* **cerca** nel Regolamento Disciplinare (artt. 89-158 del Regolamento Tecnico Nazionale della Disciplina Baskin 2026) e tra 160 **provvedimenti tipo** già formulati sul testo del regolamento, con articolo, comma, tabella e sanzione;
* **compone** la riga del provvedimento con gara, destinatario, parti variabili e aggiunte facoltative;
* produce un **testo da copiare**, modificabile a mano, da incollare nel foglio `Provvedimenti Disciplinari` del calendario e nella mail di comunicazione.

Nulla viene salvato né inviato: vedi [Privacy](#privacy).

* **Usalo online**: <https://baskinsoftware.github.io/generatore-provvedimenti-disciplinari-baskin-eisi/> (versione di prova: <https://baskinsoftware.github.io/generatore-provvedimenti-disciplinari-baskin-eisi/beta/>)
* **Codice sorgente**: <https://github.com/baskinsoftware/generatore-provvedimenti-disciplinari-baskin-eisi> (organizzazione GitHub [baskinsoftware](https://github.com/baskinsoftware))

## File

| File | Contenuto |
| --- | --- |
| `pwa/index.html` | Il generatore (unico file, nessuna dipendenza: funziona anche da solo, aperto da file) |
| `pwa/manifest.webmanifest` | Dati per installare il generatore come app (PWA) |
| `pwa/service-worker.js` | Service worker per l'uso offline della versione online |
| `pwa/icons/` | Icone dell'app |
| `README.md` | Questo documento |
| `LICENSE` | Licenza MIT del codice e ambito delle licenze |
| `LICENSE-CC-BY-4.0.md` | Licenza CC BY 4.0 dei testi propri |
| `CITATION.cff` | Come citare il progetto |
| `.github/workflows/pages.yml` | Azione GitHub che pubblica il generatore su GitHub Pages |
| `.github/workflows/release.yml` | Azione GitHub che crea una release (lancio manuale) |
| `.gitignore` | File esclusi dal repository |

## Uso

1. **Gara**: numero e data della gara e Massimale Ammende del campionato (preimpostato a 1.000 euro, modificabile). Restano validi per tutti i provvedimenti finché non li cambi. La casella *Inizia ogni riga con numero e data della gara* aggiunge in testa a ogni riga `Gara n. … del …`.
2. **Destinatario**: cognome, nome, Società e qualifica del tesserato; per i provvedimenti contro una Società basta il nome della Società (gli altri campi si nascondono).
3. **Cerca nel regolamento**: scrivi condotta, sanzione o numero di articolo (vedi [Ricerca](#ricerca)). Compaiono i provvedimenti tipo (`T` tesserato, `S` Società) e gli articoli che contengono le parole cercate, evidenziate. *Leggi art. N* apre il testo dell'articolo.
4. **Provvedimento**: tocca un provvedimento tipo e completa le parti variabili (scelte alternative, numero di gare, punti, descrizioni). Le **aggiunte facoltative** sono:
   * prima del riferimento normativo: *(espulso)*, *a fine gara*, *come da rapporto arbitrale* e *come da segnalazione degli Ufficiali di Campo*;
   * dopo il riferimento: recidiva (art. 110), circostanze attenuanti o aggravanti (artt. 107-108), sanzione raddoppiata (art. 112 c. 3 e art. 117 c. 6) e commutazione della squalifica (art. 100 c. 5 e art. 103 c. 2).
   
   L'anteprima si aggiorna mentre scrivi. Se scegli una squalifica per un dirigente o un altro tesserato che non sia atleta o allenatore compare l'avviso dell'art. 100 c. 2.
5. **Aggiungi e resetta** mette la riga nel testo e riporta al destinatario per il provvedimento successivo: destinatario, provvedimento, aggiunte e ricerca si azzerano, mentre gara e massimale restano. **Aggiungi senza resettare** lascia tutto com'è, per più provvedimenti simili o per lo stesso destinatario.
6. **Testo da copiare**: una riga per provvedimento, sempre modificabile a mano. **Copia** copia esattamente quello che si vede.

### Dove incollare

* **Foglio `Provvedimenti Disciplinari` del calendario** (una riga per gara): numero di gara in colonna `A`. Poi seleziona la cella in colonna `B`, premi **F2** (o doppio clic) **prima** di incollare con `Ctrl+V`: così tutte le righe restano nella stessa cella, andando a capo. Senza F2 Excel distribuisce le righe su più celle.
  * Vale anche per LibreOffice.
  * In Google Sheets: doppio clic sulla cella (o `Invio`) e poi incolla.
  * In Excel su Mac: `Ctrl+U` al posto di F2.
* **Mail di comunicazione**: incolla direttamente nel corpo del messaggio.

Ogni gara ha una sola cella: prepara insieme tutti i provvedimenti della stessa gara, poi cambia numero di gara e premi **Svuota**.

### Esempio di riga

```
Gara n. 12 del 18/10/2026 – ROSSI Mario (ASD Esempio), atleta – squalifica per 1 gara e ammenda di Euro 40,00 per comportamento offensivo nei confronti degli arbitri (espulso) [art. 117 c. 1 Tab. C n. 2 RTN]
```

## Pubblicazione online (GitHub Pages)

Il generatore si può usare anche online. L'azione GitHub `.github/workflows/pages.yml` pubblica su GitHub Pages il contenuto della cartella `pwa/`, a ogni push sui rami `main` e `beta` oppure a mano dalla scheda *Actions*:

* il ramo `main` all'indirizzo del sito, <https://baskinsoftware.github.io/generatore-provvedimenti-disciplinari-baskin-eisi/>;
* il ramo `beta` nella sottocartella `/beta/` (<https://baskinsoftware.github.io/generatore-provvedimenti-disciplinari-baskin-eisi/beta/>), così si può provare una versione nuova senza toccare quella in uso;
* l'indirizzo `/pwa/` e il vecchio `/Generatore_Provvedimenti_Baskin.html` rimandano all'app corrente.

Se `main` non contiene `pwa/index.html` (per esempio quando contiene solo le Actions) l'indirizzo del sito rimanda a `/beta/`. A ogni pubblicazione il sito viene ricostruito con l'ultimo stato di entrambi i rami, così una pubblicazione non cancella l'altra.

Per attivarla, una sola volta: *Settings* → *Pages* → *Build and deployment* → *Source*: **GitHub Actions**. Perché anche il ramo `beta` possa pubblicare: *Settings* → *Environments* → `github-pages` → *Deployment branches and tags*: aggiungere `beta` (oppure nessuna restrizione).

Anche online tutto resta nel browser: il server di GitHub registra solo i normali dati tecnici di accesso (vedi [Privacy](#privacy)).

### Installazione come app (PWA)

Aperto dal sito, il generatore si può installare come app (menu del browser → *Installa app* o *Aggiungi a schermata Home*) e poi funziona anche senza connessione. Quando è pubblicata una versione nuova, in fondo alla pagina compare l'avviso **Aggiorna**: la pagina non si ricarica da sola, per non perdere il testo in lavorazione. Il ramo `main` (`/`) e il ramo `beta` (`/beta/`) si installano come due app separate.

### Release

L'azione `.github/workflows/release.yml` (*Actions* → *Release* → *Run workflow*) crea una release GitHub: il titolo è il primo titolo del README seguito dal tag (`v` + versione), il testo è il README. Controlla che la versione rispetti la [regola di versioning](#versioni) e segna da sola come pre-release le alpha, beta e RC.

## Ricerca

| Scrivi | Trova |
| --- | --- |
| `offese pubblico` | voci con **tutte** le parole |
| `+pivot` | parola obbligatoria (equivale a scriverla senza segno) |
| `ruolo -pivot` | voci con *ruolo* ma **senza** *pivot* |
| `"fase di gioco"` | la frase esatta |
| `avversari -"fase di gioco"` | voci con *avversari* senza la frase esatta |
| `117` | voci e testo che contengono il numero (es. art. 117) |

Maiuscole, accenti e apostrofi tipografici non contano; `Esc` svuota la ricerca. Con più di 8 articoli trovati gli articoli restano chiusi (si aprono toccandoli).

## Massimale Ammende

Le ammende del regolamento sono percentuali del Massimale Ammende stabilito ogni anno nelle Disposizioni Organizzative Annuali (art. 99). Il generatore calcola l'importo arrotondato all'euro; se la casella è vuota scrive la percentuale tra parentesi quadre (es. `Euro [4% del Massimale Ammende]`).

Il valore proposto all'apertura (1.000 euro) si cambia nel codice, all'inizio dello script, nel blocco segnalato da `MODIFICA QUI`:

```js
var MASSIMALE_AMMENDE_PREDEFINITO = 1000;
```

Con `0` la casella parte vuota.

## Formule dei provvedimenti tipo

Le formule seguono il testo del Regolamento Disciplinare così com'è, senza correzioni o interpretazioni dei refusi. La struttura è sempre:

```
[Gara n. N del gg/mm/aaaa –] DESTINATARIO – sanzione per condotta [circostanze] [riferimento RTN][, aggiunte con proprio riferimento]
```

Coprono:

* il pubblico (art. 111 Tab. A e art. 112);
* invasione e aggressione (artt. 113-115);
* le proteste (art. 116);
* i comportamenti verso arbitri, avversari e altri tesserati (art. 117 Tab. C, D, E);
* i comportamenti non regolamentari (art. 118 Tab. F1 e art. 119);
* ruoli e arruolamento degli atleti (art. 118 Tab. F2);
* le infrazioni amministrative (art. 121 Tab. G) e le attrezzature (art. 122 Tab. H);
* le altre infrazioni (artt. 123-131).

Dove una sanzione colpisce soggetti diversi (es. Tab. F2: Società e allenatore) ci sono due voci separate, una per destinatario. La valutazione dei fatti, delle circostanze, della recidiva e della sanzione resta dell'Organo di Giustizia.

## Privacy

* Tutto avviene nel browser: la pagina non invia dati. Una Content-Security-Policy interna (`default-src 'none'`) blocca connessioni e risorse esterne; aperta dal sito carica solo i propri file (icone, manifest, service worker), che il browser conserva nella cache per l'uso offline: contengono solo il generatore, mai quello che scrivi.
* Nessun cookie, localStorage, sessionStorage, IndexedDB o altro archivio del browser; nessuna statistica o tracciamento. Chiudendo o ricaricando la pagina si perde tutto.
* Completamento automatico e controllo ortografico disattivati in tutte le caselle: il browser non memorizza nomi e testi e non li invia a servizi di correzione online.
* Il testo va negli appunti solo premendo **Copia**. Può restare nella cronologia degli appunti del sistema (es. `Win+V` in Windows).
* Se la pagina è pubblicata su un sito, il server che la ospita può registrare i normali dati tecnici di accesso. Da file salvato sul computer non c'è alcun contatto con internet.
* I provvedimenti contengono dati personali: chi li inserisce, invia o pubblica ne è responsabile (GDPR).

## Versioni

La numerazione segue la *Regola di versioning dei progetti Baskin (v3)*: `AA.M[.P[.W]]` con eventuale suffisso `aN` (alpha), `bN` (beta) o `RCN` (release candidate). Il tag ha il prefisso `v` (es. `v26.0`).

* **AA**: anno a due cifre; **M**: release dell'anno; **P** e **W**: correzioni (es. 26.0.1, 26.0.0.1).
* **aN**, **bN**, **RCN**: pre-release, con N progressivo (es. 26.0b6). Alpha, beta e RC sono sempre pubblicate come pre-release.

Il numero compare nel piè di pagina del generatore (`APP_VERSION` in `pwa/index.html`), nel nome della cache in `pwa/service-worker.js`, in `CITATION.cff` e nell'intestazione dei file. Le versioni precedenti (1.0-1.3 e 26.0) contano come le prime cinque beta: la prima versione con la nuova regola è la **26.0b6**.

## Licenza

* **Codice** (file in `pwa/`, esclusi i testi del regolamento, e workflow in `.github`): licenza MIT, vedi `LICENSE`.
* **Testi propri** (formule dei provvedimenti tipo, istruzioni, `README.md`): licenza CC BY 4.0, vedi `LICENSE-CC-BY-4.0.md`.
* **Testo del Regolamento Disciplinare**: appartiene a EISI (Ente Italiano Sport Inclusivi) ed è riportato così com'è per sola consultazione. Non è coperto da queste licenze e fa fede la versione ufficiale pubblicata da EISI.

Nomi e loghi **Baskin** ed **EISI** appartengono ai rispettivi titolari. Progetto personale, non prodotto ufficiale di EISI né di altri enti; fornito così com'è, senza garanzie.

© 2026 Daniele Lolli (UncleDan) feat. Claude AI
