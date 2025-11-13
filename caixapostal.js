// ===== Injetar Meta Viewport para Responsividade em Mobile =====
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);
// ===== Injetar Link de Fontes =====
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap';
fontLink.rel = 'preload';
fontLink.as = 'style';
fontLink.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(fontLink);
// ===== Injetar CSS =====
const style = document.createElement('style');
style.textContent = `
:root {
  --bg-color: #f8f8f8;
  --text-color: #000;
  --accent-color: #AB865B;
  --accent-light: #D3AD83;
  --secondary-bg: #fff;
  --border-color: rgba(0,0,0,0.1);
  --shadow-color: rgba(0,0,0,0.1);
  --input-bg: #fff;
  --error-color: #ff4d4d;
  --note-bg: #F4E8DB;
  --primary-color: #AB865B; /* Centralized primary color */
  --dark-text: #202020;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #f9f9f9 0%, #f0ede9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  scroll-behavior: smooth;
}
.container {
  width: 90%;
  max-width: 540px;
  background: var(--secondary-bg);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  padding: 24px;
  position: relative;
  z-index: 10;
  overflow-y: auto;
  max-height: 90vh;
  margin: 0 auto;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.step {
  display: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation: fadeIn 0.4s ease forwards;
}
.step.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}
p {
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 16px;
  text-align: center;
}
.btn {
  padding: 14px 24px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  background: var(--primary-color);
  color: #fff;
  transition: all 0.3s ease;
  font-weight: 500;
  display: block;
  width: 100%;
  text-align: center;
  position: relative;
}
.btn:disabled {
  background: var(--border-color);
  cursor: not-allowed;
}
.btn:hover:not(:disabled) {
  background: var(--accent-light);
  transform: translateY(-1px);
}
.btn.secondary {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}
.info-card {
  background: var(--note-bg);
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: relative;
}
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.9rem;
}
.info-label {
  font-weight: 500;
}
.info-value {
  flex: 1;
  margin-left: 8px;
  text-align: right;
}
.copy-btn {
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
}
.copy-btn:hover {
  background: var(--accent-light);
}
.copy-toast {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: #fff;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
}
.copy-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(-10px);
}
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--secondary-bg);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  transform: translateY(100%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 10000;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
}
.bottom-sheet.show {
  transform: translateY(0);
}
.close-popup {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--text-color);
  transition: color 0.2s;
}
.close-popup:hover {
  color: var(--primary-color);
}
.overlay-black {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: none;
  z-index: 9999;
}
.overlay-black.show {
  display: block;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.8);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  flex-direction: column;
  transition: opacity 0.3s ease;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.freight-section {
  margin-top: 24px;
  text-align: center;
}
.freight-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--input-bg);
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  color: var(--text-color);
  margin-bottom: 12px;
}
.freight-btn {
  width: auto;
  display: inline-block;
}
.disclaimer {
  font-size: 0.75rem;
  color: var(--text-color);
  margin-top: 12px;
  text-align: center;
}
.disclaimer a {
  color: var(--primary-color);
  text-decoration: underline;
}
.terms-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 16px;
}
.terms-link svg {
  margin-left: 8px;
  width: 20px;
  height: 20px;
}
`;
document.head.appendChild(style);
// ===== Injetar HTML =====
document.body.innerHTML = `
  <div class="container" style="opacity: 0; animation: fadeIn 0.8s ease forwards;">
    <div id="step1" class="step active">
      <h2>Presenteie uma Modelo</h2>
      <p>Deseja presentear uma modelo da plataforma? Conheça o Frame Envio, nossa caixa postal segura e discreta para envios especiais.</p>
      <button class="btn" id="start-envio">Continuar</button>
    </div>
    <div id="step2" class="step">
      <h2>Como Enviar</h2>
      <p>Envie presentes para as modelos de forma simples e segura. Use os dados abaixo como destinatário. Nós cuidamos da entrega final com privacidade total.</p>
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">Destinatário:</span>
          <span class="info-value">FRAME TECNOLOGIA LTDA</span>
          <button class="copy-btn" data-copy="FRAME TECNOLOGIA LTDA" data-label="Destinatário">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">Destinatário copiado</div>
          </button>
        </div>
        <div class="info-item">
          <span class="info-label">CNPJ:</span>
          <span class="info-value">38.539.493/0001-05</span>
          <button class="copy-btn" data-copy="38.539.493/0001-05" data-label="CNPJ">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">CNPJ copiado</div>
          </button>
        </div>
        <div class="info-item">
          <span class="info-label">Endereço:</span>
          <span class="info-value">Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/ SP, CEP: 01452-001</span>
          <button class="copy-btn" data-copy="Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/ SP, CEP: 01452-001" data-label="Endereço">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">Endereço copiado</div>
          </button>
        </div>
      </div>
      <p>Exemplo de Remetente: Seu Nome / Seu Endereço Completo</p>
      <div class="freight-section">
        <h3>Cálculo de Frete</h3>
        <p>Estamos detectando sua localização...</p>
        <input type="text" id="origin-city" class="freight-input" placeholder="Sua cidade (ex: São Paulo, SP)">
        <button class="btn freight-btn" id="calc-frete">Calcular Frete Aproximado</button>
      </div>
      <div class="disclaimer">
        O Frame Envio é exclusivo para itens não sexuais. Ao utilizar, você concorda com os <a href="https://frameag.com/termos" target="_blank">Termos</a> e <a href="https://frameag.com/privacy" target="_blank">Política de Privacidade</a>. A entrega é de responsabilidade dos Correios ou transportadora escolhida.
      </div>
      <div class="terms-link" id="terms-link">
        Entenda nossos termos
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2"><circle cx="12" cy="12" r="10"/><text x="12" y="16" font-size="12" text-anchor="middle" fill="var(--primary-color)">?</text></svg>
      </div>
    </div>
  </div>
  <div class="bottom-sheet" id="terms-popup">
    <span class="close-popup">×</span>
    <h2>Termos do Frame Envio</h2>
    <p>Ao usar o Frame Envio, você concorda que:</p>
    <ul style="text-align: left; font-size: 0.9rem; list-style: disc; padding-left: 20px;">
      <li>Itens enviados devem ser não sexuais e apropriados.</li>
      <li>A Frame não se responsabiliza por perdas ou danos durante o transporte.</li>
      <li>Entregas são gerenciadas pelos Correios ou transportadora escolhida.</li>
      <li>Privacidade é garantida na redistribuição para a modelo.</li>
      <li>Consulte os <a href="https://frameag.com/termos" target="_blank" style="color: var(--primary-color);">Termos Completos</a> para mais detalhes.</li>
    </ul>
    <button class="btn secondary" onclick="closeBottomSheet('terms-popup')">Fechar</button>
  </div>
  <div class="overlay-black" id="overlay-black"></div>
  <div class="loading-overlay" id="loading-overlay">
    <div class="spinner"></div>
    <p id="loading-message">Carregando...</p>
  </div>
`;
// ===== Lógica JavaScript =====
let currentStep = 1;
function showStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step${step}`).classList.add('active');
  currentStep = step;
}
function showBottomSheet(id) {
  document.getElementById(id).classList.add('show');
  document.getElementById('overlay-black').classList.add('show');
}
function closeBottomSheet(id) {
  const el = document.getElementById(id);
  el.classList.remove('show');
  document.getElementById('overlay-black').classList.remove('show');
}
function copyToClipboard(text, btn, label) {
  navigator.clipboard.writeText(text).then(() => {
    const svg = btn.querySelector('svg');
    svg.outerHTML = '<svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 15L9.29412 20L21 4" stroke="black" stroke-width="2" stroke-linecap="square"/> </svg>';
    const toast = btn.querySelector('.copy-toast');
    toast.textContent = `${label} copiado`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      svg.outerHTML = '<svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>';
    }, 2000);
  });
}
function detectLocation() {
  if (navigator.geolocation) {
    showLoading('Detectando localização...');
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        .then(res => res.json())
        .then(data => {
          document.getElementById('origin-city').value = `${data.address.city || data.address.town}, ${data.address.state}`;
          hideLoading();
        })
        .catch(() => {
          hideLoading();
          alert('Não foi possível detectar sua localização. Insira manualmente.');
        });
    }, () => {
      hideLoading();
      alert('Permissão de localização negada. Insira sua cidade manualmente.');
    });
  } else {
    alert('Geolocalização não suportada. Insira sua cidade manualmente.');
  }
}
function showLoading(message) {
  document.getElementById('loading-message').textContent = message;
  document.getElementById('loading-overlay').style.display = 'flex';
}
function hideLoading() {
  document.getElementById('loading-overlay').style.display = 'none';
}
function calcFrete() {
  const origin = document.getElementById('origin-city').value.trim();
  if (!origin) {
    alert('Insira sua cidade de origem.');
    return;
  }
  showLoading('Calculando frete aproximado...');
  setTimeout(() => {
    hideLoading();
    // Simulação de cálculo (em produção, use API dos Correios ou similar)
    const simulatedCost = Math.random() * 50 + 20;
    alert(`Frete aproximado de ${origin} para São Paulo: R$ ${simulatedCost.toFixed(2)}. Para envio exato, acesse o site dos Correios e use nossos dados como destinatário.`);
    window.open('https://www.correios.com.br/', '_blank');
  }, 1500);
}
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  showStep(1);
  document.getElementById('start-envio').addEventListener('click', () => {
    showLoading('Carregando Frame Envio...');
    setTimeout(() => {
      hideLoading();
      showStep(2);
      detectLocation();
    }, 1500);
  });
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      const label = btn.dataset.label;
      copyToClipboard(text, btn, label);
    });
  });
  document.getElementById('terms-link').addEventListener('click', () => showBottomSheet('terms-popup'));
  document.querySelector('.close-popup').addEventListener('click', () => closeBottomSheet('terms-popup'));
  document.getElementById('overlay-black').addEventListener('click', () => closeBottomSheet('terms-popup'));
  document.getElementById('calc-frete').addEventListener('click', calcFrete);
});