/**
 * Tipi per la gestione PWA (Progressive Web App)
 */

export interface PWAInstallationOptions {
  appName: string;
  description: string;
  icons: PWAIcon[];
  startUrl: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  themeColor: string;
  backgroundColor: string;
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable';
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> & Event;
}

export interface QRCodeModalProps {
  isOpen: boolean;
  qrCodeUrl: string;
}

export interface AssistantMessage {
  type: 'user' | 'assistant' | 'system';
  text: string;
  timestamp?: Date;
}
