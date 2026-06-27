const CATEGORY_LABELS = {
  hair: "Hair",
  body: "Body",
  "hand-cream": "Hand Cream",
  home: "Home",
};

const id = new URLSearchParams(window.location.search).get("id");
const product = PRODUCTS.find((p) => p.id === id);

if (!product) {
  document.getElementById("pd-not-found").hidden = false;
} else {
  document.title = `SENNE | ${product.name}`;

  renderBreadcrumb();
  renderDetail();
}

function renderBreadcrumb() {
  const nav = document.querySelector("[data-pd-breadcrumb]");
  const catLabel = CATEGORY_LABELS[product.category] ?? "Shop";
  nav.innerHTML = `
    <a href="products.html">Shop</a>
    <span aria-hidden="true">›</span>
    <a href="products.html?category=${product.category}">${catLabel}</a>
    <span aria-hidden="true">›</span>
    <span aria-current="page">${product.name}</span>
  `;
}

function renderDetail() {
  const layout = document.getElementById("pd-layout");

  const thumbsHtml = product.images
    .map(
      (src, i) => `
    <button class="pd-thumb${i === 0 ? " is-active" : ""}" type="button" data-index="${i}" aria-label="이미지 ${i + 1}">
      <img src="${src}" alt="${product.name} 이미지 ${i + 1}" />
    </button>`
    )
    .join("");

  const detailsHtml = product.details
    .map(
      (d) => `
    <div class="pd-detail-row">
      <dt>${d.label}</dt>
      <dd>${d.value}</dd>
    </div>`
    )
    .join("");

  layout.innerHTML = `
    <div class="pd-gallery">
      <div class="pd-main-image">
        <img src="${product.images[0]}" alt="${product.name}" id="pd-main-img" />
      </div>
      ${product.images.length > 1 ? `<div class="pd-thumbs">${thumbsHtml}</div>` : ""}
    </div>

    <div class="pd-info">
      <p class="pd-subtitle">${product.subtitle}</p>
      <h1 class="pd-name">${product.name}</h1>
      <p class="pd-price">${product.price.toLocaleString("ko-KR")}원</p>
      <p class="pd-volume">${product.volume}</p>

      <p class="pd-description">${product.description}</p>

      ${product.volumes ? `
      <div class="pd-volume-selector">
        <p class="pd-volume-label">용량 선택</p>
        <div class="pd-volume-options">
          ${product.volumes.map((v, i) => `
            <button type="button" class="pd-volume-opt${i === 0 ? " is-active" : ""}" data-price="${v.price}" data-label="${v.label}">
              ${v.label}
            </button>`).join("")}
        </div>
      </div>` : ""}

      <div class="pd-actions">
        <div class="pd-qty">
          <button type="button" class="pd-qty-btn" id="pd-qty-minus" aria-label="수량 감소">−</button>
          <span class="pd-qty-val" id="pd-qty-val" aria-live="polite">1</span>
          <button type="button" class="pd-qty-btn" id="pd-qty-plus" aria-label="수량 증가">+</button>
        </div>
        <button type="button" class="pd-cart-btn">장바구니 담기</button>
      </div>
      <button type="button" class="pd-wishlist-btn">♡ 찜하기</button>

      <dl class="pd-details">
        ${detailsHtml}
      </dl>
    </div>
  `;

  // thumbnail switching + auto-cycle
  const mainImg = document.getElementById("pd-main-img");
  const thumbBtns = [...document.querySelectorAll(".pd-thumb")];
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.src = product.images[index];
      mainImg.style.opacity = "1";
    }, 180);
    thumbBtns.forEach((b) => b.classList.remove("is-active"));
    if (thumbBtns[index]) thumbBtns[index].classList.add("is-active");
  }

  thumbBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearInterval(cycleTimer);
      showImage(Number(btn.dataset.index));
      cycleTimer = setInterval(nextImage, 3000);
    });
  });

  function nextImage() {
    showImage((currentIndex + 1) % product.images.length);
  }

  let cycleTimer = null;
  if (product.images.length > 1) {
    cycleTimer = setInterval(nextImage, 3000);
  }

  // volume selector
  if (product.volumes) {
    const priceEl = document.querySelector(".pd-price");
    document.querySelectorAll(".pd-volume-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pd-volume-opt").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        priceEl.textContent = `${Number(btn.dataset.price).toLocaleString("ko-KR")}원`;
      });
    });
  }

  // qty
  let qty = 1;
  const qtyVal = document.getElementById("pd-qty-val");
  document.getElementById("pd-qty-minus").addEventListener("click", () => {
    if (qty > 1) { qty--; qtyVal.textContent = qty; }
  });
  document.getElementById("pd-qty-plus").addEventListener("click", () => {
    qty++;
    qtyVal.textContent = qty;
  });
}

function renderRelated() {
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  if (!related.length) return;

  const section = document.getElementById("pd-related");
  const grid = document.getElementById("pd-related-grid");

  grid.innerHTML = related
    .map(
      (p) => `
    <article class="product-card">
      <div class="product-media">
        <a href="product-detail.html?id=${p.id}" class="product-image image-field"
          role="img" aria-label="${p.name}"
          style="--image: url('${p.images[0]}'); --hover-image: url('${p.images[1] ?? p.images[0]}')">
        </a>
        <button class="wishlist-button" type="button" aria-label="찜하기" aria-pressed="false">♡</button>
      </div>
      <div class="product-info">
        <h3><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
        <span>${p.price.toLocaleString("ko-KR")}원</span>
        <div class="product-actions"><button type="button">장바구니</button></div>
      </div>
    </article>`
    )
    .join("");

  section.hidden = false;
}
