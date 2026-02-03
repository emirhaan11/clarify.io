import { useState } from 'react'
import './index.css'
import BloodTestAnalyzer from './components/BloodTestAnalyzer'
import { LuHeartHandshake } from "react-icons/lu";

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)', color: '#2c3e50', padding: '20px', position: 'relative' }}>
      {/* Header */}
      <header style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e0e0e0', maxWidth: '1200px', margin: '0 auto 30px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ fontSize: '28px', display: 'flex', alignItems: 'center' }}><LuHeartHandshake /></div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '400', margin: '0 0 8px 0', color: '#1a1a1a', fontFamily: 'Georgia, serif', letterSpacing: '0.3px' }}>CLARYIFY</h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '400', lineHeight: '1.5' }}>Raporlarını anlaşılır hale getiriyoruz</p>
          </div>
        </div>
      </header>

      {/* Info Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '32px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '20px', color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Nasıl çalışıyor?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>Ne işe yarar?</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
              Laboratuvar raporları genellikle teknik terimler ve sayılarla dolu olur. Çoğu kişi bu değerlerin ne anlama geldiğini, normal olup olmadığını veya ne yapması gerektiğini anlamaz. 
            </p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.8', margin: '12px 0 0 0' }}>
              Bu araç, kan tahlili raporunuzu yapay zeka ile analiz ederek anormal değerleri tespit eder ve sade bir dille açıklar. Hangi değerlerin normal olmadığını, bunun ne anlama geldiğini ve yapabileceğiniz beslenme/yaşam tarzı önerilerini alırsınız. Böylece doktorla görüşmeden önce bilgi sahibi olursunuz.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '10px' }}>Nasıl kullanılır?</h3>
            <ol style={{ color: '#666', fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li><strong>PDF Yükle:</strong> Kan tahlili raporunuzun PDF'ini yükleyin</li>
              <li><strong>Test Türünü Seçin:</strong> Hangi tür tahlil olduğunu belirtin (Genel, Glikoz, Lipid vb.)</li>
              <li><strong>Analiz Et:</strong> "Analiz et" düğmesine tıklayın</li>
              <li><strong>Sonuçları Okuyun:</strong> Detaylı analiz, anormal değerleri ve önerileri alın</li>
            </ol>
          </div>
        </div>

        <div style={{ padding: '16px 20px', backgroundColor: '#f0f8ff', borderLeft: '4px solid #4a90e2', borderRadius: '6px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>
            <strong>Önemli:</strong> Bu sistem sadece bilgi amaçlı. Doktora danışmadan hareket etme.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <BloodTestAnalyzer />
        </div>

        {/* Right Column - Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card 1 */}
          <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '3px solid #87b8d8' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>Hızlı</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5' }}>Sonucunu saniyeler içinde alırsın.</p>
          </div>

          {/* Card 2 */}
          <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '3px solid #e8b8a0' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>Basit</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5' }}>Tıbbi terimler yerine sade anlatım.</p>
          </div>

          {/* Card 3 */}
          <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '3px solid #d1a1b0' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>Bilgilendir</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5' }}>Sağlığın hakkında daha çok öğren.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
