import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";
import { json } from "express";

export const createUser = asyncHandler(async (req, res) => {
  // console.log("creating a user");
  // console.log(req.body);

  let { email } = req.body;

  const emailExists = await prisma.user.findUnique({ where: { email: email } });
  if (!emailExists) {
    const user = await prisma.user.create({ data: req.body });
    console.log("Creating a user");
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "Email already registered" });
  }
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  let { email } = req.body;

  const emailExists = await prisma.user.findUnique({ where: { email: email } });
  if (!emailExists) {
    res.send({
      message: "User Unregistered",
    });
  } else {
    const user = await prisma.user.delete({
      where: {
        email: email,
      },
    });
    res.status(201).send({ message: "Email deleted successfully" });
  }
});

// Function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  const residecy_id = parseInt(id);

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    // console.log(alreadyBooked.bookedVisits);
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === residecy_id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id: residecy_id, date } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to get all bookings of user
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const allBookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    // console.log(allBookings);
    res.status(200).send(allBookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const residecy_id = parseInt(id);

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    // console.log(user.bookedVisits);

    const index = user.bookedVisits.findIndex(
      (visit) => visit.id === residecy_id
    );
    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: { bookedVisits: user.bookedVisits },
      });
      res.send("Booking canceled successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

// Funtion to add and remove a recidency in favorite list of user
export const favRecidency = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { residencyId } = req.params;
  const residency_id = parseInt(residencyId);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesId.includes(residency_id)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesId: {
            set: user.favResidenciesId.filter((rId) => rId !== residency_id),
          },
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesId: {
            push: residency_id,
          },
        },
      });
      res.send({ message: "Updated favourites", user: updateUser });
    }
    console.log(user);
  } catch (error) {
    throw new Error(error.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const allFavResidencies = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesId: true },
    });
    res.status(200).send(allFavResidencies);
  } catch (error) {
    throw new Error(error.message);
  }
});
