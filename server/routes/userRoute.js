import express from "express";
import {
  allBookings,
  bookVisit,
  cancelBooking,
  createUser,
  deleteUser,
  favRecidency,
  getAllFavorites,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/delete", deleteUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", allBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:residencyId", jwtCheck, favRecidency);
router.post("/allFavResidencies", jwtCheck, getAllFavorites);

export { router as userRoute };
