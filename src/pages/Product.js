const ProductList = () => {
  return (
    <div className="product-page">
      <h2 className="section-title">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
