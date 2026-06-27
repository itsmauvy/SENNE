/* SENNE shop — cart drawer, add to bag, login / mypage (mock, localStorage) */
(() => {
  const CART_KEY = "senne-cart";
  const USER_KEY = "senne-user";
  const FREE_SHIPPING = 50000;
  const won = (n) => `${n.toLocaleString("ko-KR")}원`;
  const slugify = (s) => s.trim().toLowerCase().replace(/\s+/g, "-");

  const read = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  let cart = read(CART_KEY, []);
  const saveCart = () => write(CART_KEY, cart);

  /* ---------- DOM injection ---------- */
  const root = document.createElement("div");
  root.innerHTML = `
    <div class="overlay-backdrop" data-backdrop hidden></div>

    <aside class="cart-drawer" data-cart-drawer aria-hidden="true" aria-label="장바구니">
      <header class="cart-head">
        <h2 class="cart-title" data-cart-count>0 ITEMS</h2>
        <button class="icon-close" type="button" data-cart-close aria-label="장바구니 닫기">✕</button>
      </header>
      <p class="cart-ship" data-cart-ship></p>
      <div class="cart-body" data-cart-items></div>
      <footer class="cart-foot">
        <div class="cart-subtotal"><span>SUBTOTAL</span><span data-cart-subtotal>0원</span></div>
        <p class="cart-foot-note">배송비 및 할인은 결제 시 적용됩니다.</p>
        <a class="btn-solid" href="checkout.html" data-cart-checkout>CHECKOUT</a>
      </footer>
    </aside>

    <div class="modal" data-modal="login" aria-hidden="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="로그인">
        <button class="icon-close" type="button" data-modal-close aria-label="닫기">✕</button>
        <p class="modal-eyebrow">SENNE</p>
        <h2 class="modal-title">로그인</h2>
        <form data-login-form>
          <label class="field"><span>이메일</span><input type="email" name="email" required placeholder="hello@senne.care" /></label>
          <label class="field"><span>비밀번호</span><input type="password" name="password" required placeholder="••••••••" /></label>
          <button class="btn-solid" type="submit">로그인</button>
        </form>
        <p class="modal-foot">아직 회원이 아니신가요? <a href="#" data-login-demo>게스트로 시작</a></p>
      </div>
    </div>

  `;
  document.body.appendChild(root);

  const backdrop = root.querySelector("[data-backdrop]");
  const drawer = root.querySelector("[data-cart-drawer]");
  const cartItemsEl = root.querySelector("[data-cart-items]");
  const cartCountEl = root.querySelector("[data-cart-count]");
  const cartShipEl = root.querySelector("[data-cart-ship]");
  const cartSubtotalEl = root.querySelector("[data-cart-subtotal]");
  const modals = [...root.querySelectorAll("[data-modal]")];

  /* ---------- overlay helpers ---------- */
  let openLayer = null;
  const showBackdrop = () => {
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const hideBackdrop = () => {
    backdrop.hidden = true;
    document.body.style.overflow = "";
  };
  const closeAll = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    modals.forEach((m) => {
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden", "true");
    });
    hideBackdrop();
    openLayer = null;
  };
  const openDrawer = () => {
    renderCart();
    showBackdrop();
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    openLayer = "cart";
  };
  const openModal = (name) => {
    const m = modals.find((x) => x.dataset.modal === name);
    if (!m) return;
    showBackdrop();
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    openLayer = name;
  };

  backdrop.addEventListener("click", closeAll);
  root.querySelector("[data-cart-close]").addEventListener("click", closeAll);
  root.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", closeAll));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openLayer) closeAll();
  });

  /* ---------- cart logic ---------- */
  const totalQty = () => cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = () => cart.reduce((n, i) => n + i.price * i.qty, 0);

  const updateBagCount = () => {
    const n = totalQty();
    document.querySelectorAll("[data-bag-count], .cart-button").forEach((el) => {
      el.textContent = `Bag(${n})`;
    });
  };

  const renderCart = () => {
    cartCountEl.textContent = `${cart.length} ITEM${cart.length === 1 ? "" : "S"}`;

    if (!cart.length) {
      cartItemsEl.innerHTML = `<p class="cart-empty">장바구니가 비어 있습니다.</p>`;
    } else {
      cartItemsEl.innerHTML = cart
        .map(
          (i) => `
        <div class="cart-item" data-id="${i.id}">
          <div class="cart-thumb" style="background-image:url('${i.image}')"></div>
          <div class="cart-item-main">
            <div class="cart-item-top">
              <h3>${i.name}</h3>
              <button class="cart-remove" type="button" data-remove aria-label="삭제">✕</button>
            </div>
            <p class="cart-item-sub">${i.sub || ""}</p>
            <div class="cart-item-bottom">
              <div class="stepper">
                <button type="button" data-dec aria-label="수량 감소">−</button>
                <span>${i.qty}</span>
                <button type="button" data-inc aria-label="수량 증가">+</button>
              </div>
              <span class="cart-item-price">${won(i.price * i.qty)}</span>
            </div>
          </div>
        </div>`
        )
        .join("");
    }

    const sub = subtotal();
    cartSubtotalEl.textContent = won(sub);
    const remaining = FREE_SHIPPING - sub;
    cartShipEl.innerHTML =
      sub === 0
        ? "5만원 이상 구매 시 무료배송"
        : remaining > 0
        ? `<strong>${won(remaining)}</strong> 더 구매하면 무료배송`
        : "무료배송 적용 대상입니다 ✓";

    updateBagCount();
  };

  cartItemsEl.addEventListener("click", (e) => {
    const row = e.target.closest(".cart-item");
    if (!row) return;
    const item = cart.find((i) => i.id === row.dataset.id);
    if (!item) return;
    if (e.target.closest("[data-inc]")) item.qty += 1;
    else if (e.target.closest("[data-dec]")) item.qty = Math.max(1, item.qty - 1);
    else if (e.target.closest("[data-remove]")) cart = cart.filter((i) => i.id !== item.id);
    else return;
    saveCart();
    renderCart();
  });

  const addToBag = (product) => {
    const existing = cart.find((i) => i.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    saveCart();
    openDrawer();
  };

  /* ---------- wire product cards ---------- */
  document.querySelectorAll(".product-card").forEach((card) => {
    const btn = card.querySelector(".product-actions button");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const name = card.querySelector("h3")?.textContent.trim() || "제품";
      const priceText = card.querySelector(".product-info span")?.textContent || "0";
      const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10) || 0;
      const media = card.querySelector(".product-image");
      const bg = media ? getComputedStyle(media, "::before").backgroundImage : "";
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      const image = match ? match[1] : "";
      const sub = card.querySelector(".product-info p")?.textContent.trim().slice(0, 22) || "";
      addToBag({ id: slugify(name), name, price, image, sub });
    });
  });

  /* ---------- wire bag + auth triggers ---------- */
  document.querySelectorAll(".cart-button, [data-bag-open]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    })
  );

  const getUser = () => read(USER_KEY, null);
  const refreshAuthUI = () => {
    const user = getUser();
    document.querySelectorAll("[data-login-link]").forEach((a) => {
      a.textContent = user ? "Logout" : "Login";
    });
  };

  document.querySelectorAll("[data-login-link]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (getUser()) {
        localStorage.removeItem(USER_KEY);
        refreshAuthUI();
      } else {
        openModal("login");
      }
    })
  );

  const loginForm = root.querySelector("[data-login-form]");
  const doLogin = (email) => {
    const name = email ? email.split("@")[0] : "Guest";
    write(USER_KEY, { email: email || "guest@senne.care", name, orders: 0 });
    refreshAuthUI();
    closeAll();
  };
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    doLogin(new FormData(loginForm).get("email"));
  });
  root.querySelector("[data-login-demo]").addEventListener("click", (e) => {
    e.preventDefault();
    doLogin("");
  });

  /* ---------- expose for checkout page ---------- */
  window.SenneShop = {
    getCart: () => read(CART_KEY, []),
    clearCart: () => {
      cart = [];
      saveCart();
      renderCart();
    },
    won,
    FREE_SHIPPING,
  };

  /* ---------- init ---------- */
  updateBagCount();
  refreshAuthUI();
})();
