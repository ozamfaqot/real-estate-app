import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  //   console.log("endpoint created");
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    image,
    facilities,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });
    res.status(200).send({
      status: "success",
      message: "Residency created successfully",
      residency,
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(error.message);
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(residencies);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const id_residency = parseInt(id);
  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id_residency },
    });
    res.send(residency);
  } catch (error) {
    throw new Error(error.message);
  }
});
