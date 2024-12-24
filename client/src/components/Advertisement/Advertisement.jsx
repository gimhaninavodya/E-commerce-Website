import React, { useState, useEffect } from "react";
import "./Advertisement.css";
import ad1 from "../../assets/ad1.png";
import ad2 from "../../assets/ad2.png";
import ad3 from "../../assets/ad3.png"
import ad4 from "../../assets/ad4.png"
import ad5 from "../../assets/ad5.png"

const Advertisement = () => {
  // Ads data
  const ads = [
    {image: ad1,},
    {image: ad2,},
    {image: ad3,},
    {image: ad4,},
    {image: ad5,},
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Ad change logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000); // Swap ads every 5 seconds

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="ads-slider">
      <div className="ads-content">
        <img
          className="ad-image"
          src={ads[currentAdIndex].image}
          alt={`Ad ${currentAdIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default Advertisement;
