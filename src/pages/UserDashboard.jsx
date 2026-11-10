import React, { useState, useEffect } from 'react';

const INITIAL_ARTWORKS = [
  { id: 1, title: 'Prismatic Vision', artist: 'Elena Ray', price: 220, category: 'Modern', image: '/Art1.png' },
  { id: 2, title: 'Urban Rhythm', artist: 'K. Patel', price: 180, category: 'Pop Art', image: '/Art2.png' },
  { id: 3, title: 'Golden Reverie', artist: 'Hasini U.', price: 310, category: 'Minimalism', image: '/Art3.png' },
  { id: 4, title: 'Neon Horizon', artist: 'Marcus Vance', price: 260, category: 'Abstract', image: '/Art4.png' },
  { id: 5, title: 'Solitude in Blue', artist: 'Sophia Lin', price: 195, category: 'Impressionism', image: '/Art5.png' }
];

export default function UserDashboard({ currentUser }) {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || [];
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem(`fav_${currentUser.email}`)) || [];
  });

  useEffect(() => {
    const storedArt = JSON.parse(localStorage.getItem('artworks'));
    if (!storedArt || storedArt.length === 0) {
      localStorage.setItem('artworks', JSON.stringify(INITIAL_ARTWORKS));
      setArtworks(INITIAL_ARTWORKS);
    } else {
      setArtworks(storedArt);
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(newCart));
  };

  const handleAddToCart = (art) => {
    const existingIndex = cart.findIndex((item) => item.id === art.id);
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].qty += 1;
    } else {
      const numericPrice = typeof art.price === 'string' ? parseFloat(art.price.replace('$', '')) : art.price;
      updatedCart = [...cart, { ...art, price: numericPrice, qty: 1 }];
    }
    saveCart(updatedCart);
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
      .filter((item) => item.qty > 0);
    saveCart(updatedCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Order Placed Successfully!\nTotal: $${subtotal}\nA confirmation has been simulated for ${currentUser.email}.`);
    saveCart([]);
    setIsCartOpen(false);
  };

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem(`fav_${currentUser.email}`, JSON.stringify(updated));
  };

  const categories = ['All', 'Modern', 'Pop Art', 'Minimalism', 'Abstract', 'Impressionism'];

  const filteredArtworks = artworks.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.artist.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="container" style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2>ArtPop Gallery</h2>
          <p>Welcome back, <strong>{currentUser.name}</strong>!</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search art or artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '220px', padding: '8px 12px', borderRadius: '6px', border: '1.5px solid #cbd5e1' }}
          />

          <button onClick={() => setIsCartOpen(true)} className="cart-badge-btn">
            🛒 Cart ({totalCartCount})
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', margin: '20px 0', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1.5px solid #245b63',
              background: selectedCategory === cat ? '#245b63' : 'transparent',
              color: selectedCategory === cat ? '#ffffff' : '#245b63',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '20px'
        }}
      >
        {filteredArtworks.map((art) => (
          <div 
            key={art.id} 
            className="card"
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderRadius: '8px', background: '#f1f5f9' }}>
              <img
                src={art.image}
                alt={art.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            
            <div style={{ marginTop: '12px', flexGrow: 1 }}>
              <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                {art.category}
              </span>
              <h3 style={{ marginTop: '8px', fontSize: '18px', color: '#1e293b' }}>{art.title}</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>Artist: {art.artist}</p>
              <p style={{ fontWeight: 'bold', margin: '8px 0', fontSize: '18px', color: '#245b63' }}>
                ${typeof art.price === 'string' ? art.price.replace('$', '') : art.price}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                onClick={() => handleAddToCart(art)}
                className="btn-primary"
                style={{ flex: 1, padding: '10px', fontSize: '14px', borderRadius: '6px' }}
              >
                + Add to Cart
              </button>
              <button
                onClick={() => toggleFavorite(art.id)}
                className={favorites.includes(art.id) ? "btn-primary" : "btn-outline"}
                style={{ padding: '8px 14px', borderRadius: '6px' }}
                title="Save to favorites"
              >
                {favorites.includes(art.id) ? '♥' : '♡'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <h3>Shopping Bag ({totalCartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '60px', color: '#64748b' }}>
                <p style={{ fontSize: '36px', marginBottom: '10px' }}>🛍️</p>
                <p>Your bag is empty.</p>
              </div>
            ) : (
              <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <p>${item.price} each</p>
                    </div>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '15px', borderRadius: '6px' }}
                >
                  Proceed to Checkout (${subtotal})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}