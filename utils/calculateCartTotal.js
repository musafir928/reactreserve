import { Accordion } from "semantic-ui-react";

function calculateCartTotal(products) {
  const total = products.reduce((s, e) => {
    s += e.product.price * e.quantity;
    return s;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
}

export default calculateCartTotal;
