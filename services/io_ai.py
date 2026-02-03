import os
import openai
from dotenv import load_dotenv
import re

load_dotenv()

# Configure OpenAI client for IO Intelligence
client = openai.OpenAI(
    api_key=os.getenv("IO_API_KEY"),
    base_url=os.getenv("IO_BASE_URL", "https://api.intelligence.io.solutions/api/v1/")
)

async def get_ai_response(prompt: str) -> str:
    """
    Generates a response using the IO Intelligence API via the OpenAI client.
    """
    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.3-70B-Instruct",
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant that explains health reports and test results in simple Turkish language. Use clear, non-technical terms. Be empathetic and helpful."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=4000
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling IO Intelligence: {e}")
        raise e

async def extract_medications_from_text(text: str) -> str:
    """
    PDF'den ilaçları otomatik çıkart AI kullanarak
    """
    try:
        prompt = f"""
Bu PDF metin bir hastanın reçetesidir. Lütfen şu bilgileri çıkart:
- İlaç adları
- Dozajlar
- Kullanım sıklığı

Format:
İlaç Adı - Dozaj - Kullanım Sıklığı

Sadece ilaç bilgilerini döndür, başka açıklama yapma.

PDF Metni:
{text[:15000]}  # İlk 15000 karakteri gönder
"""
        result = await get_ai_response(prompt)
        return result
    except Exception as e:
        print(f"Error extracting medications: {e}")
        return ""

async def extract_blood_values_from_text(text: str) -> str:
    """
    PDF'den kan tahlili değerlerini otomatik çıkart AI kullanarak
    """
    try:
        prompt = f"""
Bu PDF metin bir hastanın kan tahlili raporudur. Lütfen şu bilgileri çıkart:
- Test adları
- Değerler (sayı)
- Ölçü birimleri
- Normal aralıklar (varsa)

Format:
Test Adı: Değer (Birim) - Normal: X-Y

Sadece tahlil değerlerini döndür, başka açıklama yapma.

PDF Metni:
{text[:15000]}  # İlk 15000 karakteri gönder
"""
        result = await get_ai_response(prompt)
        return result
    except Exception as e:
        print(f"Error extracting blood values: {e}")
        return ""
