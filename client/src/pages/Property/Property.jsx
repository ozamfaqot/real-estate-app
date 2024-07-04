import React, { useContext, useState } from "react";
import "./Property.css";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuth0Check from "../../hooks/useAuth0Check";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  // const id = pathname.split("/").slice(-1)[0];
  const id = parseInt(pathname.split("/").slice(-1)[0]);
  // console.log(id);
  const { data, isError, isLoading } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  // console.log(data);
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuth0Check();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  // mutate as cancelBooking, isLoading as cancelling => penamaan saja
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking.id !== id),
      }));
      toast.success("Booking canceled", { position: "bottom-right" });
    },
  });

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like Button */}
        <div className="like">
          {/* <AiFillHeart size={24} color="lightgrey" /> */}
          {/* {console.log(typeof id)} */}
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={data?.image} alt="property_image" />

        {/* Property Details */}
        <div className="flexCenter property-details">
          {/* Left */}
          <div className="flexColStart left">
            {/* Head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* Facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parking} Parkings</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
            </div>

            {/* Descriptions */}
            <div className="secondaryText" style={{ textAlign: "justify" }}>
              <span>{data?.description}</span>
            </div>

            {/* Location */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}, {data?.city}, {data?.country}
              </span>
            </div>

            {/* Booking bUtton */}
            {/* {console.log(setUserDetails.bookings)} */}
            {/* {console.log(bookings)} */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )}
          </div>

          <BookingModal
            opened={modalOpened}
            setOpened={setModalOpened}
            propertyId={id}
            email={user?.email}
          />

          {/* Right */}
          <div className="flexColStart right">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
