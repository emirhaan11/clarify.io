# 🩺 CLARYIFY - Kan Tahlili AI Analiz Platformu

Laboratuvar raporlarını yapay zeka ile analiz ederek, teknik terimlerini sade bir dille açıklayan web uygulaması.

---

## 📋 İçindekiler
1. [Uygulamanın Amacı](#uygulamanın-amacı)
2. [Mimari ve Teknolojiler](#mimari-ve-teknolojiler)
3. [io Intelligence Kullanımı](#io-intelligence-kullanımı)
4. [Kurulum](#kurulum)

---

## 🎯 Uygulamanın Amacı

**CLARYIFY**, kullanıcıların kan tahlili raporlarının PDF'sini yükleyerek yapay zeka ile analiz etmesini sağlar. Uygulama:
- Raporun ne anlama geldiğini sade bir dilde açıklar
- Anormal değerleri tespit eder
- Beslenme ve yaşam tarzı önerileri sunar
- Doktor ziyaretinden önce bilgilendirilmiş olmayı sağlar

**Hedef Kullanıcılar:** Laboratuvar sonuçlarını anlayamayan ve önceden bilgilendirilmek isteyen kişiler

---

## 🏗️ Mimari ve Teknolojiler

### Frontend (React + Vite)
```
- React 19.2.0 - UI bileşenleri
- Vite 7.3.1 - Build tool
- Axios 1.13.2 - API istekleri
- TailwindCSS 3.4 - Styling
```

**Yapı:**
- `App.jsx` - Ana uygulama
- `BloodTestAnalyzer.jsx` - Kan tahlili analiz
- `RecipeAnalyzer.jsx` - Reçete analiz

### Backend (FastAPI + Python)
```
- FastAPI 0.104+ - REST API framework
- Uvicorn 0.24+ - ASGI server
- pdfplumber 0.11.9 - PDF metin çıkartma
- python-dotenv - Ortam değişkenleri
- OpenAI Client - io Intelligence API
```

**Endpoints:**
- `POST /analyze-blood-test` - Kan tahlili analizi
- `POST /generate` - Genel AI prompt
- `GET /` - Sunucu durumu

### Sistem Akışı

```
Kullanıcı PDF yükler
         ↓
Frontend (React) base64 encode
         ↓
Backend API (FastAPI)
    ├─ PDF metin çıkart (pdfplumber)
    ├─ io Intelligence çağır #1 (Değerleri çıkart)
    ├─ io Intelligence çağır #2 (Analiz yap)
    └─ JSON response döndür
         ↓
Frontend (React) Markdown render
         ↓
Kullanıcı sonuçları görür
```

---

## 🤖 io Intelligence Kullanımı

### API Konfigürasyonu
```python
# services/io_ai.py
client = openai.OpenAI(
    api_key=os.getenv("IO_API_KEY"),
    base_url="https://api.intelligence.io.solutions/api/v1/"
)

model = "meta-llama/Llama-3.3-70B-Instruct"
temperature = 0.7
max_tokens = 1500
```
---

### Neden io Intelligence?
- ✅ **Türkçe:** Llama-3.3-70B Türkçeyi mükemmel anlar
- ✅ **Tıbbi Bilgi:** Sağlık terminolojisinde uzman
- ✅ **Uygun Fiyat:** OpenAI'den daha ekonomik
- ✅ **Veri Gizliliği:** Kendi altyapısı

---

## 📦 Kurulum

### Gereksinimler
- Python 3.10+
- Node.js 18+
- io Intelligence API Key (https://console.intelligence.io.solutions)

### Backend

```bash
# Sanal ortam oluştur
python -m venv venv

# Aktifleştir (Windows)
venv\Scripts\activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# .env dosyası oluştur
echo IO_API_KEY=your_key_here > .env
echo IO_BASE_URL=https://api.intelligence.io.solutions/api/v1/ >> .env

# Backend başlat
python main.py
```

Backend çalışacak: `http://localhost:3001`

### Frontend

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Dev sunucusu başlat
npm run dev
```

Frontend açılacak: `http://localhost:5174`

---

## 🚀 Kullanım

1. **Tarayıcı aç:** http://localhost:5174
2. **Test tipi seç:** Genel, Glikoz, Lipid vb.
3. **PDF yükle:** Kan tahlili raporunun PDF'i
4. **"Analiz et" tıkla**
5. **Sonuçları oku:**
   - Anormal değerler
   - Sade açıklamalar
   - Beslenme önerileri
   - Yasal uyarı

---

## 📁 Dizin Yapısı

```
ionet-main/
├── README.md                  # Dokümantasyon
├── requirements.txt           # Python paketleri
├── main.py                    # Backend API
├── debug_io.py                # io Intelligence test
├── .env                       # API anahtarları (GIT'E KOYMA!)
│
├── services/
│   └── io_ai.py              # AI fonksiyonları
│       ├── get_ai_response()
│       ├── extract_blood_values_from_text()
│       └── extract_medications_from_text()
│
└── frontend/
    ├── package.json          # npm paketleri
    ├── vite.config.js        # Vite ayarları
    ├── index.html
    └── src/
        ├── App.jsx           # Ana sayfa
        ├── main.jsx          # Entry point
        └── components/
            └── BloodTestAnalyzer.jsx
```

---

## ⚠️ Önemli Not
Bu araç sadece eğitim amaçlıdır. Tıbbi karar vermek için doktora danışın.
