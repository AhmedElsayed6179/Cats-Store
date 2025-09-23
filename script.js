document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     📌 Mobile Navigation Toggle
  ========================== */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* =========================
     📌 Cart Functionality (إضافة منتجات فقط)
  ========================== */
  let cartCount = 0;
  const cartElements = document.querySelectorAll(".add-to-cart");
  const cartDisplay = document.querySelector(".cart-count");

  cartElements.forEach((button) => {
    button.addEventListener("click", function () {
      cartCount++;
      if (cartDisplay) cartDisplay.textContent = cartCount;

      // Feedback Animation
      this.textContent = "Added!";
      this.style.backgroundColor = "#4CAF50";

      setTimeout(() => {
        this.textContent = "Add to Cart";
        this.style.backgroundColor = "";
      }, 1500);
    });
  });

  /* =========================
     📌 Newsletter Form Submission
  ========================== */
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector("input").value;
      const lang = document.documentElement.lang || "ar";

      if (lang === "ar") {
        alert(
          `✅ شكراً لاشتراكك باستخدام ${email}! ستصلك تحديثات القطط قريباً 🐾`
        );
      } else if (lang === "en") {
        alert(
          `✅ Thank you for subscribing with ${email}! You'll receive our cat updates soon 🐾`
        );
      }

      this.reset();
    });
  }
  /* =========================
     📌 Smooth Scrolling
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      if (this.getAttribute("href") === "#") return;

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        if (navMenu) navMenu.classList.remove("active");
      }
    });
  });

  /* =========================
     📌 FAQ Toggle
  ========================== */
  document.querySelectorAll(".faq-question").forEach((q) => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      if (answer) answer.classList.toggle("active");
    });
  });

  /* =========================
     📌 Contact Form Submission
  ========================== */
  const form = document.getElementById("messageForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const lang = document.documentElement.lang || "ar";

      if (lang === "ar") {
        alert("✅ تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا!");
      } else if (lang === "en") {
        alert(
          "✅ Your message has been sent successfully, we will contact you soon!"
        );
      }

      this.reset();
    });
  }
});

/* =========================
   🛒 Cart Sidebar Functionality
========================== */
const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.querySelector(".cart-icon");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.getElementById("cartTotal");

// فتح السلة
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("active");
});

// إغلاق السلة
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// مسح الكل
clearCartBtn.addEventListener("click", () => {
  cartItems.innerHTML = "";
  updateCart();
});

// تحديث العدد والإجمالي
function updateCart() {
  const items = cartItems.querySelectorAll("li");
  let total = 0;

  items.forEach((item) => {
    total += parseFloat(item.getAttribute("data-price")) || 0;
  });

  cartCount.textContent = items.length;
  cartTotal.textContent = total.toFixed(2) + " ج.م";
}

// إضافة منتج
function addToCart(name, price = 100) {
  const li = document.createElement("li");
  li.setAttribute("data-price", price);
  li.innerHTML = `${name} - ${price} EGP <button class="remove-item">❌</button>`;
  cartItems.appendChild(li);
  updateCart();

  // زر الحذف لكل عنصر
  li.querySelector(".remove-item").addEventListener("click", () => {
    li.remove();
    updateCart();
  });
}

// ربط الأزرار "أضف إلى السلة"
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".cat-card, .product-card");
    const name = card.querySelector(".cat-name, .product-name").textContent;
    const priceText = card.querySelector(
      ".cat-price, .product-price"
    ).textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, "")); // استخراج الرقم فقط
    addToCart(name, price);
  });
});

// عداد الإحصائيات
const stats = document.querySelectorAll(".stat-card h3");
stats.forEach((stat) => {
  let target = +stat.textContent.replace(/\D/g, "");
  let count = 0;
  let interval = setInterval(() => {
    count += Math.ceil(target / 100);
    if (count >= target) {
      stat.textContent = "+" + target;
      clearInterval(interval);
    } else {
      stat.textContent = "+" + count;
    }
  }, 30);
});

// JavaScript Lightbox مع التفاصيل
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxTitle = lightbox.querySelector(".lightbox-title");
const lightboxDesc = lightbox.querySelector(".lightbox-desc");
const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxTitle.textContent = img.dataset.title;
    lightboxDesc.textContent = img.dataset.desc;
    lightbox.classList.add("active");
  });
});

// إغلاق Lightbox عند الضغط على الخلفية
lightbox.addEventListener("click", (e) => {
  if (!e.target.closest(".lightbox-content")) {
    lightbox.classList.remove("active");
  }
});

const sections = document.querySelectorAll("section");

function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// Preloader hide after page load
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(() => (preloader.style.display = "none"), 500);
  }, 500);
});

const aboutBtn = document.getElementById("about-btn");
const aboutExtra = document.getElementById("about-extra");

aboutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  aboutExtra.classList.toggle("active");
});

const lang = document.documentElement.lang || "ar";

const blogButtons = document.querySelectorAll(".blog-btn");

blogButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const extra = btn.previousElementSibling;
    extra.classList.toggle("active");

    if (lang === "ar") {
      btn.textContent = extra.classList.contains("active")
        ? "اخفاء التفاصيل"
        : "اقرأ المزيد";
    } else if (lang === "en") {
      btn.textContent = extra.classList.contains("active")
        ? "Hide details"
        : "Read more";
    }
  });
});
