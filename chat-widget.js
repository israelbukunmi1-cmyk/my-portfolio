(function () {
  // ==== CONFIG ====
  const CHAT_API_URL = "https://ai-agent-9ene.onrender.com/chat";
  const BRAND_NAME = "Israel Bukunmi Akintoye";
  const BRAND_COLOR = "#8a4c0e";
  const GREETING = "Hi! 👋 I'm the portfolio AI assistant. Ask me anything about my work.";
  // =================

  if (document.getElementById("prt-chat-widget-root")) return;

  const root = document.createElement("div");
  root.id = "prt-chat-widget-root";
  document.body.appendChild(root);

  const style = document.createElement("style");
  style.textContent = `
    #prt-chat-widget-root * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

    #prt-chat-bubble {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${BRAND_COLOR};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      z-index: 999999;
      transition: transform 0.15s ease;
    }
    #prt-chat-bubble:hover { transform: scale(1.06); }
    #prt-chat-bubble svg { width: 28px; height: 28px; fill: white; }

    #prt-chat-label {
      position: fixed;
      bottom: 36px;
      right: 92px;
      padding: 7px 12px;
      border: 1px solid #e7e0d2;
      border-radius: 999px;
      background: #fff;
      color: #242018;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.18);
      z-index: 999999;
      transition: opacity 0.2s ease, transform 0.15s ease;
    }
    #prt-chat-label:hover { transform: translateY(-1px); }
    #prt-chat-label.prt-hidden { opacity: 0; pointer-events: none; }

    #prt-chat-window {
      position: fixed;
      bottom: 92px;
      right: 20px;
      width: 340px;
      max-width: 90vw;
      height: 480px;
      max-height: 70vh;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.25);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
    }
    #prt-chat-window.prt-open { display: flex; }

    #prt-chat-header {
      background: ${BRAND_COLOR};
      color: white;
      padding: 14px 16px;
      font-weight: 600;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #prt-chat-close {
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      opacity: 0.9;
    }
    #prt-chat-close:hover { opacity: 1; }

    #prt-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      background: #f7f7f8;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .prt-msg {
      max-width: 80%;
      padding: 9px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .prt-msg-user {
      align-self: flex-end;
      background: ${BRAND_COLOR};
      color: white;
      border-bottom-right-radius: 4px;
    }
    .prt-msg-bot {
      align-self: flex-start;
      background: #ffffff;
      color: #222;
      border: 1px solid #e5e5e5;
      border-bottom-left-radius: 4px;
    }
    .prt-msg-typing {
      align-self: flex-start;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-bottom-left-radius: 4px;
      padding: 10px 14px;
    }
    .prt-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin: 0 1px;
      background: #999;
      border-radius: 50%;
      animation: prt-blink 1.2s infinite ease-in-out;
    }
    .prt-dot:nth-child(2) { animation-delay: 0.2s; }
    .prt-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes prt-blink { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }

    #prt-chat-input-row {
      display: flex;
      border-top: 1px solid #e5e5e5;
      padding: 8px;
      gap: 8px;
      background: white;
    }
    #prt-chat-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 9px 14px;
      font-size: 14px;
      outline: none;
    }
    #prt-chat-input:focus { border-color: ${BRAND_COLOR}; }
    #prt-chat-send {
      background: ${BRAND_COLOR};
      color: white;
      border: none;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    #prt-chat-send:disabled { opacity: 0.5; cursor: default; }
    #prt-chat-send svg { width: 16px; height: 16px; fill: white; }

    @media (max-width: 480px) {
      #prt-chat-window {
        width: 92vw;
        right: 4vw;
        bottom: 84px;
      }
      #prt-chat-label { display: none; }
    }
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <div id="prt-chat-label">Try my AI assistant</div>
    <div id="prt-chat-bubble" aria-label="Open chat">
      <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
    </div>
    <div id="prt-chat-window">
      <div id="prt-chat-header">
        <span>${BRAND_NAME}</span>
        <span id="prt-chat-close">&times;</span>
      </div>
      <div id="prt-chat-messages"></div>
      <div id="prt-chat-input-row">
        <input id="prt-chat-input" type="text" placeholder="Type a message..." />
        <button id="prt-chat-send" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;

  const bubble = document.getElementById("prt-chat-bubble");
  const label = document.getElementById("prt-chat-label");
  const win = document.getElementById("prt-chat-window");
  const closeBtn = document.getElementById("prt-chat-close");
  const messagesEl = document.getElementById("prt-chat-messages");
  const input = document.getElementById("prt-chat-input");
  const sendBtn = document.getElementById("prt-chat-send");

  let hasGreeted = false;

  function toggleWindow() {
    win.classList.toggle("prt-open");
    if (win.classList.contains("prt-open") && !hasGreeted) {
      hasGreeted = true;
      addMessage(GREETING, "bot");
    }
    if (win.classList.contains("prt-open")) {
      label.classList.add("prt-hidden");
      input.focus();
    }
  }

  bubble.addEventListener("click", toggleWindow);
  label.addEventListener("click", toggleWindow);
  closeBtn.addEventListener("click", toggleWindow);

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "prt-msg " + (sender === "user" ? "prt-msg-user" : "prt-msg-bot");
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "prt-msg-typing";
    div.id = "prt-typing-indicator";
    div.innerHTML = `<span class="prt-dot"></span><span class="prt-dot"></span><span class="prt-dot"></span>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("prt-typing-indicator");
    if (el) el.remove();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      hideTyping();

      if (!res.ok) {
        addMessage("Sorry, something went wrong. Please try again in a moment.", "bot");
      } else {
        const data = await res.json();
        addMessage(data.reply || "Sorry, I didn't get a response.", "bot");
      }
    } catch (err) {
      hideTyping();
      addMessage("Sorry, I couldn't connect. Please check your internet and try again.", "bot");
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();