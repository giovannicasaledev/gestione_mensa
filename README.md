# 🍽️ Mensa Management App

Un'applicazione **web full-stack (MERN)** per la gestione delle mense aziendali e scolastiche.  
Consente la **registrazione utenti**, la **gestione menù giornaliero/settimanale**, la distinzione tra **ruoli admin e user**, e la gestione di **preferenze alimentari** come celiachia, vegan e allergeni.

---

## 🚀 Tech Stack

| Livello | Tecnologia |
|----------|-------------|
| **Frontend** | React + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Autenticazione** | JWT (JSON Web Token) |
| **Librerie** | Axios, Bcrypt, Mongoose |

---

## 📁 Struttura del progetto

- **mensa/**
  - **backend/**
    - `src/controllers/` → Logica delle rotte
    - `src/models/` → Schemi Mongoose
    - `src/routes/` → Definizione API
    - `src/utils/` → Script creazione admin
    - `src/index.js` → Entry point del server Express
    - `package.json`
    - `.env`
  - **frontend/**
    - `src/pages/` → Login, Register, DashboardAdmin, DashboardUser
    - `src/App.js` → Routing principale
    - `src/index.js`
    - `public/`
    - `package.json`
    - `tailwind.config.js`
  - `README.md`

---

## ⚙️ Funzionalità principali

### 👤 Autenticazione
- Registrazione nuovi utenti (default: **role=user**)
- Login con email e password
- Modifica password post-login
- Creazione automatica admin (`admin@admin.it / admin`)

### 🧑‍🍳 Ruoli
- **Admin**:
  - Inserisce e modifica il **menù giornaliero**
  - Visualizza **lista utenti** registrati
  - Può **eliminare utenti** o promuoverli ad admin
- **User**:
  - Visualizza **menù settimanale**
  - Imposta **preferenze alimentari** (celiaco, vegano, allergeni)

### 📅 Gestione Menù
- Inserimento tramite form (data, primo, secondo, contorno, frutta, dolce, bevanda)
- Visualizzazione calendario con menù giornaliero/settimanale

---

## ⚙️ Setup del progetto

### 1️⃣ Clona il repository
```bash
git clone https://github.com/<tuo-username>/mensa.git
cd mensa

2️⃣ Installa le dipendenze
cd backend
npm install
cd ../frontend
npm install

3️⃣ Configura l’ambiente

Crea un file .env nella cartella backend con:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/mensa
JWT_SECRET=supersegreto

4️⃣ Avvia i server
In due terminal separati:
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start

Il frontend sarà disponibile su http://localhost:3000
Il backend su http://localhost:3001

🧠 Struttura Database MongoDB
Collection: users

{
  "firstName": "Mario",
  "lastName": "Rossi",
  "email": "mario.rossi@azienda.com",
  "password": "<hashed>",
  "role": "user",
  "celiac": false,
  "vegan": false,
  "allergies": []
}

Collection: menus

{
  "date": "2025-08-05",
  "primo": "Pasta al pomodoro",
  "secondo": "Pollo arrosto",
  "contorno": "Insalata",
  "frutta": "Mela",
  "dolce": "Tiramisù",
  "bevanda": "Acqua"
}

🔐 Admin di default

Creato automaticamente al primo avvio del backend.
| Email            | Password | Ruolo   |
| ---------------- | -------- | ------- |
| `admin@admin.it` | `admin`  | `admin` |

🧩 API principali
| Metodo   | Endpoint             | Descrizione                       |
| -------- | -------------------- | --------------------------------- |
| `POST`   | `/api/auth/register` | Registra nuovo utente             |
| `POST`   | `/api/auth/login`    | Effettua login                    |
| `GET`    | `/api/users`         | Elenco utenti (solo admin)        |
| `DELETE` | `/api/users/:id`     | Elimina utente                    |
| `GET`    | `/api/menu`          | Ottiene menù                      |
| `POST`   | `/api/menu`          | Inserisce nuovo menù (solo admin) |

🖥️ Screenshot (da aggiungere)
Puoi aggiungere qui le immagini della dashboard user/admin
📸 Dashboard Admin
📸 Dashboard User
📸 Login / Register

🧑‍💻 Autore
👤 Giovanni Casale aka Beard.Dev
IT Manager @ Wish IT Srl
💻 React | Node.js | MongoDB | Tailwind CSS

🪪 Licenza
Questo progetto è rilasciato sotto licenza MIT.
Puoi modificarlo e riutilizzarlo liberamente, citando l’autore.

⭐ Se questo progetto ti piace, lascia una star su GitHub!
git add README.md
git commit -m "Aggiunto README completo"
git push origin main


