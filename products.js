const productTabs = [...document.querySelectorAll(".category-tab")];
const productCards = [...document.querySelectorAll("[data-product-grid] .product-card")];
const shopCount = document.querySelector("[data-shop-count]");
const shopEmpty = document.querySelector("[data-shop-empty]");
const shopTitle = document.querySelector("[data-shop-title]");

const VALID_FILTERS = new Set(productTabs.map((tab) => tab.dataset.filter));

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

const applyFilter = (filter, { updateUrl = true } = {}) => {
  let visible = 0;

  productCards.forEach((card) => {
    const show = matchesFilter(card, filter);
    card.hidden = !show;
    if (show) {
      visible += 1;
    }
  });

  productTabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.filter === filter));
  });

  if (shopTitle) {
    shopTitle.textContent = CATEGORY_TITLES[filter] ?? "All";
  }

  if (shopCount) {
    shopCount.textContent = `${visible}개의 제품`;
  }

  if (shopEmpty) {
    shopEmpty.hidden = visible !== 0;
  }

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", filter);
    }
    window.history.replaceState({}, "", url);
  }
};

productTabs.forEach((tab) => {
  tab.addEventListener("click", () => applyFilter(tab.dataset.filter));
});

const initialFilter = new URLSearchParams(window.location.search).get("category");
applyFilter(VALID_FILTERS.has(initialFilter) ? initialFilter : "all", { updateUrl: false });
