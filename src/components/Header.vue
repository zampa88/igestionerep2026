<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="header-left">
        <router-link to="/" class="logo">
          <span class="logo-text">iGestione Rep 2026</span>
        </router-link>
      </div>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Statistics Button (optional) -->
        <button 
          v-if="showStats"
          class="header-btn header-btn-stats"
          @click="goToStats"
          aria-label="Visualizza statistiche"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
          </svg>
          <span>Statistiche</span>
        </button>

        <!-- QR Code Button - ONLY THIS REMAINS FOR DOWNLOAD -->
        <button 
          class="header-btn header-btn-qr"
          @click="openQRModal"
          aria-label="Scarica app tramite QR Code"
          title="Scansiona per installare l'app"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"/>
          </svg>
          <span class="btn-label">Scarica App</span>
        </button>
      </div>
    </div>
  </header>

  <!-- QR Code Modal -->
  <QRCodeModal 
    :is-open="isQRModalOpen"
    :qr-code-url="qrCodeUrl"
    @close="closeQRModal"
    @install-android="handleAndroidInstall"
    @install-ios="handleIOSInstall"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QRCodeModal from './QRCodeModal.vue';

export default defineComponent({
  name: 'Header',
  components: {
    QRCodeModal,
  },
  data() {
    return {
      isQRModalOpen: false,
      qrCodeUrl: process.env.VUE_APP_URL || 'https://app.example.com',
      showStats: true,
    };
  },
  methods: {
    openQRModal() {
      this.isQRModalOpen = true;
    },
    closeQRModal() {
      this.isQRModalOpen = false;
    },
    handleAndroidInstall() {
      // Reindirizza a Google Play Store
      const playStoreUrl = process.env.VUE_APP_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.example.app';
      window.open(playStoreUrl, '_blank');
    },
    handleIOSInstall() {
      // Reindirizza a Apple App Store
      const appStoreUrl = process.env.VUE_APP_APP_STORE_URL || 'https://apps.apple.com/app/id...';
      window.open(appStoreUrl, '_blank');
    },
    goToStats() {
      this.$router.push('/statistics');
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  padding: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;

  .logo-text {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &:hover {
    opacity: 0.9;
  }
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 480px) {
    gap: 8px;
  }
}

.header-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  white-space: nowrap;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;

    svg {
      width: 18px;
      height: 18px;
    }

    .btn-label {
      display: none;
    }
  }
}

.header-btn-qr {
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.5);

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    border-color: white;
  }
}

.header-btn-stats {
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>