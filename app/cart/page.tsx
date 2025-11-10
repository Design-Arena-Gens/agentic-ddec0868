"use client";
import { products } from '@/data/products';
import { getCart, updateQty, removeFromCart, clearCart } from '@/utils/cart';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [version, setVersion] = useState(0);
  const cartItems = useMemo(() => getCart(), [version]);
  const enriched = cartItems.map((c) => ({
    ...c,
    product: products.find((p) => p.id === c.id)!,
  })).filter((x) => x.product);

  const total = enriched.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0">Your Cart</h1>
        {enriched.length > 0 && (
          <button className="btn btn-outline-secondary btn-sm" onClick={() => { clearCart(); setVersion((v)=>v+1); }}>Clear Cart</button>
        )}
      </div>

      {enriched.length === 0 ? (
        <div className="alert alert-info">Your cart is empty. Browse the <Link href="/shop">shop</Link>.</div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <ul className="list-group">
              {enriched.map((item) => (
                <li key={item.id} className="list-group-item d-flex align-items-center gap-3">
                  <img src={item.product.imageUrl} alt={item.product.name} style={{width:72, height:72, objectFit:'cover', borderRadius:8}} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>{item.product.name}</strong>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <label className="text-secondary small">Qty</label>
                      <input type="number" min={1} value={item.quantity}
                        onChange={(e) => { updateQty(item.id, Math.max(1, Number(e.target.value))); setVersion((v)=>v+1); }}
                        className="form-control" style={{ width: 90 }} />
                      <button className="btn btn-outline-danger btn-sm ms-auto" onClick={() => { removeFromCart(item.id); setVersion((v)=>v+1); }}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="h5">Order Summary</h2>
                <div className="d-flex justify-content-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between text-secondary"><span>Shipping</span><span>Calculated at checkout</span></div>
                <hr />
                <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <Link href="/checkout" className="btn btn-brand w-100 mt-3">Proceed to Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
