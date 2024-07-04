import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allResidencies", {
      timeout: 0 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong!");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 0 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong!");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Berhasil");
  } catch (error) {
    toast.error("Something went wrong!");
    // console.log("Gagal");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Booking berhasil");
  } catch (error) {
    toast.error("Something went wrong, please try again!");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    toast.error("Something went wrong, please try again!");
    throw error;
  }
};

export const toFav = async (recidecyId, email, token) => {
  try {
    await api.post(
      `/user/toFav/${recidecyId}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    throw error;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFavResidencies`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(res);
    // console.log(res.data["favResidenciesId"]);
    // console.log("wkwk");
    return res.data["favResidenciesId"];
  } catch (error) {
    toast.error("Something went wrong while fetching favourite recidencies");
    throw error;
  }
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data.bookedVisits);
    return res.data.bookedVisits;
  } catch (error) {
    toast.error("Something went wrong while fetching bookings data");
    throw error;
  }
};

export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(
      `/residency/create`,
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);
  } catch (error) {
    throw error;
  }
};
