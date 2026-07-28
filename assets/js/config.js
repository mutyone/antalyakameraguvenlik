/**
 * Antalya Kamera Güvenlik - Merkezi İletişim ve Konfigürasyon Dosyası
 * HARDCODED TELEFON / WHATSAPP KULLANIMINI ENGELLEMEK İÇİN MERKEZİ YÖNETİM
 */

const CONFIG = Object.freeze({
  companyName: "Antalya Güvenlik Kamera Sistemleri",
  domain: "https://antalyakameraguvenlik.com",
  phoneDisplay: "0544 423 04 06",
  phoneRaw: "+905444230406",
  phoneCall: "tel:+905444230406",
  whatsappNumber: "905444230406",
  whatsappDefaultMessage: "Merhaba, antalyakameraguvenlik.com üzerinden ulaşıyorum. Güvenlik kamerası montajı, keşif ve anlık fiyat teklifi hakkında bilgi almak istiyorum.",
  email: "info@antalyakameraguvenlik.com",
  address: "Muratpaşa, Antalya / Türkiye",
  workingHours: "Pazartesi - Cumartesi: 08:30 - 20:00 (7/24 Acil Servis Desteği)",
  googleRating: "4.9",
  totalReviews: "340+",
  
  // Sosyal ve Konum
  locationCity: "Antalya",
  serviceDistricts: [
    "Kepez", "Muratpaşa", "Konyaaltı", "Döşemealtı", 
    "Lara", "Aksu", "Serik", "Kemer", "Manavgat", "Alanya"
  ],

  // WhatsApp Link Oluşturucu
  getWhatsappUrl: function(customMessage) {
    const msg = customMessage || this.whatsappDefaultMessage;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
});

// Global erişim için window nesnesine ekle
window.APP_CONFIG = CONFIG;
