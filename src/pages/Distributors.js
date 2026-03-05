// Import React and the useState hook for managing state
import React, { useState } from "react";
// Import the CSS file for styling this component
import "../styles/Distributors.css";

// Import distributor logos from the assets folder
import autolekLogo from "../assets/autolek.jpg";
import anupamLogo from "../assets/anupam.jpg";
import jumps from "../assets/jumps.jpg";
import anmol from "../assets/anmol.jpg";
import kubotaLogo from "../assets/kubota.png";
import autozoneLogo from "../assets/autozone.png";
import swarajLogo from "../assets/swaraj.png";
import gbsLogo from "../assets/gbs.png"; 
import mahindraLogo from "../assets/mahindra.png";
import yanmarLogo from "../assets/yanmar.png";
import generacLogo from "../assets/generac.png"; 

// Data array holding information about each distributor
const distributorsData = [
  {
    name: "AUTOLEK",
    details: "Autolek is an Indian company that manufactures auto electric components like starter motors, alternators, and BLDC motors.",
    logo: autolekLogo,
  },
  {
    name: "ANUPAM",
    details: "Anupam Industries is a leading Manufacturer of 'Automotive Electrical Switches' in India.",
    logo: anupamLogo,
  },
  {
    name: "JUMPS",
    details: "Jumps Auto Industries Ltd. manufactures automotive components, including alternators, starter motors, and related sub-assemblies.",
    logo: jumps,
  },
  {
    name: "ANMOL",
    details: "Anmol Auto Electricals is engaged in manufacturing, supplying, exporting, and distributing a wide range of Automotive Electrical Parts.",
    logo: anmol,
  },
  {
    name: "Kubota-EKL",
    details: "Kubota-EKL is committed to building a lasting legacy through a transformative mission of global excellence. We lead in farm mechanization, smart agriculture, advanced construction equipment, and rail mobility solutions.",
    logo: kubotaLogo,
  },
  {
    name: "Autozone",
    details: "Autozone is a trusted distributor of automotive parts and accessories, serving customers with quality and reliability.",
    logo: autozoneLogo,
  },
  {
    name: "Swaraj",
    details: "Swaraj is renowned for powerful, rugged, and reliable tractors, supporting farmers across India with proven agricultural solutions.",
    logo: swarajLogo,
  },
  {
    name: "Mahindra",
    details: "Mahindra is a leading manufacturer of automotive and farm equipment, known for innovation and durability.",
    logo: mahindraLogo,
  },
  {
    name: "GBS",
    details: "Starter & alternator, carbon brushes & spares.",
    logo: gbsLogo,
  },
  {
    name: "Yanmar",
    details: "Yanmar specializes in diesel engines, agricultural machinery, and construction equipment, providing innovative power solutions.",
    logo: yanmarLogo,
  },
  {
    name: "R.B Industries",
    details: "Flywheel rings.",
    // No logo provided for this one
  },
  {
    name: "Generac",
    details: "Generac is a leading manufacturer of power generation equipment and other industrial products.",
    logo: generacLogo,
  }
];

// Main functional component
function Distributors() {
  // State to track which distributor is currently being hovered
  const [hoveredDistributor, setHoveredDistributor] = useState(null);

  return (
    <div className="distributors-container">
      <h1>Distributors & Stockists</h1>

      {/* Grid layout to display all distributor cards */}
      <div className="distributors-grid">
        {distributorsData.map((distributor, index) => (
          <div
            key={index} // Unique key for each element in the list
            className="distributor-card"
            onMouseEnter={() => setHoveredDistributor(distributor)} // Set hovered distributor
            onMouseLeave={() => setHoveredDistributor(null)}       // Reset when mouse leaves
          >
            {/* Show logo if available, otherwise show distributor name */}
            {distributor.logo ? (
              <img
                src={distributor.logo}
                alt={distributor.name}
                className="distributor-logo"
              />
            ) : (
              <h3 className="distributor-name">{distributor.name}</h3>
            )}

            {/* An empty overlay for visual effect (can be styled with CSS) */}
            <div className="overlay"></div>

            {/* Show distributor details only on hover */}
            {hoveredDistributor === distributor && (
              <div className="hover-text">{distributor.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the component so it can be used in other parts of your app
export default Distributors;
