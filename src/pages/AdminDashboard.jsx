import React, { useState, useEffect } from 'react';

const ADMIN_EXCLUSIVE_ART = [
  { id: 101, title: 'Cyber Bloom', artist: 'Studio ArtPop', price: '$420', category: 'Digital', image: '/Art6.png' },
  { id: 102, title: 'Cosmic Echo', artist: 'Devin Cole', price: '$350', category: 'Modern', image: '/Art7.png' },
  { id: 103, title: 'Ethereal Motion', artist: 'Aria Thorne', price: '$490', category: 'Pop Art', image: '/Art8.png' }
];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState('/Art6.png');

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('users')) || []);
    const storedArt = JSON.parse(localStorage.getItem('artworks')) || [];
    setArtworks(storedArt);
  }, []);

  const handleAddArtwork = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      title: newTitle,
      artist: newArtist,
      price: `$${newPrice}`,
      category: newCategory || 'General',
      image: selectedImage
    };

    const updated = [...artworks, item];
    setArtworks(updated);
    localStorage.setItem('artworks', JSON.stringify(updated));

    setNewTitle('');
    setNewArtist('');
    setNewPrice('');
    setNewCategory('');
  };

  const handleQuickPublish = (preset) => {
    const updated = [...artworks, { ...preset, id: Date.now() }];
    setArtworks(updated);
    localStorage.setItem('artworks', JSON.stringify(updated));
  };

  const handleDeleteArtwork = (id) => {
    const updated = artworks.filter((item) => item.id !== id);
    setArtworks(updated);
    localStorage.setItem('artworks', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>Admin Control Center</h2>
      <p>Manage store inventory, quick-publish inventory photos (Art6 - Art8), and oversee users.</p>

      {/* Admin Quick Publish Presets */}
      <div className="card admin" style={{ marginTop: '20px' }}>
        <h3>Quick Publish Exclusive Admin Works</h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
          One-click deploy pre-configured Art pieces directly into the live customer gallery:
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {ADMIN_EXCLUSIVE_ART.map((preset) => (
            <div key={preset.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <img src={preset.image} alt={preset.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
              <div>
                <strong style={{ fontSize: '13px' }}>{preset.title}</strong>
                <p style={{ fontSize: '12px', color: '#64748b' }}>{preset.price}</p>
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ fontSize: '12px', padding: '5px 10px' }}
                onClick={() => handleQuickPublish(preset)}
              >
                + Add to Store
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Add Form */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Create Custom Artwork Listing</h3>
        <form onSubmit={handleAddArtwork} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginTop: '12px' }}>
          <input placeholder="Artwork Title" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <input placeholder="Artist Name" required value={newArtist} onChange={(e) => setNewArtist(e.target.value)} />
          <input placeholder="Price (USD)" type="number" required value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
          <input placeholder="Category" required value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          
          <select
            value={selectedImage}
            onChange={(e) => setSelectedImage(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
          >
            <option value="/Art1.png">Art1.png</option>
            <option value="/Art2.png">Art2.png</option>
            <option value="/Art3.png">Art3.png</option>
            <option value="/Art4.png">Art4.png</option>
            <option value="/Art5.png">Art5.png</option>
            <option value="/Art6.png">Art6.png</option>
            <option value="/Art7.png">Art7.png</option>
            <option value="/Art8.png">Art8.png</option>
          </select>

          <button type="submit" className="btn-primary">Save Artwork</button>
        </form>
      </div>

      {/* Live Catalog Table */}
      <h3 style={{ marginTop: '35px' }}>Current Live Catalog ({artworks.length})</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((art) => (
              <tr key={art.id}>
                <td>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td>{art.title}</td>
                <td>{art.artist}</td>
                <td>{art.category}</td>
                <td>{art.price}</td>
                <td>
                  <button
                    onClick={() => handleDeleteArtwork(art.id)}
                    style={{ background: '#ef4444', color: '#fff', padding: '6px 10px', borderRadius: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Registry Table */}
      <h3 style={{ marginTop: '35px' }}>Registered Customers ({users.length})</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="3">No customers registered yet.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="user-badge">{u.role}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}