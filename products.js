const productTabs = [...document.querySelectorAll(".category-tab")];
const moodTabs = [...document.querySelectorAll(".mood-tab")];
const productCards = [...document.querySelectorAll("[data-product-grid] .product-card")];
const shopCount = document.querySelector("[data-shop-count]");
const shopEmpty = document.querySelector("[data-shop-empty]");
const shopTitle = document.querySelector("[data-shop-title]");

const VALID_FILTERS = new Set(productTabs.map((tab) => tab.dataset.filter));
const VALID_MOODS = new Set(moodTabs.map((tab) => tab.dataset.moodFilter));

const CATEGORY_TITLES = {
  all: "All",
  new: "New",
  hair: "Hair",
  body: "Body",
  "hand-cream": "Hand Cream",
  home: "Home",
};

const matchesFilter = (card, filter) => {
  if (filter === "all") {
    return true;
  }
  return card.dataset.category.split(/\s+/).includes(filter);
};

const matchesMood = (card, mood) => {
  if (mood === "all") {
    return true;
  }
  return (card.dataset.mood ?? "").split(/\s+/).includes(mood);
};

let activeFilter = "all";
let activeMood = "all";

const applyFilters = ({ updateUrl = true } = {}) => {
  let visible = 0;

  productCards.forEach((card) => {
    const show = matchesFilter(card, activeFilter) && matchesMood(card, activeMood);
    card.hidden = !show;
    if (show) {
      visible += 1;
    }
  });

  productTabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.filter === activeFilter));
  });

  moodTabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.moodFilter === activeMood));
  });

  if (shopTitle) {
    shopTitle.textContent = CATEGORY_TITLES[activeFilter] ?? "All";
  }

  if (shopCount) {
    shopCount.textContent = `${visible}개의 제품`;
  }

  if (shopEmpty) {
    shopEmpty.hidden = visible !== 0;
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (activeFilter === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", activeFilter);
    }
    if (activeMood === "all") {
      url.searchParams.delete("mood");
    } else {
      url.searchParams.set("mood", activeMood);
    }
    window.history.replaceState({}, "", url);
  }
};

productTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeFilter = tab.dataset.filter;
    applyFilters();
  });
});

moodTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeMood = tab.dataset.moodFilter;
    applyFilters();
  });
});

const initialParams = new URLSearchParams(window.location.search);
const initialFilter = initialParams.get("category");
const initialMood = initialParams.get("mood");
activeFilter = VALID_FILTERS.has(initialFilter) ? initialFilter : "all";
activeMood = VALID_MOODS.has(initialMood) ? initialMood : "all";
applyFilters({ updateUrl: false });
