import React, { useContext, useState } from "react";
import "../Properties/Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import UserDetailContext from "../../context/UserDetailContext";
import { property } from "lodash";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);
  console.log(data);
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fething data.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {/* {data.map((card, index) => (
            <PropertyCard card={card} key={index} />
          ))} */}
          {data
            .filter((property) => favourites.includes(property.id))
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, index) => (
              <PropertyCard card={card} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
