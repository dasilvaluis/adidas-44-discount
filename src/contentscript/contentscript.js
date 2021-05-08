function AdidasDiscount() {
  const DISCOUNT = .44;

  function applyPromotion(price) {
    return Math.round(price * (1 - DISCOUNT) * 100)/100;
  }

  function matchPrice(rawPrice) {
    return /\d+([\.|\,]\d+)?/g.exec(rawPrice);
  }
  
  function parsePrice(rawPrice){
    const priceString = rawPrice.replace(',', '.');
    const parsedNumber = parseFloat(priceString, 10);
    
    return parsedNumber;
  }
  
  function searchAndReplacePrices() {
    const promoNote = `${DISCOUNT * 100}% DISCOUNT`;
  
    document.querySelectorAll('.gl-price-item').forEach((priceEl) => {
      if (
        priceEl.className.indexOf('gl-price-item--sale') !== -1 ||
        priceEl.className.indexOf('gl-price-item--crossed') !== -1 ||
        priceEl.innerHTML.indexOf(promoNote) !== -1
      ) {
        return;
      }
      
      const originalPriceLabel = priceEl.innerHTML;

      if (matchPrice(originalPriceLabel)) {
        const originalPrice = parsePrice(originalPriceLabel);
        const finalPrice = applyPromotion(originalPrice);
  
        const finalPriceLabel = originalPriceLabel.replace(new RegExp(originalPrice, "g"), finalPrice);
    
        if (originalPrice) {
          priceEl.innerHTML = `
            <span class="gl-price-item gl-price-item--sale">${finalPriceLabel}</span>
            <span class="gl-price--s">
              <span class="gl-price-item gl-price-item--crossed">
                ${originalPriceLabel}
              </span>&nbsp;
              ${promoNote}
            </span>`;
        }
      }
    });
  }

  return { searchAndReplacePrices };
}

(() => {
  const inAdidasOrReebok = /^www\.(adidas|reebok)\..+$/.test(window.location.host);

  if (inAdidasOrReebok) {
    const { searchAndReplacePrices } = AdidasDiscount()
    window.onscroll = searchAndReplacePrices;
  
    searchAndReplacePrices();
  }
})();