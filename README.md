Absolutely — here’s a **clear, professional README.md** that someone can follow to **run your project locally on their own device**.
It’s written like a real open-source project README, not a tutorial dump.

You can copy-paste this directly into a `README.md` file.

---

# 📸 AI-Powered Photo Finder (Django + Next.js)

An AI-powered web application that lets you **search thousands of local photos instantly** using **natural language**, metadata, and semantic similarity — similar to Google Photos, but **fully local and private**.

---

## ✨ Features

* 📂 Automatically scans existing photo folders (Windows)
* 🧾 Extracts EXIF metadata (date, camera model, GPS)
* 🌍 Converts GPS coordinates to city & country
* 🧠 AI-powered semantic search using text embeddings
* 🔍 Natural language queries (e.g. *“trip to paris”*)
* ⚡ Fast, local, and privacy-friendly
* 🖼️ Modern web UI built with Next.js

---

## 🛠 Tech Stack

### Backend

* Django
* Pillow (EXIF extraction)
* Sentence-Transformers (MiniLM)
* NumPy
* SQLite (default)

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

---

## 📁 Project Structure

```
photo_finder/
├── backend/
│   ├── photos/
│   │   ├── scanner.py
│   │   ├── semantic_search.py
│   │   ├── embedding_utils.py
│   │   ├── exif_utils.py
│   │   ├── management/commands/
│   │   │   ├── scanphotos.py
│   │   │   └── embedphotos.py
│   └── backend/
│       └── settings.py
└── frontend/
    └── app/
```

---

## ✅ Prerequisites

Make sure you have installed:

* **Python 3.10+**
* **Node.js 18+**
* **pip**
* **Git**
* **Windows OS** (currently optimized for Windows paths)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/photo-finder.git
cd photo-finder
```

---

## 🔧 Backend Setup (Django)

### 2️⃣ Create and activate virtual environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

---

### 3️⃣ Install Python dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Configure photo folder path

Open:

```
backend/settings.py
```

Add or edit:

```python
PHOTO_ROOT = r"C:\Users\YOUR_USERNAME\Pictures"
```

👉 This should point to the folder where your photos are stored.

---

### 5️⃣ Run database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 6️⃣ Scan photos

This indexes all photos and extracts metadata.

```bash
python manage.py scanphotos
```

---

### 7️⃣ Generate AI embeddings

This enables semantic search.

```bash
python manage.py embedphotos
```

> ⚠️ First run may take time depending on number of photos.

---

### 8️⃣ Start backend server

```bash
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## 🌐 Frontend Setup (Next.js)

### 9️⃣ Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

### 🔟 Configure API base URL

Open:

```
frontend/lib/api.ts
```

Set:

```ts
export const API_BASE_URL = "http://127.0.0.1:8000";
```

---

### ▶️ Run frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🔍 How to Use the App

1. Open the website in your browser
2. Type natural search queries like:

   * `canon portrait`
   * `trip to paris`
   * `old night photos`
3. Instantly browse matching photos
4. Click a photo to view the full image

---

## 🧠 Example Searches

* **Keyword-based**: `IMG_2021`
* **Camera-based**: `Canon EOS`
* **Location-based**: `Paris`
* **Natural language**: `sunset street photography`

---

## 🧪 Troubleshooting

### No search results?

* Make sure embeddings are generated:

```bash
python manage.py shell
```

```python
from photos.models import Photo
Photo.objects.filter(embedding__isnull=False).count()
```

### Photos not scanning?

* Confirm `PHOTO_ROOT` path exists
* Ensure image formats are supported (`.jpg`, `.png`, `.jpeg`)

---

## 🔐 Privacy

All photos:

* Stay on your local machine
* Are never uploaded
* Are processed entirely offline

---

## 🚧 Future Improvements

* FAISS vector indexing
* Face recognition
* Similar-photo recommendations
* Cloud deployment
* Mobile support

---

## 📜 License

This project is for **educational and personal use**.
Feel free to fork, modify, and improve it.

---

## 🙌 Author

Built by **Elias Belay**
Full-stack developer | Django | Next.js | AI-powered search

---
