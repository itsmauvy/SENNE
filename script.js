const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroEyebrow = document.querySelector("[data-hero-eyebrow]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroText = document.querySelector("[data-hero-text]");
const wishlistButtons = document.querySelectorAll(".wishlist-button");
const storyCards = document.querySelectorAll("[data-story-card]");
const storyCarousel = document.querySelector("[data-story-carousel]");

const heroCopy = [
  {
    eyebrow: "",
    title: "리페어 헤어 마스크",
    text: "물기를 머금은 모발에 깊은 영양과<br />부드러운 윤기를 남깁니다",
  },
  {
    eyebrow: "",
    title: "센느 바디 워시",
    text: "부드러운 거품과 잔잔한 향으로<br />하루의 긴장을 씻어냅니다",
  },
];

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

if (heroSlides.length > 1) {
  let activeSlide = 0;

  window.setInterval(() => {
    heroSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add("is-active");

    const copy = heroCopy[activeSlide];
    if (copy && heroEyebrow && heroTitle && heroText) {
      heroEyebrow.textContent = copy.eyebrow;
      heroTitle.innerHTML = copy.title;
      heroText.innerHTML = copy.text;
    }
  }, 4200);
}

wishlistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isPressed = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isPressed));
    button.setAttribute("aria-label", isPressed ? "찜하기" : "찜 취소");
    button.textContent = isPressed ? "♡" : "♥";
  });
});

storyCards.forEach((card) => {
  const slides = [...card.querySelectorAll(".story-slide")];
  const dots = [...card.querySelectorAll(".story-dots span")];
  const prevButton = card.querySelector("[data-story-prev]");
  const nextButton = card.querySelector("[data-story-next]");
  let activeIndex = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let isDragging = false;

  const showSlide = (nextIndex) => {
    slides[activeIndex].classList.remove("is-active");
    dots[activeIndex]?.classList.remove("is-active");
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides[activeIndex].classList.add("is-active");
    dots[activeIndex]?.classList.add("is-active");
  };

  prevButton?.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));

  card.addEventListener("pointerdown", (event) => {
    if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) {
      return;
    }

    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    card.setPointerCapture(event.pointerId);
  });

  card.addEventListener("pointerup", (event) => {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;
    isDragging = false;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
  });

  card.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  window.setInterval(() => {
    showSlide(activeIndex + 1);
  }, 5200);
});

if (storyCarousel) {
  const track = storyCarousel.querySelector(".story-track");
  const sets = [...storyCarousel.querySelectorAll(".story-set")];
  const dots = [...storyCarousel.querySelectorAll(".story-dots span")];
  const prevButton = storyCarousel.querySelector("[data-carousel-prev]");
  const nextButton = storyCarousel.querySelector("[data-carousel-next]");
  let activeSet = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let isDragging = false;

  const showSet = (nextIndex) => {
    if (!track || sets.length === 0) {
      return;
    }

    sets[activeSet]?.classList.remove("is-active");
    dots[activeSet]?.classList.remove("is-active");
    activeSet = (nextIndex + sets.length) % sets.length;
    track.style.transform = `translateX(-${activeSet * 100}%)`;
    sets[activeSet]?.classList.add("is-active");
    dots[activeSet]?.classList.add("is-active");
  };

  prevButton?.addEventListener("click", () => showSet(activeSet - 1));
  nextButton?.addEventListener("click", () => showSet(activeSet + 1));

  storyCarousel.addEventListener("pointerdown", (event) => {
    if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) {
      return;
    }

    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    storyCarousel.setPointerCapture(event.pointerId);
  });

  storyCarousel.addEventListener("pointerup", (event) => {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;
    isDragging = false;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    showSet(activeSet + (deltaX < 0 ? 1 : -1));
  });

  storyCarousel.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  window.setInterval(() => {
    showSet(activeSet + 1);
  }, 5600);
}
