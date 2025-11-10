import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero py-5">
        <div className="container d-flex flex-column flex-lg-row align-items-center gap-4">
          <div className="flex-grow-1">
            <h1 className="display-5 fw-bold text-brand">All In Packaging Solution</h1>
            <p className="lead mb-2">Safety &amp; Clean</p>
            <p className="text-secondary mb-4">
              We provide eco-friendly, clean, and safe packaging solutions?cups, boxes, and containers?
              designed to protect your products and the environment.
            </p>
            <div className="d-flex gap-3">
              <Link href="/shop" className="btn btn-brand btn-lg">Shop Products</Link>
              <Link href="/contact" className="btn btn-outline-secondary btn-lg">Contact Us</Link>
            </div>
          </div>
          <div className="text-center">
            <img src="/logo.svg" alt="AIPS logo" style={{ maxWidth: 320 }} />
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="h3 mb-4">Why choose AIPS?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">Eco-friendly Materials</h3>
                <p className="text-secondary mb-0">Sustainable packaging designed for minimal environmental impact.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">Clean and Safe</h3>
                <p className="text-secondary mb-0">Hygienic solutions that keep your products protected.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5">Reliable Supply</h3>
                <p className="text-secondary mb-0">Consistent quality and timely delivery for your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
