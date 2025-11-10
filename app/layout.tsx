import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Script from 'next/script';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All In Packaging Solution (AIPS)',
  description: 'Eco-friendly, clean, and safe packaging solutions. Safety & Clean.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Header */}
        <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm-sm">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
              <img src="/logo.svg" alt="AIPS logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="nav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/shop">Shop</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/cart">Cart</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/checkout">Checkout</Link></li>
                <li className="nav-item"><Link className="nav-link" href="/contact">Contact</Link></li>
                <li className="nav-item ms-lg-3"><Link className="btn btn-sm btn-brand" href="/admin">Admin</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="footer mt-5 py-4 bg-white">
          <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-2">
              <img src="/logo.svg" alt="AIPS footer logo" style={{ height: 36 }} />
              <span className="text-muted">? {new Date().getFullYear()} AIPS. Safety & Clean.</span>
            </div>
            <div className="text-muted small">Eco-friendly packaging: cups, boxes, containers</div>
          </div>
        </footer>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
