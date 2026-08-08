/* ==========================================================================
   CHAT.JS
   Interface da área "Pergunte sobre mim".
   FASE 6: só a interface — envio de mensagem, histórico da sessão, loading
   e tratamento de erro já funcionam, mas a resposta ainda é um placeholder.
   A integração real com a API de IA (via Edge Function do Supabase) entra
   nas Fases 7 e 8.
   ========================================================================== */

const chatHistory = [];

function initChat() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const clearBtn = document.getElementById('chatClearBtn');
  const suggestions = document.getElementById('chatSuggestions');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    sendQuestion(question);
    input.value = '';
  });

  suggestions?.querySelectorAll('.chat-suggestion').forEach((btn) => {
    btn.addEventListener('click', () => {
      sendQuestion(btn.textContent.trim());
    });
  });

  clearBtn?.addEventListener('click', clearChat);
}

/* --------------------------------------------------------------------------
   ENVIAR PERGUNTA
   -------------------------------------------------------------------------- */
async function sendQuestion(question) {
  clearChatError();
  appendMessage('user', question);
  chatHistory.push({ role: 'user', content: question });
  setChatLoading(true);

  try {
    const answer = await fetchAnswer(question);
    appendMessage('bot', answer);
    chatHistory.push({ role: 'bot', content: answer });
  } catch (err) {
    showChatError('Não foi possível obter uma resposta agora. Tente novamente em instantes.');
  } finally {
    setChatLoading(false);
  }
}

/* --------------------------------------------------------------------------
   BUSCAR RESPOSTA
   Chama a Edge Function "ask-about-me" no Supabase. Nenhuma chave de IA
   trafega até aqui — a function é que fala com a API de IA (Fase 8).
   -------------------------------------------------------------------------- */
async function fetchAnswer(question) {
  const functionUrl = `${SUPABASE_URL}/functions/v1/ask-about-me`;

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao consultar o assistente.');
  }

  return data.answer;
}

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO DE MENSAGENS
   -------------------------------------------------------------------------- */
function appendMessage(role, text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const message = document.createElement('div');
  message.className = `chat-message chat-message--${role === 'user' ? 'user' : 'bot'}`;

  const bubble = document.createElement('div');
  bubble.className = 'chat-message__bubble';
  bubble.textContent = text;

  message.appendChild(bubble);
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

/* --------------------------------------------------------------------------
   LOADING
   -------------------------------------------------------------------------- */
function setChatLoading(isLoading) {
  const typing = document.getElementById('chatTyping');
  const sendBtn = document.getElementById('chatSendBtn');
  const input = document.getElementById('chatInput');

  typing?.classList.toggle('is-hidden', !isLoading);
  if (sendBtn) sendBtn.disabled = isLoading;
  if (input) input.disabled = isLoading;

  if (isLoading) {
    const container = document.getElementById('chatMessages');
    if (container) container.scrollTop = container.scrollHeight;
  }
}

/* --------------------------------------------------------------------------
   ERROS
   -------------------------------------------------------------------------- */
function showChatError(message) {
  const el = document.getElementById('chatError');
  if (!el) return;
  el.textContent = message;
}

function clearChatError() {
  const el = document.getElementById('chatError');
  if (el) el.textContent = '';
}

/* --------------------------------------------------------------------------
   LIMPAR CONVERSA
   -------------------------------------------------------------------------- */
function clearChat() {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  chatHistory.length = 0;
  container.innerHTML = `
    <div class="chat-message chat-message--bot">
      <div class="chat-message__bubble">
        Conversa reiniciada. Pode perguntar sobre formação, projetos, tecnologias ou experiência.
      </div>
    </div>`;
  clearChatError();
}
