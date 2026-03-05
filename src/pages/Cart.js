// Import React and necessary hooks
import React, { useEffect, useState } from "react";
// Import the CSS styling for the Cart page
import "../styles/Cart.css";

// Define the Cart component and accept `updateCartCount` as a prop from the parent
function Cart({ updateCartCount }) {
  // State to hold cart items fetched from localStorage
  const [cartItems, setCartItems] = useState([]);

  // useEffect runs once after component mounts to fetch items from localStorage
  useEffect(() => {
    // Get cart items from localStorage and parse them (or default to empty array)
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items); // Set the items to state
  }, []);

  // Function to remove an item from the cart based on its ID
  const removeFromCart = (id) => {
    // Filter out the item to be removed
    const updatedItems = cartItems.filter((item) => item.id !== id);
    
    // Update localStorage and state with new cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);

    // If the parent component passed updateCartCount, call it to sync count
    if (updateCartCount) updateCartCount();
  };

  // Calculate the total amount by summing price × quantity of each item
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // JSX to render the cart
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* Conditional rendering: If no items, show empty cart message */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        // If items exist, render the cart table
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Subtotal (₹)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through each item to display its data */}
            {cartItems.map(({ id, name, price, image, quantity }) => (
              <tr key={id}>
                <td>
                  <img
                    src={image}
                    alt={name}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  />
                </td>
                <td>{name}</td>
                <td>{price.toFixed(2)}</td> {/* Price formatted to 2 decimal places */}
                <td>{quantity || 1}</td> {/* Default quantity is 1 if not provided */}
                <td>{(price * (quantity || 1)).toFixed(2)}</td> {/* Subtotal = price × quantity */}
                <td>
                  {/* Delete button to remove item from cart */}
                  <button onClick={() => removeFromCart(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show total amount only if cart is not empty */}
      <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
    </div>
  );
}

// Export the Cart component to be used in other parts of the app
export default Cart;
