"use client";
import { products } from '@/data/products';
import { addToCart } from '@/utils/cart';

export default function ShopPage() {
  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0">Shop Products</h1>
        <span className="text-secondary">Eco-friendly cups, boxes, containers</span>
      </div>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <div className="card h-100">
              <img src={p.imageUrl} className="card-img-top" alt={p.name} />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 mb-0">{p.name}</h3>
                  <span className="badge badge-price">${p.price.toFixed(2)}</span>
                </div>
                <p className="text-secondary small flex-grow-1">{p.description}</p>
                <button className="btn btn-brand mt-2" onClick={() => addToCart(p.id, 1)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
