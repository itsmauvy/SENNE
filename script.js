const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
if (parallaxEls.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const updateParallax = () => {
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the section enters from the bottom, 1 as it leaves past the top
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const range = rect.height * 0.3;
      el.style.setProperty("--parallax", `${((0.5 - progress) * range).toFixed(1)}px`);
    });
  };
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateParallax);
  updateParallax();
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroEyebrow = document.querySelector("[data-hero-eyebrow]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroText = document.querySelector("[data-hero-text]");
const wishlistButtons = document.querySelectorAll(".wishlist-button");
const storyCards = document.querySelectorAll("[data-story-card]");
const storyCarousel = document.querySelector("[data-story-carousel]");
const topBannerMessages = [...document.querySelectorAll(".top-banner-message")];

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

if (topBannerMessages.length > 1) {
  let activeBanner = 0;

  window.setInterval(() => {
    topBannerMessages[activeBanner].classList.remove("is-active");
    activeBanner = (activeBanner + 1) % topBannerMessages.length;
    topBannerMessages[activeBanner].classList.add("is-active");
  }, 3200);
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

const searchOpeners = [...document.querySelectorAll("[data-search-open]")];
const searchOverlay = document.querySelector("#search-overlay");

if (searchOverlay && searchOpeners.length) {
  const searchInput = searchOverlay.querySelector("[data-search-input]");
  const searchResults = searchOverlay.querySelector("[data-search-results]");
  const searchClose = searchOverlay.querySelector("[data-search-close]");

  const searchData = [
    { name: "헤어 미스트", keywords: "hair mist 헤어미스트 미스트", price: "28,000원", category: "hair", label: "Hair" },
    { name: "헤어 오일", keywords: "hair oil 헤어오일 오일", price: "32,000원", category: "hair", label: "Hair" },
    { name: "리페어 헤어 마스크", keywords: "repair hair mask 헤어마스크 마스크", price: "38,000원", category: "hair", label: "Hair" },
    { name: "센느 바디 워시", keywords: "body wash 바디워시 워시", price: "34,000원", category: "body", label: "Body" },
    { name: "센느 바디 로션", keywords: "body lotion 바디로션 로션", price: "36,000원", category: "body", label: "Body" },
    { name: "핸드 크림 화이트 티", keywords: "hand cream white tea 핸드크림 화이트티", price: "26,000원", category: "hand-cream", label: "Hand Cream" },
    { name: "핸드 크림 베르가못", keywords: "hand cream bergamot 핸드크림 베르가못", price: "26,000원", category: "hand-cream", label: "Hand Cream" },
    { name: "핸드 크림 샌달우드", keywords: "hand cream sandalwood 핸드크림 샌달우드", price: "26,000원", category: "hand-cream", label: "Hand Cream" },
    { name: "핸드 크림 트리오 세트", keywords: "hand cream trio set 핸드크림 트리오 세트", price: "68,000원", category: "hand-cream", label: "Hand Cream" },
    { name: "센티드 캔들", keywords: "scented candle 센티드캔들 캔들", price: "42,000원", category: "home", label: "Home" },
    { name: "리드 디퓨저", keywords: "reed diffuser 리드디퓨저 디퓨저", price: "38,000원", category: "home", label: "Home" },
    { name: "룸 미스트", keywords: "room mist 룸미스트 미스트", price: "30,000원", category: "home", label: "Home" },
    { name: "트래블 키트", keywords: "travel kit 트래블키트 키트 세트", price: "58,000원", category: "new", label: "New" },
  ];

  const escapeHtml = (value) =>
    value.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  const renderResults = () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchResults.innerHTML = '<p class="search-hint">제품명을 입력하면 검색 결과가 표시됩니다.</p>';
      return;
    }

    const matches = searchData.filter((item) => {
      const haystack = `${item.name} ${item.keywords}`.toLowerCase();
      return haystack.includes(query);
    });

    if (!matches.length) {
      searchResults.innerHTML = '<p class="search-empty">검색 결과가 없습니다.</p>';
      return;
    }

    searchResults.innerHTML = matches
      .map(
        (item) =>
          `<a class="search-result" href="products.html?category=${item.category}">` +
          `<span class="search-result-meta"><span class="search-result-cat">${item.label}</span>` +
          `<span>${escapeHtml(item.name)}</span></span>` +
          `<span class="search-result-price">${item.price}</span></a>`
      )
      .join("");
  };

  const openSearch = () => {
    searchOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    renderResults();
    window.requestAnimationFrame(() => searchInput.focus());
  };

  const closeSearch = () => {
    searchOverlay.hidden = true;
    document.body.style.overflow = "";
    searchInput.value = "";
    searchResults.innerHTML = "";
  };

  searchOpeners.forEach((opener) => {
    opener.addEventListener("click", (event) => {
      event.preventDefault();
      openSearch();
    });
  });

  searchInput.addEventListener("input", renderResults);
  searchClose?.addEventListener("click", closeSearch);

  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !searchOverlay.hidden) {
      closeSearch();
    }
  });
}
