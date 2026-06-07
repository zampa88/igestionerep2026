/**
 * Servizio per gestire PWA (Progressive Web App)
 */

import type { BeforeInstallPromptEvent } from '@/types/pwa';

class PWAService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private listeners: Set<Function> = new Set();

  constructor() {
    this.initializeBeforeInstallPrompt();
  }

  /**
   * Inizializza l'evento beforeinstallprompt
   */
  private initializeBeforeInstallPrompt() {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.notifyListeners();
    });

    // Rileva quando l'app è installata
    window.addEventListener('appinstalled', () => {
      console.log('PWA installata con successo');
      this.deferredPrompt = null;
    });
  }

  /**
   * Verifica se il dispositivo supporta PWA
   */
  canInstallPWA(): boolean {
    return this.deferredPrompt !== null;
  }

  /**
   * Mostra il prompt di installazione PWA
   */
  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      return outcome === 'accepted';
    } catch (error) {
      console.error('Errore durante l\'installazione PWA:', error);
      return false;
    }
  }

  /**
   * Ottiene lo URL di installazione Android (Google Play Store)
   */
  getAndroidInstallUrl(): string {
    return process.env.VUE_APP_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.example.app';
  }

  /**
   * Ottiene lo URL di installazione iOS (Apple App Store)
   */
  getIOSInstallUrl(): string {
    return process.env.VUE_APP_APP_STORE_URL || 'https://apps.apple.com/app/id...';
  }

  /**
   * Genera URL QR Code per il download dell'app
   */
  generateQRCodeUrl(baseUrl: string): string {
    // Usa un servizio QR Code API (es. qr-server.com)
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(baseUrl)}`;
  }

  /**
   * Verifica se il browser è Safari (iOS)
   */
  isIOS(): boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform)
      ? true
      : navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1;
  }

  /**
   * Verifica se il dispositivo è Android
   */
  isAndroid(): boolean {
    return /Android/.test(navigator.userAgent);
  }

  /**
   * Registra un listener per i cambiamenti PWA
   */
  onPWAStateChange(callback: Function): void {
    this.listeners.add(callback);
  }

  /**
   * Rimuove un listener
   */
  removePWAStateChangeListener(callback: Function): void {
    this.listeners.delete(callback);
  }

  /**
   * Notifica tutti i listener dei cambiamenti
   */
  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.canInstallPWA()));
  }
}

export default new PWAService();
