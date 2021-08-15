import React, { useEffect, useState, useMemo } from 'react';

export default function useCartQuantity(itemsQuantity) {
  const [numberOfProducts, setNumberOfProducts] = useState('');

  // Calculating all of the items quantity, than the result number will show in the  cart icon

  const updateCartQuantity = useMemo(() => {
    let cartQuantity = itemsQuantity
      .filter(({ Quantity }) => Quantity)
      .reduce((sum, { Quantity }) => sum + Quantity, 0);

    console.log('filter=reduce Hook', cartQuantity);
    if (cartQuantity === 0) setNumberOfProducts('');
    else if (cartQuantity > 99) setNumberOfProducts('99+');
    else setNumberOfProducts(cartQuantity);
  }, [itemsQuantity]);

  return { numberOfProducts, updateCartQuantity };
}
