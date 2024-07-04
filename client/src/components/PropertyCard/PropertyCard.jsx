import React from "react";
import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();
  // console.log(card.id);

  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`../properties/${card.id}`)}
    >
      <div className="like-container">
        {/* <AiFillHeart size={24} color="lightgrey" /> */}
        <Heart id={card?.id} />
      </div>
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
        {/* length = pamjang kalimat yang ditalmpilkan 15 karakter */}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 80 })}
      </span>
    </div>
  );
};

export default PropertyCard;
