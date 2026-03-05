import React, { useState } from "react";
import "../styles/Product.css";

// Importing product images
import starterAssembly from "../assets/products/starter-assembly.png";
import alternatorAssembly from "../assets/products/alternator-assembly.png";
import starterSpares from "../assets/products/starter-spares.png";
import alternatorSpares from "../assets/products/alternator-spares.png";
import fuelPumpMotor from "../assets/products/fuel-pump-motor.png";
import starterBushes from "../assets/products/starter-bushes.png";
import combinationSwitches from "../assets/products/combination-switches.png";
import clutchPulleys from "../assets/products/clutch-pulleys.png";
import autoElectricalSpares from "../assets/products/auto-electrical-spares.png";
import relays from "../assets/products/relays.png";
import flyWheelRings from "../assets/products/fly-wheel-rings.png";
import brushGears from "../assets/products/brush-gears.png";
import carbonBrushes from "../assets/products/carbon-brushes.png";
import linkAssy from "../assets/products/link-assy.png";
import electronicFlashers from "../assets/products/electronic-flashers.png";
import bushes from "../assets/products/bushes.png";
import fuse from "../assets/products/fuse.png";
import fuseCarrier from "../assets/products/fusecarrier.png";
import suspensionItem from "../assets/products/suspensionitem.png";
import wiper from "../assets/products/wiper.png";
import gearbox from "../assets/products/gearbox.png";
import headlight from "../assets/products/headlight.png";
import carbonBrushRocker from "../assets/products/carbonbush.png";
import boleroClutchPipe from "../assets/products/bolero.png";
import airFilterCap from "../assets/products/airfilter.png";

// Array of product objects
const products = [
  { id: 1, name: "Starter Assembly", image: starterAssembly, price: 1200 },
  { id: 2, name: "Alternator Assembly", image: alternatorAssembly, price: 1500 },
  { id: 3, name: "Starter Spares", image: starterSpares, price: 850 },
  { id: 4, name: "Alternator Spares", image: alternatorSpares, price: 900 },
  { id: 5, name: "Fuel Pump Motor", image: fuelPumpMotor, price: 1350 },
  { id: 6, name: "Starter Bushes", image: starterBushes, price: 600 },
  { id: 7, name: "Combination Switches", image: combinationSwitches, price: 700 },
  { id: 8, name: "Clutch Pulleys", image: clutchPulleys, price: 950 },
  { id: 9, name: "Auto Electrical Spares", image: autoElectricalSpares, price: 1100 },
  { id: 10, name: "Relays", image: relays, price: 400 },
  { id: 11, name: "Fly Wheel Rings", image: flyWheelRings, price: 1000 },
  { id: 12, name: "Brush Gears", image: brushGears, price: 750 },
  { id: 13, name: "Carbon Brushes", image: carbonBrushes, price: 500 },
  { id: 14, name: "Link Assy", image: linkAssy, price: 650 },
  { id: 15, name: "Electronic Flashers", image: electronicFlashers, price: 550 },
  { id: 16, name: "Bushes (MSP/STAR/SSP)", image: bushes, price: 800 },
  { id: 17, name: "Fuse", image: fuse, price: 150 },
  { id: 18, name: "Fuse Carrier", image: fuseCarrier, price: 250 },
  { id: 19, name: "Suspension Item", image: suspensionItem, price: 1600 },
  { id: 20, name: "Wiper", image: wiper, price: 300 },
  { id: 21, name: "Gearbox", image: gearbox, price: 4500 },
  { id: 22, name: "Headlight", image: headlight, price: 2200 },
  { id: 23, name: "Carbon Brush Rocker", image: carbonBrushRocker, price: 400 },
  { id: 24, name: "Bolero Clutch Pipe", image: boleroClutchPipe, price: 350 },
  { id: 25, name: "Air Filter Cap", image: airFilterCap, price: 280 },
];

const ProductList = ({ updateCartCount }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if product already exists
    const existing = existingCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    // Show toast
    setToastMessage(`${product.name} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Update cart count if callback provided
    if (updateCartCount) updateCartCount();
  };

  return (
    <div className="product-page">
      <h2 className="section-title">Our Products</h2>

      {/* Toast notification */}
      {showToast && <div className="toast-message">{toastMessage}</div>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;