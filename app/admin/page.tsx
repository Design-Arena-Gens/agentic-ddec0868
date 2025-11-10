"use client";
import { products as seedProducts, type Product } from '@/data/products';
import { useEffect, useMemo, useState } from 'react';

const KEY = 'aips_products_v1';
const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

function loadProducts(): Product[] {
  if (typeof window === 'undefined') return seedProducts;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Product[]) : seedProducts;
  } catch {
    return seedProducts;
  }
}

function saveProducts(list: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(ADMIN_PW === '' ? true : false);
  const [pw, setPw] = useState('');
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => { setProducts(loadProducts()); }, []);

  function authenticate(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PW) setAuthed(true);
    else alert('Invalid password');
  }

  function startEdit(p: Product) { setEditing({ ...p }); }
  function cancelEdit() { setEditing(null); }
  function commitEdit() {
    if (!editing) return;
    const next = products.map((p) => (p.id === editing.id ? editing : p));
    setProducts(next);
    saveProducts(next);
    setEditing(null);
  }
  function addNew() {
    const newid = 'prod-' + Math.random().toString(36).slice(2, 8);
    const p: Product = { id: newid, name: 'New Product', description: 'Description', price: 1, imageUrl: 'https://via.placeholder.com/800x600', category: 'Cups' };
    const next = [p, ...products];
    setProducts(next);
    saveProducts(next);
  }
  function remove(id: string) {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveProducts(next);
  }

  const summary = useMemo(() => ({ count: products.length, avg: products.reduce((s,p)=>s+p.price,0)/products.length || 0 }), [products]);

  if (!authed) {
    return (
      <div className="container py-5" style={{ maxWidth: 480 }}>
        <h1 className="h4 mb-3">Admin Login</h1>
        <form onSubmit={authenticate} className="card p-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={pw} onChange={(e)=>setPw(e.target.value)} />
          <button className="btn btn-brand mt-3" type="submit">Login</button>
          <p className="text-secondary small mt-2">Set NEXT_PUBLIC_ADMIN_PASSWORD for protection.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0">Admin Dashboard</h1>
        <button className="btn btn-brand" onClick={addNew}>Add Product</button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card"><div className="card-body"><div className="text-secondary small">Products</div><div className="h4 mb-0">{summary.count}</div></div></div>
        </div>
        <div className="col-md-4">
          <div className="card"><div className="card-body"><div className="text-secondary small">Average Price</div><div className="h4 mb-0">${summary.avg.toFixed(2)}</div></div></div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th style={{width:220}}>Actions</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.imageUrl} alt={p.name} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6 }} /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>startEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="card p-3 mt-4">
          <h2 className="h5">Edit Product</h2>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={editing.name} onChange={(e)=>setEditing({...editing, name:e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select className="form-select" value={editing.category} onChange={(e)=>setEditing({...editing, category:e.target.value as any})}>
                <option value="Cups">Cups</option>
                <option value="Boxes">Boxes</option>
                <option value="Containers">Containers</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={editing.description} onChange={(e)=>setEditing({...editing, description:e.target.value})} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input type="number" step="0.01" className="form-control" value={editing.price} onChange={(e)=>setEditing({...editing, price:Number(e.target.value)})} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input className="form-control" value={editing.imageUrl} onChange={(e)=>setEditing({...editing, imageUrl:e.target.value})} />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-brand" onClick={commitEdit}>Save</button>
            <button className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
