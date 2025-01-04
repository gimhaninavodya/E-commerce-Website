import React from "react";
import "./Membership.css";
import ms1 from "../../assets/ms1.png";
import ms2 from "../../assets/ms2.png";
import ms3 from "../../assets/ms3.png";

const Membership = () => {
  const plans = [
    {
      title: "Starter Plan",
      price: 10,
      description: [
        "List up to 50 products for sale on the platform.",
        "Benefit from basic visibility in standard search results.",
        "Access sales analytics like product views and orders.",
        "Receive standard customer support for any inquiries or issues.",
      ],
      icon: ms1,
    },
    {
      title: "Pro Plan",
      price: 30,
      description: [
        "List up to 200 products.",
        "Boosted product visibility in search results.",
        "Advanced sales analytics (conversion rates, trends).",
        "Access to promotional tools (discount codes).",
        "Priority customer support.",
      ],
      icon: ms2,
    },
    {
      title: "Elite Plan",
      price: 50,
      description: [
        "Unlimited product listings.",
        "Top-priority product visibility.",
        "Comprehensive analytics (customer demographics, performance insights).",
        "Premium promotional tools (targeted ads, flash sales).",
        "Dedicated account manager.",
        "Custom branding for your store.",
      ],
      icon: ms3,
    },
  ];

  return (
    <div className="membership-container">
      <h1>Get Our Membership!</h1>
      <p>
        Becoming a membership owner, you access to many exclusive opportunities
        for your sales. We have different types of membership plans. Get the best one aligned with your needs.
      </p>
      <div className="membership-plans">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <div className="membership-info-content">
              <div className="membership-button-logo">
                <img
                  src={plan.icon}
                  alt={`${plan.title} illustration`}
                  className="membership-info-image"
                />
                <button className="plan-button">Get Now</button>
              </div>
              <div className="membership-info-details">
                <h2 className="plan-title">{`${plan.title} ($${plan.price}/month)`}</h2>
                <ul className="plan-description">
                  {plan.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
