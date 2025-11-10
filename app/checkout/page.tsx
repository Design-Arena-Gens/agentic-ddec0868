"use client";
import { products } from '@/data/products';
import { getCart, clearCart } from '@/utils/cart';
import { useMemo } from 'react';

export default function CheckoutPage() {
  const cart = useMemo(() => getCart(), []);
  const enriched = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id)! })).filter(Boolean);
  const total = enriched.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const publicKey = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || '';

  function pay() {
    if (!publicKey) {
      alert('Payment key not configured.');
      return;
    }
    // @ts-ignore
    const handler = window.FlutterwaveCheckout({
      public_key: publicKey,
      tx_ref: 'AIPS-' + Date.now(),
      amount: Number(total.toFixed(2)),
      currency: 'USD',
      payment_options: 'card,account,banktransfer,ussd',
      customer: {
        email: 'customer@example.com',
        name: 'AIPS Customer',
      },
      customizations: {
        title: 'AIPS Order',
        description: 'Eco-friendly packaging',
        logo: '/logo.svg',
      },
      callback: function () {
        clearCart();
        alert('Payment successful. Thank you!');
        window.location.href = '/';
      },
      onclose: function () {},
    });
  }

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">Checkout</h1>
      {enriched.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <ul className="list-group">
              {enriched.map((i) => (
                <li key={i.id} className="list-group-item d-flex justify-content-between">
                  <span>{i.product.name} ? {i.quantity}</span>
                  <span>${(i.product.price * i.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
                <button className="btn btn-brand w-100" onClick={pay}>Pay with Flutterwave</button>
                <p className="text-secondary small mt-2">Test mode: configure NEXT_PUBLIC_FLW_PUBLIC_KEY</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
