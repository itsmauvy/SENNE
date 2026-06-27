/* SENNE checkout page */
(() => {
  const shop = window.SenneShop;
  if (!shop) return;

  const grid = document.querySelector("[data-checkout-grid]");
  const itemsEl = document.querySelector("[data-checkout-items]");
  const sumProducts = document.querySelector("[data-sum-products]");
  const sumShipping = document.querySelector("[data-sum-shipping]");
  const sumTotal = document.querySelector("[data-sum-total]");
  const payBtn = document.querySelector("[data-checkout-pay]");
  const won = shop.won;

  const render = () => {
    const cart = shop.getCart();

    if (!cart.length) {
      itemsEl.innerHTML = `<p class="checkout-empty">장바구니가 비어 있습니다.</p>`;
      sumProducts.textContent = won(0);
      sumShipping.textContent = won(0);
      sumTotal.textContent = won(0);
      payBtn.disabled = true;
      payBtn.style.opacity = "0.5";
      payBtn.style.cursor = "not-allowed";
      return;
    }

    itemsEl.innerHTML = cart
      .map(
        (i) => `
      <div class="checkout-item">
        <div class="checkout-thumb" style="background-image:url('${i.image}')"></div>
        <div class="checkout-item-info">
          <h3>${i.name}</h3>
          <p>${i.sub || ""}</p>
          <span class="checkout-qty">수량 ${i.qty}</span>
        </div>
        <span class="checkout-item-price">${won(i.price * i.qty)}</span>
      </div>`
      )
      .join("");

    const products = cart.reduce((n, i) => n + i.price * i.qty, 0);
    const shipping = products >= shop.FREE_SHIPPING || products === 0 ? 0 : 3000;
    sumProducts.textContent = won(products);
    sumShipping.textContent = shipping === 0 ? "무료" : won(shipping);
    sumTotal.textContent = won(products + shipping);
  };

  payBtn.addEventListener("click", () => {
    const form = document.querySelector(".checkout-fields");
    const required = [...form.querySelectorAll("input[required]")];
    const missing = required.find((input) => !input.value.trim());
    if (missing) {
      missing.focus();
      missing.style.borderColor = "#9b705f";
      return;
    }

    const orderNo = `SN${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;
    shop.clearCart();

    grid.innerHTML = `
      <div class="checkout-done">
        <span class="checkout-done-mark" aria-hidden="true">✓</span>
        <h2>주문이 완료되었습니다</h2>
        <p>주문번호 <strong>${orderNo}</strong></p>
        <p class="checkout-done-sub">입력하신 정보로 배송 안내를 보내드릴게요.</p>
        <a class="btn-solid" href="products.html">쇼핑 계속하기</a>
      </div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  render();
})();
