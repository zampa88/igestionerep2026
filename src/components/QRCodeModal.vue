<template>
  <transition name="fade">
    <div v-if="isOpen" class="qr-code-modal-overlay" @click="closeModal">
      <div class="qr-code-modal" @click.stop>
        <!-- Close Button -->
        <button class="modal-close-btn" @click="closeModal" aria-label="Chiudi popup QR Code">
          ×
        </button>

        <!-- QR Code Section -->
        <div class="qr-code-section">
          <h2>Scarica l'App</h2>
          <p class="qr-description">Scansiona il codice QR per installare l'app</p>
          <div class="qr-code-container">
            <qr-code 
              :value="qrCodeUrl" 
              :size="250"
              level="H"
              render-as="svg"
            />
          </div>
        </div>

        <!-- PWA Installation Section -->
        <div class="pwa-section">
          <h3>Installazione Diretta</h3>
          <div class="pwa-buttons-container">
            <!-- Android Button -->
            <button 
              class="pwa-btn pwa-btn-android"
              @click="installAndroid"
              aria-label="Installa app su Android"
            >
              <svg class="pwa-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11.5 23.33 11.5 22.5V19h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zm3.5-9c.83 0 1.5-.67 1.5-1.5S10.33 6 9.5 6 8 6.67 8 7.5 8.67 9 9.5 9zm5 0c.83 0 1.5-.67 1.5-1.5S15.33 6 14.5 6 13 6.67 13 7.5 13.67 9 14.5 9zM5.5 9c0-.83-.67-1.5-1.5-1.5S2.5 8.17 2.5 9v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V9zm13 0c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span>Installa su Android</span>
            </button>

            <!-- iOS Button -->
            <button 
              class="pwa-btn pwa-btn-ios"
              @click="installIOS"
              aria-label="Installa app su iOS"
            >
              <svg class="pwa-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-8L4.992 8H2v12c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2zm-3.5 19c-2.485 0-4.5-2.015-4.5-4.5S12.015 12 14.5 12s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm3.5-9h-2v-2h2v2z"/>
              </svg>
              <span>Installa su iOS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QRCode from 'qrcode.vue';

export default defineComponent({
  name: 'QRCodeModal',
  components: {
    'qr-code': QRCode,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    qrCodeUrl: {
      type: String,
      default: 'https://app.example.com', // URL da configurare
    },
  },
  emits: ['close', 'install-android', 'install-ios'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    installAndroid() {
      this.$emit('install-android');
      // Reindirizza a Google Play Store o link APK
      // window.open('https://play.google.com/store/apps/details?id=com.example.app', '_blank');
    },
    installIOS() {
      this.$emit('install-ios');
      // Reindirizza a App Store
      // window.open('https://apps.apple.com/app/id...', '_blank');
    },
  },
});
</script>

<style scoped lang="scss">
.qr-code-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.3s ease;
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }
}

.qr-code-modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: slideUp 0.3s ease;

  @media (max-width: 600px) {
    padding: 24px;
    max-width: 100%;
    margin: 16px;
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

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #666;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
}

.qr-code-section {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #333;
  }

  .qr-description {
    color: #666;
    font-size: 14px;
    margin: 0 0 24px 0;
  }
}

.qr-code-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;

  svg {
    width: 250px;
    height: 250px;
    max-width: 100%;
  }
}

.pwa-section {
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #333;
    text-align: center;
  }
}

.pwa-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.pwa-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  min-height: 100px;
  justify-content: center;

  .pwa-icon {
    width: 32px;
    height: 32px;
  }

  span {
    line-height: 1.2;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}

.pwa-btn-android {
  background: linear-gradient(135deg, #3ddc84 0%, #2bb859 100%);
  color: white;
  border: 2px solid #2bb859;

  &:hover {
    background: linear-gradient(135deg, #4ede98 0%, #23a14f 100%);
  }
}

.pwa-btn-ios {
  background: linear-gradient(135deg, #555555 0%, #222222 100%);
  color: white;
  border: 2px solid #222222;

  &:hover {
    background: linear-gradient(135deg, #666666 0%, #111111 100%);
  }
}
</style>