const CATEGORY_LABELS = {
  hair: "Hair",
  body: "Body",
  "hand-cream": "Hand Cream",
  home: "Home",
};

// 향 옵션으로 통합되기 전의 개별 핸드 크림 링크를 그대로 받아준다
const LEGACY_IDS = {
  "hand-cream-white-tea": { id: "hand-cream", scent: "white-tea" },
  "hand-cream-bergamot": { id: "hand-cream", scent: "bergamot" },
  "hand-cream-sandalwood": { id: "hand-cream", scent: "sandalwood" },
};

const params = new URLSearchParams(window.location.search);
const legacy = LEGACY_IDS[params.get("id")];
const id = legacy ? legacy.id : params.get("id");
const initialScent = params.get("scent") ?? legacy?.scent ?? null;
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

  const scents = product.scents ?? null;
  let scentIndex = scents ? Math.max(0, scents.findIndex((s) => s.id === initialScent)) : -1;
  const activeScent = scents ? scents[scentIndex] : null;
  const startDescription = activeScent?.description ?? product.description;
  const startNotes = activeScent?.notes ?? product.notes;
  // 향 옵션이 있으면 선택한 향의 컷만 갤러리에 노출한다
  let gallery = activeScent?.images ?? product.images;

  const buildThumbs = (images) =>
    images
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
      <dd data-detail="${d.label}">${d.value}</dd>
    </div>`
    )
    .join("");

  layout.innerHTML = `
    <div class="pd-gallery">
      <div class="pd-main-image">
        <img src="${gallery[0]}" alt="${product.name}" id="pd-main-img" />
      </div>
      <div class="pd-thumbs" id="pd-thumbs"${gallery.length > 1 ? "" : " hidden"}>${buildThumbs(gallery)}</div>
    </div>

    <div class="pd-info">
      <p class="pd-subtitle">${product.subtitle}</p>
      <h1 class="pd-name">${product.name}</h1>
      <p class="pd-price">${product.price.toLocaleString("ko-KR")}원</p>
      <p class="pd-volume">${product.volume}</p>

      <p class="pd-description">${startDescription}</p>

      ${startNotes ? `
      <div class="pd-scent-pyramid">
        <p class="pd-scent-pyramid-label">Scent Pyramid</p>
        <div class="pd-scent-tier">
          <span class="pd-scent-tier-name">Top</span>
          <span class="pd-scent-bar"><span style="width:36%"></span></span>
          <span class="pd-scent-tier-notes" data-note="top">${startNotes.top}</span>
        </div>
        <div class="pd-scent-tier">
          <span class="pd-scent-tier-name">Middle</span>
          <span class="pd-scent-bar"><span style="width:68%"></span></span>
          <span class="pd-scent-tier-notes" data-note="mid">${startNotes.mid}</span>
        </div>
        <div class="pd-scent-tier">
          <span class="pd-scent-tier-name">Base</span>
          <span class="pd-scent-bar"><span style="width:100%"></span></span>
          <span class="pd-scent-tier-notes" data-note="base">${startNotes.base}</span>
        </div>
      </div>` : ""}

      ${scents ? `
      <div class="pd-volume-selector pd-scent-selector">
        <p class="pd-volume-label">향 선택</p>
        <div class="pd-volume-options">
          ${scents.map((s, i) => `
            <button type="button" class="pd-volume-opt pd-scent-opt${i === scentIndex ? " is-active" : ""}" data-scent-index="${i}">
              ${s.label}
            </button>`).join("")}
        </div>
      </div>` : ""}

      ${product.volumes ? `
      <div class="pd-volume-selector">
        <p class="pd-volume-label">용량 선택</p>
        <div class="pd-volume-options">
          ${product.volumes.map((v, i) => `
            <button type="button" class="pd-volume-opt${i === 0 ? " is-active" : ""}" data-price="${v.price}" data-label="${v.label}"${v.image ? ` data-image="${v.image}"` : ""}>
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
  const mainImgBox = document.querySelector(".pd-main-image");
  const thumbsBox = document.getElementById("pd-thumbs");
  let currentIndex = 0;

  // 정사각 크롭에서 제품이 잘리는 연출컷만 포커스 조정 (없으면 중앙)
  const imageFocus = {
    "diffuser.jpg": "center 65%",
  };

  // 연출컷(jpg)은 정사각으로 꽉 채우고, 누끼컷(png)은 잘리지 않게 contain
  function applyImageFit() {
    const file = decodeURIComponent(mainImg.src.split("/").pop());
    mainImgBox.classList.toggle("is-contain", /\.png$/i.test(file));
    mainImg.style.objectPosition = imageFocus[file] || "center";
  }

  mainImg.addEventListener("load", applyImageFit);
  if (mainImg.complete) applyImageFit();

  function showImage(index) {
    currentIndex = index;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.src = gallery[index];
      mainImg.style.opacity = "1";
    }, 180);
    const thumbs = [...thumbsBox.querySelectorAll(".pd-thumb")];
    thumbs.forEach((b) => b.classList.remove("is-active"));
    if (thumbs[index]) thumbs[index].classList.add("is-active");
  }

  thumbsBox.addEventListener("click", (event) => {
    const btn = event.target.closest(".pd-thumb");
    if (!btn) return;
    clearInterval(cycleTimer);
    showImage(Number(btn.dataset.index));
    if (!scents) cycleTimer = setInterval(nextImage, 3000);
  });

  function nextImage() {
    showImage((currentIndex + 1) % gallery.length);
  }

  let cycleTimer = null;
  // 향 옵션이 있는 제품은 다른 향의 컷으로 자동 전환되면 혼란스러우므로 순환하지 않는다
  if (gallery.length > 1 && !scents) {
    cycleTimer = setInterval(nextImage, 3000);
  }

  // 향 선택
  if (scents) {
    const descEl = document.querySelector(".pd-description");
    const noteEls = {
      top: document.querySelector('[data-note="top"]'),
      mid: document.querySelector('[data-note="mid"]'),
      base: document.querySelector('[data-note="base"]'),
    };
    const ingredientEl = document.querySelector('[data-detail="주요 성분"]');

    document.querySelectorAll(".pd-scent-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        scentIndex = Number(btn.dataset.scentIndex);
        const scent = scents[scentIndex];

        document.querySelectorAll(".pd-scent-opt").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        descEl.textContent = scent.description;
        noteEls.top.textContent = scent.notes.top;
        noteEls.mid.textContent = scent.notes.mid;
        noteEls.base.textContent = scent.notes.base;
        if (ingredientEl) ingredientEl.textContent = scent.ingredient;

        // 갤러리를 선택한 향의 컷으로 교체
        gallery = scent.images;
        thumbsBox.innerHTML = buildThumbs(gallery);
        thumbsBox.hidden = gallery.length < 2;
        showImage(0);
      });
    });
  }

  // volume selector
  if (product.volumes) {
    const priceEl = document.querySelector(".pd-price");
    document.querySelectorAll(".pd-volume-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pd-volume-opt").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        priceEl.textContent = `${Number(btn.dataset.price).toLocaleString("ko-KR")}원`;
        if (btn.dataset.image) {
          clearInterval(cycleTimer);
          mainImg.style.opacity = "0";
          setTimeout(() => {
            mainImg.src = btn.dataset.image;
            mainImg.style.opacity = "1";
          }, 180);
          thumbBtns.forEach((b) => b.classList.remove("is-active"));
        }
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
