export default function ContactPage() {
  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <h1 className="h3 mb-4">Contact Us</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <form className="card p-3" onSubmit={(e)=>{e.preventDefault(); alert('Message sent. Thank you!');}}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input required className="form-control" placeholder="Your name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input required type="email" className="form-control" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea required className="form-control" rows={5} placeholder="How can we help?" />
            </div>
            <button className="btn btn-brand" type="submit">Send Message</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Company Details</h2>
              <p className="mb-1"><strong>All In Packaging Solution (AIPS)</strong></p>
              <p className="text-secondary">Eco-friendly packaging ? Safety & Clean</p>
              <div className="small text-secondary">
                <div>Email: contact@aips.example</div>
                <div>Phone: +1 (555) 123-4567</div>
                <div>Address: 123 Green Way, Clean City</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
