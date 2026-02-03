from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from services.io_ai import get_ai_response
import uvicorn
import base64
import pdfplumber
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "online", "engine": "io-intelligence"}

@app.post("/generate")
async def generate_content(prompt: str):
    try:
        ai_result = await get_ai_response(prompt)
        return {"success": True, "data": ai_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def extract_text_from_pdf_base64(pdf_base64: str) -> str:
    """Base64 PDF'den metin çıkart - pdfplumber kullanarak"""
    try:
        pdf_bytes = base64.b64decode(pdf_base64)
        pdf_file = io.BytesIO(pdf_bytes)
        
        text = ""
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        return text if text.strip() else ""
    except Exception as e:
        print(f"PDF okuma hatası: {str(e)}")
        return ""

@app.post("/analyze-blood-test")
async def analyze_blood_test(
    test_type: str = Form("general"),
    test_results: str = Form(""),
    pdf_base64: str | None = Form(None)
):
    """Tahlil sonuçlarını analiz et - PDF'ten otomatik değerleri çıkart"""
    try:
        all_values = test_results.strip() if test_results else ""
        
        # PDF varsa metin çıkart
        if pdf_base64:
            pdf_text = extract_text_from_pdf_base64(pdf_base64)
            if pdf_text:
                # Metin varsa AI'ya analiz ettir
                pdf_prompt = f"""
Bu tahlil raporunun metnidir. Lütfen şu metinden tüm test sonuçlarını, değerlerini ve birimlerini çıkart.
Test Tipi: {test_type}

Tahlil Metni:
{pdf_text[:2000]}

Sonucu şu formatta ver:
- Test Adı: Değer (Birim) | Normal Aralığı: X-Y
"""
                extracted_values = await get_ai_response(pdf_prompt)
                all_values = extracted_values
        
        if not all_values:
            all_values = "(Tahlil değeri sağlanmadı)"
        
        # Ana analiz
        prompt = f"""
Tahlil tipi: {test_type}

Tahlil Değerleri:
{all_values}

Sen uzman bir 'Tıbbi Veri ve Sağlıklı Yaşam Asistanı'sın. Görevin, yüklenen kan tahlili raporunu analiz etmek, sadece riskli/anormal durumları raporlamak ve buna uygun genel yaşam tarzı önerileri sunmaktır.

UYGULAMA KURALLARI:

ANORMAL BULGULAR
1. Tüm testleri tara ve *sadece referans aralığı dışında (Düşük veya Yüksek)* olanları listele. Normal değerleri rapora dahil etme.
2. Her bulguyu şu formatta yaz:
   - *Test Adı (Değer)*: Durum (Düşük/Yüksek) – Kısa ve net klinik anlamı (Maksimum 1 cümle).
3. Eğer veri yoksa veya okunmuyorsa o satırı atla.

ÖNERİLER VE BESLENME
1. Yukarıda tespit ettiğin anormallikler için genel geçer, bilimsel temelli *beslenme ve yaşam tarzı* önerileri sun.
2. "Şunu yiyin, bunu için" gibi kesin emir kipleri yerine "tüketilebilir, faydalı olabilir, destekleyebilir" gibi yumuşak bir dil kullan.
3. Önerileri madde madde yaz ve gereksiz tekrardan kaçın.

YASAL UYARI
Bu rapor yapay zeka tarafından bilgilendirme amaçlı oluşturulmuştur. Kesin teşhis ve tedavi için mutlaka doktorunuza danışınız.

"""
        
        analysis = await get_ai_response(prompt)
        
        return {
            "success": True,
            "data": analysis
        }
    except Exception as e:
        print(f"Hata: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)
