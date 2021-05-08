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
      
      const originalPriceHtml = priceEl.innerHTML;
      const priceMatch = matchPrice(originalPriceHtml);

      if (Array.isArray(priceMatch) && priceMatch.length) {
        const rawPrice = priceMatch[0];
        const originalPrice = parsePrice(rawPrice);
        const finalPrice = applyPromotion(rawPrice);
  
        const finalPriceLabel = originalPriceHtml.replace(new RegExp(originalPrice, "g"), finalPrice);
    
        priceEl.innerHTML = `
          <span class="gl-price-item gl-price-item--sale">${finalPriceLabel}</span>
          <span class="gl-price--s">
            <span class="gl-price-item gl-price-item--crossed">
              ${originalPriceHtml}
            </span>&nbsp;
            ${promoNote}
          </span>`;
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