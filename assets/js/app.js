/**
 * Antalya Kamera Güvenlik - Ana Uygulama Mantığı (Vanilla JS - Yıldırım Hızında)
 * Dinamik İletişim Bağlantıları, SSS Akordeon ve Mobil Menü Yönetimi
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.APP_CONFIG;

  if (!config) {
    console.error('APP_CONFIG bulunamadı! config.js yüklenmiş olmalı.');
    return;
  }

  // 1. Dinamik Telefon Görüntüleme ve Arama Bağlantılarını Bind Et
  bindPhoneElements(config);

  // 2. Dinamik WhatsApp Bağlantılarını Bind Et
  bindWhatsappElements(config);

  // 3. SSS (FAQ) Akordeon Mantığını Çalıştır
  initAccordion();

  // 4. Mobil Menü Toggle Mantığı
  initMobileMenu();

  // 5. Yıl Bilgisini Güncelle
  updateCopyrightYear();
});

/**
 * .js-phone-display ve .js-call-btn elemanlarını günceller
 */
function bindPhoneElements(config) {
  // Telefon Metinlerini Güncelle
  const phoneDisplays = document.querySelectorAll('.js-phone-display');
  phoneDisplays.forEach(el => {
    el.textContent = config.phoneDisplay;
  });

  // Telefon Arama Linklerini Güncelle
  const callButtons = document.querySelectorAll('.js-call-btn');
  callButtons.forEach(btn => {
    btn.setAttribute('href', config.phoneCall);
    btn.setAttribute('aria-label', `Hemen Ara: ${config.phoneDisplay}`);
  });
}

/**
 * .js-wa-btn elemanlarını varsayılan veya özel mesajla günceller
 */
function bindWhatsappElements(config) {
  const waButtons = document.querySelectorAll('.js-wa-btn');
  waButtons.forEach(btn => {
    const customMsg = btn.getAttribute('data-wa-msg');
    const waUrl = config.getWhatsappUrl(customMsg);
    
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.setAttribute('aria-label', 'WhatsApp ile Anlık Fiyat Alın');
  });
}

/**
 * SSS Akordeon Mantığı (Erişilebilir ve Akıcı)
 */
function initAccordion() {
  const accordionButtons = document.querySelectorAll('.js-faq-trigger');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const contentEl = document.getElementById(targetId);
      const icon = btn.querySelector('.faq-icon');

      // Diğer tüm akordeonları kapat (İsteğe bağlı temiz görünüm)
      accordionButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherTarget = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherTarget) {
            otherTarget.classList.add('hidden');
          }
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      // Mevcut durumu değiştir
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (contentEl) contentEl.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (contentEl) contentEl.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/**
 * Mobil Menü Aç/Kapat
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menuContainer = document.getElementById('mobile-menu');

  if (toggleBtn && menuContainer) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = menuContainer.classList.contains('hidden');
      if (isHidden) {
        menuContainer.classList.remove('hidden');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        menuContainer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Linke tıklandığında menüyü kapat
    const mobileNavLinks = menuContainer.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuContainer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Telif Hakları Yıl Bilgisi
 */
function updateCopyrightYear() {
  const yearSpan = document.getElementById('js-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
