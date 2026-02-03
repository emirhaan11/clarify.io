import { useState } from 'react'
import axios from 'axios'

export default function RecipeAnalyzer() {
  const [recipeName, setRecipeName] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('recipe_name', recipeName || '')
      formData.append('ingredients', '')  // Boş gönder, AI PDF'den çıkaracak
      if (pdfFile) {
        formData.append('pdf', pdfFile)
      }

      console.log('FormData gönderiliyor:', {
        recipe_name: recipeName,
        pdf: pdfFile ? pdfFile.name : null
      })

      const result = await axios.post('http://localhost:3001/analyze-recipe', formData)
      setAnalysis(result.data.data || result.data)
    } catch (err) {
      console.error('API Hatası:', err.response?.data || err.message)
      setError(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePdfUpload = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setPdfFile(file)
    } else {
      setError('Lütfen PDF veya görüntü dosyası seç')
    }
  }

  return (
    <div style={{ padding: '28px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Text Input */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#2c3e50', marginBottom: '8px' }}>
            Reçete hangi hastalık için?
          </label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Örneğin: Grip, baş ağrısı, antibiyotik tedavisi..."
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              color: '#2c3e50',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#2c3e50', marginBottom: '8px' }}>
            Reçete fotoğrafı veya PDF var mı? (isteğe bağlı)
          </label>
          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            border: '2px dashed #d0d0d0',
            borderRadius: '6px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handlePdfUpload}
              disabled={loading}
              style={{ display: 'none' }}
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>📎</div>
              <div style={{ fontSize: '13px', color: pdfFile ? '#2c3e50' : '#999', fontWeight: pdfFile ? '500' : '400' }}>
                {pdfFile ? `✓ ${pdfFile.name}` : 'Dosya seç (PDF veya fotoğraf)'}
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (!recipeName.trim() && !pdfFile)}
          style={{
            padding: '11px 20px',
            backgroundColor: loading ? '#e8e8e8' : '#2c3e50',
            border: 'none',
            borderRadius: '6px',
            color: loading ? '#999' : 'white',
            fontWeight: '500',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '14px',
            marginTop: '10px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1a252f')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2c3e50')}
        >
          {loading ? 'Analiz ediliyor...' : 'Analiz et'}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '20px', padding: '12px 14px', backgroundColor: '#fee', border: '1px solid #f5c6c6', borderRadius: '6px', color: '#c33', fontSize: '13px' }}>
          Hata: {error}
        </div>
      )}

      {analysis && (
        <div style={{ marginTop: '24px', padding: '18px', backgroundColor: '#f0fdf4', border: '1px solid #dbeafe', borderRadius: '8px' }}>
          <h3 style={{ color: '#1a1a1a', marginTop: 0, marginBottom: '12px', fontSize: '15px', fontWeight: '600' }}>Analiz Sonuçları</h3>
          <div style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2)}
          </div>
        </div>
      )}
    </div>
  )
}
