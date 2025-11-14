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
.gift-section, .message-section {
  margin-top: 24px;
}
textarea.freight-input {
  height: 100px;
  resize: vertical;
}
#encrypted-result {
  background: var(--note-bg);
  padding: 12px;
  border-radius: 12px;
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
      <p>O Frame Envio é gratuito, exceto pelo custo do frete que você paga diretamente à transportadora. Garantimos um alto nível de privacidade na entrega à modelo.</p>
      <div class="stepper">
        <div class="stepper-item">
          <div class="stepper-dot">1</div>
          <div class="stepper-line"></div>
          <div class="stepper-content">
            <div class="stepper-title">Envie o presente</div>
            <div class="stepper-desc">Use nossos dados como destinatário e envie via Correios ou transportadora.</div>
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-dot">2</div>
          <div class="stepper-line"></div>
          <div class="stepper-content">
            <div class="stepper-title">Nós recebemos</div>
            <div class="stepper-desc">Recebemos o pacote de forma segura e discreta em nossa caixa postal.</div>
          </div>
        </div>
        <div class="stepper-item">
          <div class="stepper-dot">3</div>
          <div class="stepper-content">
            <div class="stepper-title">Entrega à modelo</div>
            <div class="stepper-desc">Redistribuímos seu presente para a modelo com total privacidade.</div>
          </div>
        </div>
      </div>
      <button class="btn" id="continue-explain">Continuar</button>
    </div>
    <div id="step3" class="step">
      <h2>Como Enviar</h2>
      <p>Envie um presente para uma modelo da Frame Agency de forma simples e segura. Use os dados abaixo como destinatário. Nós cuidamos da entrega final com privacidade total.</p>
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
      <p>Para o remetente, use seus dados reais completos, se preferir, podemos não exibir seu nome na entrega do pacote.</p>
      <div class="gift-section">
        <h3>Descrição do seu presente</h3>
        <textarea id="gift-desc" class="freight-input" placeholder="Descreva como será o seu presente para uma verificação automática de viabilidade de envio, evitando recusas"></textarea>
      </div>
      <div class="message-section">
        <h3>Mensagem Especial (opcional)</h3>
        <textarea id="special-message" class="freight-input" placeholder="Escreva uma mensagem especial para a modelo que poderá ser lida pelo código no site da Frame..."></textarea>
        <button class="btn" id="encrypt-message">Criptografar mensagem</button>
        <div id="encrypted-result" style="display:none;">
          <p><strong>Mensagem criptografada:</strong> <span id="encrypted-text"></span></p>
          <p><strong>Chave de decifração:</strong> <span id="decryption-key"></span></p>
          <p>Copie e envie esta chave para a modelo ler sua mensagem em nosso site oficial.</p>
        </div>
      </div>
      <div class="freight-section">
        <h3>Cálculo de Frete</h3>
        <p id="location-message">Estamos detectando sua localização...</p>
        <input type="text" id="origin-city" class="freight-input" placeholder="Sua cidade (ex: São Paulo, SP)">
        <button class="btn freight-btn" id="calc-frete">Calcular frete aproximado</button>
      </div>
      <div class="disclaimer">
        O Frame Envio é exclusivo para itens não sexuais. Ao utilizar, você concorda com os <a href="https://frameag.com/termos" target="_blank">Termos</a> e <a href="https://frameag.com/privacy" target="_blank">Política de Privacidade</a>. A entrega e prazos são de total responsabilidade da transportadora escolhida.
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
      <li>A Frame não se responsabiliza por perdas ou danos durante o transporte dos itens enviados.</li>
      <li>Entregas e prazos são gerenciados pelos Correios ou transportadora escolhida por você.</li>
      <li>Privacidade é garantida na redistribuição do seu presente especial para a modelo.</li>
      <li>Consulte os <a href="https://frameag.com/termos" target="_blank" style="color: var(--primary-color);">Termos Completos</a> para mais detalhes.</li>
    </ul>
    <button class="btn secondary" onclick="closeBottomSheet('terms-popup')">Fechar</button>
  </div>
  <div class="bottom-sheet" id="freight-popup">
    <span class="close-popup">×</span>
    <h2>Frete Aproximado</h2>
    <p id="freight-value" style="font-size: 1.8rem; font-weight: 600; color: var(--accent-light); text-align: center; margin-bottom: 8px;"></p>
    <p>De <span id="freight-origin"></span> para São Paulo.</p>
    <p style="font-size: 0.85rem; color: var(--dark-text);">Este é um valor aproximado. Para cálculo exato, use o site dos Correios.</p>
    <button class="btn" id="go-correios">Calcular Frete Exato nos Correios</button>
    <button class="btn secondary" onclick="closeBottomSheet('freight-popup')">Fechar</button>
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
        })
        .catch(() => {
          hideLoading();
          locationMessage.textContent = 'Insira sua cidade manualmente.';
          alert('Poxa! Não foi possível detectar sua localização. Insira ela manualmente.');
        });
    }, () => {
      hideLoading();
      locationMessage.textContent = 'Insira sua cidade manualmente.';
      alert('Permissão de localização negada. Insira sua cidade manualmente ou recarrague a página.');
    });
  } else {
    locationMessage.textContent = 'Insira sua cidade manualmente.';
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
async function encryptMessage() {
  const message = document.getElementById('special-message').value.trim();
  if (!message) {
    alert('Escreva sua mensagem para criptografar.');
    return;
  }
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
  } catch (error) {
    alert('Erro ao criptografar a mensagem. Certifique-se de que o navegador suporta nossa FrameCrypto.');
  }
}
function calcFrete() {
  const origin = document.getElementById('origin-city').value.trim();
  if (!origin) {
    alert('Insira sua cidade de origem.');
    return;
  }
  const desc = document.getElementById('gift-desc').value.trim();
  const prohibited = [/sex/i, /vibrador/i, /dildo/i, /algema/i, /erótic/i, /pênis/i, /piroca/i, /vagina/i, /dildo/i, /bosta/i, /lubrificante/i, /ppk/i, /brinquedo sexual/i, /adulto/i];
  if (prohibited.some(rx => rx.test(desc))) {
    alert('Poxa! Após análise da tecnologia da Frame, o presente descrito pode violar os Termos de envio da plataforma. Nessa modalidade, itens sexuais ou inapropriados não são permitidos e podem ser devolvidos por nós ou recusados pela transportadora.');
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
      // Default para outras cidades
    };
    const cost = freightCosts[normalizedOrigin] || 42.00;
    document.getElementById('freight-value').textContent = `R$ ${cost.toFixed(2)}`;
    document.getElementById('freight-origin').textContent = origin.charAt(0).toUpperCase() + origin.slice(1);
    showBottomSheet('freight-popup');
  }, 1500);
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
      const text = btn.dataset.copy;
      const label = btn.dataset.label;
      copyToClipboard(text, btn, label);
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
    window.open('https://www2.correios.com.br/sistemas/precosPrazos/', '_blank');
    closeBottomSheet('freight-popup');
  });
});