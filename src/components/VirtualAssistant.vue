<template>
  <transition name="slide-up">
    <div v-if="isPanelOpen" class="virtual-assistant-panel">
      <!-- Header with Close Button -->
      <div class="assistant-header">
        <div class="assistant-title">
          <svg class="assistant-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          <h2>Assistente Virtuale</h2>
        </div>
        <button 
          class="close-btn" 
          @click="closePanel"
          aria-label="Chiudi assistente virtuale"
          title="Chiudi (X)"
        >
          ×
        </button>
      </div>

      <!-- Quick Suggestion Section (Moved from Header) -->
      <div class="quick-suggestion-section">
        <button 
          class="quick-suggestion-btn"
          @click="getQuickSuggestion"
          :disabled="isLoadingSuggestion"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{{ isLoadingSuggestion ? 'Caricamento...' : 'Suggerimento Rapido' }}</span>
        </button>
      </div>

      <!-- Chat Form Section - Enlarged -->
      <div class="chat-section">
        <form @submit.prevent="sendMessage" class="chat-form">
          <div class="input-group">
            <textarea
              v-model="userMessage"
              placeholder="Scrivi il tuo messaggio o domanda qui..."
              class="message-input"
              @keydown.enter.ctrl="sendMessage"
              @keydown.meta.enter="sendMessage"
            ></textarea>
          </div>

          <!-- Send Button -->
          <button 
            type="submit" 
            class="send-btn"
            :disabled="!userMessage.trim()"
            aria-label="Invia messaggio"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16256983 C3.34915502,0.9054724 2.40734225,1.01609346 1.77946707,1.4873856 C0.994623095,2.11683127 0.837654326,3.20750074 1.15159189,3.99299767 L3.03521743,10.4339905 C3.03521743,10.5910879 3.34915502,10.7481853 3.50612381,10.7481853 L16.6915026,11.5336722 C16.6915026,11.5336722 17.1624089,11.5336722 17.1624089,12.0049643 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
            </svg>
            <span>Invia</span>
          </button>
        </form>
      </div>

      <!-- Messages Display Area -->
      <div v-if="messages.length > 0" class="messages-area">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message', message.type]"
        >
          {{ message.text }}
        </div>
      </div>
    </div>
  </transition>

  <!-- Toggle Button (when panel is closed) -->
  <button 
    v-if="!isPanelOpen"
    class="assistant-toggle-btn"
    @click="openPanel"
    aria-label="Apri assistente virtuale"
    title="Apri assistente virtuale"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Message {
  type: 'user' | 'assistant';
  text: string;
}

export default defineComponent({
  name: 'VirtualAssistant',
  data() {
    return {
      isPanelOpen: false,
      userMessage: '',
      messages: [] as Message[],
      isLoadingSuggestion: false,
    };
  },
  methods: {
    openPanel() {
      this.isPanelOpen = true;
    },
    closePanel() {
      this.isPanelOpen = false;
    },
    async sendMessage() {
      if (!this.userMessage.trim()) return;

      // Add user message to chat
      this.messages.push({
        type: 'user',
        text: this.userMessage,
      });

      const message = this.userMessage;
      this.userMessage = '';

      // Simulate API call
      try {
        // Replace with actual API call
        const response = await this.callAssistantAPI(message);
        this.messages.push({
          type: 'assistant',
          text: response,
        });
      } catch (error) {
        this.messages.push({
          type: 'assistant',
          text: 'Scusa, si è verificato un errore. Riprova più tardi.',
        });
      }

      // Auto-scroll to latest message
      this.$nextTick(() => {
        const messagesArea = document.querySelector('.messages-area');
        if (messagesArea) {
          messagesArea.scrollTop = messagesArea.scrollHeight;
        }
      });
    },
    async getQuickSuggestion() {
      this.isLoadingSuggestion = true;
      try {
        // Replace with actual API call
        const suggestion = await this.callQuickSuggestionAPI();
        this.messages.push({
          type: 'assistant',
          text: `💡 Suggerimento: ${suggestion}`,
        });
        // Auto-scroll
        this.$nextTick(() => {
          const messagesArea = document.querySelector('.messages-area');
          if (messagesArea) {
            messagesArea.scrollTop = messagesArea.scrollHeight;
          }
        });
      } catch (error) {
        this.messages.push({
          type: 'assistant',
          text: 'Non sono riuscito a generare un suggerimento in questo momento.',
        });
      } finally {
        this.isLoadingSuggestion = false;
      }
    },
    async callAssistantAPI(message: string): Promise<string> {
      // TODO: Implementare chiamata API reale
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Questa è una risposta di esempio dall\'assistente.');
        }, 800);
      });
    },
    async callQuickSuggestionAPI(): Promise<string> {
      // TODO: Implementare chiamata API reale
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Ricorda di controllare gli interventi scaduti oggi.');
        }, 1000);
      });
    },
  },
});
</script>

<style scoped lang="scss">
.virtual-assistant-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 500px;
  max-width: 90vw;
  height: 700px;
  max-height: 90vh;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 900;
  animation: slideUp 0.3s ease;

  @media (max-width: 768px) {
    width: calc(100vw - 32px);
    height: calc(100vh - 100px);
    bottom: 80px;
    right: 16px;
    left: 16px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 16px);
    height: calc(100vh - 80px);
    bottom: 60px;
    right: 8px;
    left: 8px;
    border-radius: 12px;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.assistant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.assistant-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;

  .assistant-icon {
    width: 28px;
    height: 28px;
  }

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
}

.quick-suggestion-section {
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.quick-suggestion-btn {
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 2px solid #60a5fa;
  color: #1e3a8a;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

.chat-section {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.chat-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group {
  flex: 1;
}

.message-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #999;
  }
}

.send-btn {
  padding: 10px 16px;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;

    &:hover {
      background: #999;
    }
  }
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 85%;
  word-wrap: break-word;

  &.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    color: white;
    border-radius: 12px 4px 12px 12px;
  }

  &.assistant {
    align-self: flex-start;
    background: #f0f0f0;
    color: #333;
    border-radius: 4px 12px 12px 12px;
  }
}

.assistant-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  transition: all 0.3s ease;
  z-index: 800;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>