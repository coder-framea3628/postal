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
// ===== Injetar jsPDF =====
const pdfScript = document.createElement('script');
pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
document.head.appendChild(pdfScript);
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
  overflow-x: hidden; /* Impede scroll lateral */
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
  overflow-x: hidden; /* Impede scroll lateral no container */
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
h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 12px;
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
  margin-bottom: 20px; /* Aumentado o espaçamento entre itens */
  font-size: 0.9rem;
  gap: 12px; /* Adicionado gap para melhor separação */
}
.info-label {
  font-weight: 500;
  min-width: 80px; /* Largura mínima para labels */
}
.info-value {
  flex: 1;
  text-align: right;
  word-break: break-word; /* Quebra de linha para valores longos */
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
  flex-shrink: 0; /* Impede encolhimento do botão */
}
.copy-btn:hover {
  background: var(--accent-light);
}
.copy-toast {
  position: absolute;
  top: -40px;
  left: 0;
  transform: translateX(-100%);
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
  transform: translateX(-100%) translateY(-10px);
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
.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
  margin: 0 8px;
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
.freight-input:invalid {
  border-color: var(--error-color);
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
.stepper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}
.stepper-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  width: 100%;
  max-width: 300px;
}
.stepper-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
  z-index: 2;
}
.stepper-line {
  position: absolute;
  top: 24px;
  left: 12px;
  width: 2px;
  height: calc(100% - 24px + 16px);
  background: var(--primary-color);
  z-index: 1;
}
.stepper-item:last-child .stepper-line {
  display: none;
}
.stepper-content {
  margin-left: 16px;
  text-align: left;
}
.stepper-title {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 4px;
}
.stepper-desc {
  font-size: 0.85rem;
  color: var(--dark-text);
}
.gift-section, .message-section, .model-section {
  margin-top: 24px;
}
textarea.freight-input, input.freight-input {
  height: 100px;
  resize: vertical;
}
#encrypted-result {
  background: var(--note-bg);
  padding: 12px;
  border-radius: 12px;
  word-break: break-all;
}
.char-count {
  font-size: 0.8rem;
  color: var(--dark-text);
  text-align: right;
  margin-top: -8px;
  margin-bottom: 12px;
}
.error-message {
  color: var(--error-color);
  font-size: 0.85rem;
  text-align: center;
  margin-top: -8px;
  margin-bottom: 12px;
  display: none;
}
.pdf-btn {
  margin-top: 16px;
}
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
document.head.appendChild(style);
// ===== Injetar HTML =====
document.body.innerHTML = `
  <div class="container" style="opacity: 0; animation: fadeIn 0.8s ease forwards;">
    <div id="step1" class="step active">
      <img src="https://framerusercontent.com/images/uTopFFb3CBe8G0mbRR93GLrw.png" alt="Frame Envio" style="width: 200px; height: 200px; display: block; margin: 0 auto 16px;">
      <h2>Presenteie uma Modelo</h2>
      <p>Deseja presentear uma modelo da plataforma? Conheça o Frame Envio, nossa caixa postal segura e discreta para envios especiais.</p>
      <button class="btn" id="start-envio">Continuar</button>
    </div>
    <div id="step2" class="step">
      <h2>Como funciona o Frame Envio?</h2>
      <p>O Frame Envio é gratuito, exceto pelo custo do frete que você paga diretamente à transportadora. Nós garantimos privacidade total na entrega à modelo.</p>
      <div class="stepper">
        <div class="stepper-item">
          <div class="stepper-dot">1</div>
          <div class="stepper-line"></div>
          <div class="stepper-content">
            <div class="stepper-title">Envie o Presente</div>
            <div class="stepper-desc">Use nossos dados como destinatário e envie via Correios ou transportadora.</div>
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-dot">2</div>
          <div class="stepper-line"></div>
          <div class="stepper-content">
            <div class="stepper-title">Nós Recebemos</div>
            <div class="stepper-desc">Recebemos o pacote de forma segura e discreta.</div>
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-dot">3</div>
          <div class="stepper-content">
            <div class="stepper-title">Entrega à Modelo</div>
            <div class="stepper-desc">Redistribuímos para a modelo com total privacidade.</div>
          </div>
        </div>
      </div>
      <button class="btn" id="continue-explain">Continuar</button>
    </div>
    <div id="step3" class="step">
      <h2>Como Enviar</h2>
      <p>Envie presentes para as modelos de forma simples e segura. Use os dados abaixo como destinatário. Nós cuidamos da entrega final com privacidade total.</p>
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">Destinatário:</span>
          <span class="info-value">FRAME TECNOLOGIA LTDA</span>
          <button class="copy-btn" data-copy="FRAME TECNOLOGIA LTDA" data-label="Destinatário" aria-label="Copiar destinatário">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">Destinatário copiado</div>
          </button>
        </div>
        <div class="info-item">
          <span class="info-label">CNPJ:</span>
          <span class="info-value">38.539.493/0001-05</span>
          <button class="copy-btn" data-copy="38.539.493/0001-05" data-label="CNPJ" aria-label="Copiar CNPJ">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">CNPJ copiado</div>
          </button>
        </div>
        <div class="info-item">
          <span class="info-label">Endereço:</span>
          <span class="info-value">Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/ SP, CEP: 01452-001</span>
          <button class="copy-btn" data-copy="Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/ SP, CEP: 01452-001" data-label="Endereço" aria-label="Copiar endereço">
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
            <div class="copy-toast">Endereço copiado</div>
          </button>
        </div>
      </div>
      <p>Para o remetente, use seu nome e endereço completo.</p>
      <div class="model-section">
        <h3>Nome da Modelo</h3>
        <input type="text" id="model-name" class="freight-input" placeholder="Nome e sobrenome da modelo" required>
        <p class="error-message" id="model-error">Por favor, preencha o nome da modelo.</p>
      </div>
      <div class="gift-section">
        <h3>Descrição do Presente</h3>
        <textarea id="gift-desc" class="freight-input" placeholder="Descreva o presente para verificação..." maxlength="500" required></textarea>
        <p class="char-count" id="gift-char">0/500</p>
        <p class="error-message" id="gift-error">Por favor, preencha a descrição do presente.</p>
      </div>
      <div class="message-section">
        <h3>Mensagem Especial (opcional)</h3>
        <textarea id="special-message" class="freight-input" placeholder="Escreva uma mensagem para a modelo..." maxlength="500"></textarea>
        <p class="char-count" id="message-char">0/500</p>
        <div class="btn-container">
          <button class="btn" id="encrypt-message">Criptografar Mensagem</button>
          <div class="spinner small" id="encrypt-spinner" style="display:none;"></div>
        </div>
        <div id="encrypted-result" style="display:none;">
          <div class="info-item">
            <span class="info-label">Criptografado:</span>
            <span class="info-value" id="encrypted-text"></span>
            <button class="copy-btn" data-copy-target="encrypted-text" data-label="Criptografado" aria-label="Copiar mensagem criptografada">
              <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
              <div class="copy-toast">Criptografado copiado</div>
            </button>
          </div>
          <div class="info-item">
            <span class="info-label">Chave:</span>
            <span class="info-value" id="decryption-key"></span>
            <button class="copy-btn" data-copy-target="decryption-key" data-label="Chave" aria-label="Copiar chave de decifração">
              <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H7V7H3V21H17V17H21V3ZM17 15H19V5H9V7H17V15Z" fill="white"/> </svg>
              <div class="copy-toast">Chave copiada</div>
            </button>
          </div>
          <p>Copie e envie a chave separadamente para a modelo decifrar.</p>
        </div>
      </div>
      <div class="freight-section">
        <h3>Cálculo de Frete</h3>
        <p id="location-message">Estamos detectando sua localização...</p>
        <input type="text" id="origin-city" class="freight-input" placeholder="Sua cidade ou CEP (ex: São Paulo, SP ou 00000-000)" pattern="^[a-zA-ZÀ-ÿ\\s]+, [A-Z]{2}$|^\\d{5}-?\\d{3}$" inputmode="text">
        <p class="error-message" id="origin-error">Por favor, preencha a cidade ou CEP válido.</p>
        <button class="btn freight-btn" id="calc-frete">Calcular frete aproximado</button>
      </div>
      <button class="btn pdf-btn" id="generate-pdf" disabled>Gerar PDF para impressão</button>
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
    <span class="close-popup" aria-label="Fechar popup de termos">×</span>
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
  <div class="bottom-sheet" id="freight-popup">
    <span class="close-popup" aria-label="Fechar popup de frete">×</span>
    <h2>Frete Aproximado</h2>
    <p id="freight-value" style="font-size: 1.8rem; font-weight: 600; color: var(--accent-light); text-align: center; margin-bottom: 8px;"></p>
    <p>De <span id="freight-origin"></span> para São Paulo.</p>
    <p style="font-size: 0.85rem; color: var(--dark-text);">Este é um valor aproximado. Para cálculo exato, use o site dos Correios.</p>
    <button class="btn" id="go-correios">Calcular frete nos Correios</button>
    <button class="btn secondary" onclick="closeBottomSheet('freight-popup')">Fechar</button>
  </div>
  <div class="bottom-sheet" id="prohibited-popup">
    <span class="close-popup" aria-label="Fechar popup de item proibido">×</span>
    <h2>Seu item pode Ser proibido</h2>
    <p style="font-size: 1rem; font-weight: 500; margin-bottom: 12px;">Nossa tecnologia detectou possível violação.</p>
    <p>Itens sexuais ou inapropriados não são permitidos. Sugestões de presentes: lingeries, flores, chocolates, bolsas, acessórios, roupas, etc.</p>
    <button class="btn secondary" onclick="closeBottomSheet('prohibited-popup')">Entendi</button>
  </div>
  <div class="bottom-sheet" id="cep-popup">
    <span class="close-popup" aria-label="Fechar popup de CEP">×</span>
    <h2>Informe seu CEP</h2>
    <p>Para melhor precisão no frete, informe seu CEP.</p>
    <input type="text" id="cep-input" class="freight-input" placeholder="CEP (ex: 00000-000)" pattern="\\d{5}-?\\d{3}" inputmode="numeric">
    <button class="btn" id="submit-cep">Confirmar</button>
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
  const locationMessage = document.getElementById('location-message');
  locationMessage.textContent = 'Estamos detectando sua localização...';
  if (navigator.geolocation) {
    showLoading('Detectando localização...');
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        .then(res => res.json())
        .then(data => {
          const city = `${data.address.city || data.address.town}, ${data.address.state}`;
          document.getElementById('origin-city').value = city;
          locationMessage.textContent = `Localização aproximada detectada: ${city}`;
          hideLoading();
          checkFormValidity();
        })
        .catch(() => {
          hideLoading();
          showCepPopup();
        });
    }, () => {
      hideLoading();
      showCepPopup();
    });
  } else {
    showCepPopup();
  }
}
function showCepPopup() {
  document.getElementById('location-message').textContent = 'Insira sua cidade ou CEP manualmente.';
  showBottomSheet('cep-popup');
}
async function fetchCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (!data.erro) {
      const city = `${data.localidade}, ${data.uf}`;
      document.getElementById('origin-city').value = city;
      document.getElementById('location-message').textContent = `Localização via CEP: ${city}`;
      checkFormValidity();
    } else {
      alert('CEP inválido.');
    }
  } catch {
    alert('Erro ao consultar CEP, recarregue a página.');
  }
}
function showLoading(message) {
  document.getElementById('loading-message').textContent = message;
  document.getElementById('loading-overlay').style.display = 'flex';
}
function hideLoading() {
  document.getElementById('loading-overlay').style.display = 'none';
}
async function encryptMessage() {
  const message = document.getElementById('special-message').value.trim();
  if (!message) {
    alert('Escreva uma mensagem para criptografar.');
    return;
  }
  const encryptBtn = document.getElementById('encrypt-message');
  const spinner = document.getElementById('encrypt-spinner');
  encryptBtn.disabled = true;
  spinner.style.display = 'inline-block';
  try {
    const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(message);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const keyExport = await crypto.subtle.exportKey('raw', key);
    const keyArray = new Uint8Array(keyExport);
    const keyBase64 = btoa(String.fromCharCode(...keyArray));
    document.getElementById('encrypted-text').textContent = `${ivBase64}:${encryptedBase64}`;
    document.getElementById('decryption-key').textContent = keyBase64;
    document.getElementById('encrypted-result').style.display = 'block';
    checkFormValidity();
  } catch (error) {
    alert('Erro ao criptografar a mensagem. Certifique-se de que o navegador suporta Crypto API.');
  } finally {
    encryptBtn.disabled = false;
    spinner.style.display = 'none';
  }
}
function calcFrete() {
  const originInput = document.getElementById('origin-city');
  const origin = originInput.value.trim();
  const giftDesc = document.getElementById('gift-desc');
  const modelName = document.getElementById('model-name');
  if (!giftDesc.value.trim() || !modelName.value.trim() || !origin) {
    if (!giftDesc.value.trim()) {
      document.getElementById('gift-error').style.display = 'block';
      giftDesc.classList.add('invalid');
    }
    if (!modelName.value.trim()) {
      document.getElementById('model-error').style.display = 'block';
      modelName.classList.add('invalid');
    }
    if (!origin) {
      document.getElementById('origin-error').style.display = 'block';
      originInput.classList.add('invalid');
    }
    return;
  }
  const cepPattern = /^\d{5}-?\d{3}$/;
  if (cepPattern.test(origin)) {
    fetchCep(origin.replace('-', ''));
    return;
  }
  const desc = giftDesc.value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const prohibited = [/sex/i, /vibrador/i, /dildo/i, /erotic/i, /adulto/i, /plug anal/i, /masturbador/i, /algema/i, /penis/i, /piroca/i, /vagina/i, /bosta/i, /lubrificante/i, /ppk/i, /brinquedo sexual/i, /consolo/i, /vibrante/i, /anal/i, /erotico/i, /fetiche/i, /sadomaso/i, /bdsm/i, /chicote/i, /vibracao/i, /massageador intimo/i, /gel excitante/i, /preservativo/i, /camisinha/i, /drogas/i, /maconha/i, /cocaina/i, /merda/i, /porra/i, /caralho/i, /foda/i, /puta/i, /viado/i, /buceta/i, /cu/i, /pau/i];
  if (prohibited.some(rx => rx.test(desc))) {
    showBottomSheet('prohibited-popup');
    return;
  }
  showLoading('Calculando frete aproximado...');
  setTimeout(() => {
    hideLoading();
    const normalizedOrigin = origin.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const freightCosts = {
      'sao paulo, sp': 0,
      'rio de janeiro, rj': 35.50,
      'belo horizonte, mg': 28.00,
      'brasilia, df': 45.00,
      'curitiba, pr': 32.00,
      'porto alegre, rs': 40.00,
      'recife, pe': 55.00,
      'salvador, ba': 50.00,
      'fortaleza, ce': 60.00,
      'manaus, am': 80.00,
      'goiania, go': 50.00,
      'belem, pa': 70.00,
      'campo grande, ms': 55.00,
      'cuiaba, mt': 60.00,
      'florianopolis, sc': 38.00,
      'vitoria, es': 40.00,
      'natal, rn': 65.00,
      'joao pessoa, pb': 62.00,
      'maceio, al': 58.00,
      'aracaju, se': 55.00,
      'teresina, pi': 68.00,
      'palmas, to': 70.00,
      'porto velho, ro': 75.00,
      'boa vista, rr': 85.00,
      'rio branco, ac': 80.00,
      'sao luis, ma': 65.00,
    };
    const cost = freightCosts[normalizedOrigin] || 42.00;
    document.getElementById('freight-value').textContent = `R$ ${cost.toFixed(2)}`;
    document.getElementById('freight-origin').textContent = origin.charAt(0).toUpperCase() + origin.slice(1);
    showBottomSheet('freight-popup');
  }, 1500);
}
function checkFormValidity() {
  const giftDesc = document.getElementById('gift-desc').value.trim();
  const modelName = document.getElementById('model-name').value.trim();
  const origin = document.getElementById('origin-city').value.trim();
  const encrypted = document.getElementById('encrypted-result').style.display !== 'none';
  const pdfBtn = document.getElementById('generate-pdf');
  if (giftDesc && modelName && origin && (document.getElementById('special-message').value.trim() === '' || encrypted)) {
    pdfBtn.disabled = false;
  } else {
    pdfBtn.disabled = true;
  }
}
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Frame Envio | Dados importantes', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Destinatário: FRAME TECNOLOGIA LTDA', 20, 40);
  doc.text('CNPJ: 38.539.493/0001-05', 20, 50);
  doc.text('Endereço: Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/ SP, CEP: 01452-001', 20, 60, { maxWidth: 170 });
  doc.text(`Para: ${document.getElementById('model-name').value}`, 20, 80);
  const encryptedText = document.getElementById('encrypted-text').textContent;
  if (encryptedText) {
    doc.text('Mensagem Criptografada:', 20, 90);
    doc.text(encryptedText, 20, 100, { maxWidth: 170 });
  }
  doc.setFontSize(10);
  doc.text('Aviso: Este papel deve ser colocado DENTRO do pacote junto com o item enviado. Não cole ou exiba ele externamente.', 20, 260, { maxWidth: 170 });
  doc.text('A Frame não se responsabiliza por perdas, danos ou atrasos no transporte. A entrega é de responsabilidade da transportadora escolhida pelo remetente.', 20, 270, { maxWidth: 170 });
  doc.save('frame_envio.pdf');
}
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  showStep(1);
  document.getElementById('start-envio').addEventListener('click', () => {
    showStep(2);
  });
  document.getElementById('continue-explain').addEventListener('click', () => {
    showLoading('Carregando Frame Envio...');
    setTimeout(() => {
      hideLoading();
      showStep(3);
      detectLocation();
    }, 1500);
  });
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let text;
      if (btn.dataset.copyTarget) {
        text = document.getElementById(btn.dataset.copyTarget).textContent;
        copyToClipboard(text, btn, btn.dataset.label);
        if (btn.dataset.copyTarget === 'decryption-key' || btn.dataset.copyTarget === 'encrypted-text') {
          setTimeout(() => {
            document.getElementById('encrypted-result').style.display = 'none';
            document.getElementById('encrypted-text').textContent = '';
            document.getElementById('decryption-key').textContent = '';
            localStorage.removeItem('encryptedData');
          }, 10000);
        }
      } else {
        text = btn.dataset.copy;
        copyToClipboard(text, btn, btn.dataset.label);
      }
    });
  });
  document.getElementById('terms-link').addEventListener('click', () => showBottomSheet('terms-popup'));
  document.querySelectorAll('.close-popup').forEach(close => {
    close.addEventListener('click', () => {
      const popup = close.closest('.bottom-sheet').id;
      closeBottomSheet(popup);
    });
  });
  document.getElementById('overlay-black').addEventListener('click', () => {
    document.querySelectorAll('.bottom-sheet.show').forEach(el => closeBottomSheet(el.id));
  });
  document.getElementById('calc-frete').addEventListener('click', calcFrete);
  document.getElementById('encrypt-message').addEventListener('click', encryptMessage);
  document.getElementById('go-correios').addEventListener('click', () => {
    window.open('https://www.correios.com.br/', '_blank');
    closeBottomSheet('freight-popup');
  });
  document.getElementById('generate-pdf').addEventListener('click', generatePDF);
  document.getElementById('submit-cep').addEventListener('click', () => {
    const cep = document.getElementById('cep-input').value.replace('-', '');
    if (/^\d{8}$/.test(cep)) {
      fetchCep(cep);
      closeBottomSheet('cep-popup');
    } else {
      alert('CEP inválido.');
    }
  });
  const textareas = document.querySelectorAll('textarea.freight-input');
  textareas.forEach(ta => {
    const countId = ta.id === 'gift-desc' ? 'gift-char' : 'message-char';
    ta.addEventListener('input', () => {
      document.getElementById(countId).textContent = `${ta.value.length}/500`;
      checkFormValidity();
    });
  });
  document.getElementById('model-name').addEventListener('input', checkFormValidity);
  document.getElementById('origin-city').addEventListener('input', checkFormValidity);
  document.getElementById('gift-desc').addEventListener('input', () => {
    document.getElementById('gift-error').style.display = 'none';
    document.getElementById('gift-desc').classList.remove('invalid');
    checkFormValidity();
  });
  document.getElementById('model-name').addEventListener('input', () => {
    document.getElementById('model-error').style.display = 'none';
    document.getElementById('model-name').classList.remove('invalid');
  });
  document.getElementById('origin-city').addEventListener('input', () => {
    document.getElementById('origin-error').style.display = 'none';
    document.getElementById('origin-city').classList.remove('invalid');
  });
});