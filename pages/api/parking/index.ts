import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const parkingPermit = await prisma.parkingPass.findMany();
        res.status(200).json(parkingPermit);
      } catch (error) {
        console.error("Error finding Parking Permit:", error);
        res.status(500).json({ error: "failed to fecth Parking Permit" });
      }
      break;

    case "POST":
      try {
        const {
          user,
          make,
          model,
          color,
          licensePlate,
          parkingPassNumber,
          expirationDate,
        } = req.body;

        const appwriteUser = await prisma.user.findUnique({
          where: {
            appwriteId: user,
          },
        });

        if (!appwriteUser) {
          return res.status(404).json({ error: "User not found" });
        }

        // const requiredFields = [
        //   "user",
        //   "make",
        //   "model",
        //   "color",
        //   "licensePlate",
        //   "parkingPassNumber",
        //   "expirationDate",
        // ];
        // const missingFields = requiredFields.filter(
        //   (field) => !req.body[field]
        // );

        // if (missingFields.length > 0) {
        //   return res
        //     .status(400)
        //     .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        // }

        const parkingPass = await prisma.parkingPass.create({
          data: {
            userId: appwriteUser.id,
            make,
            model,
            color,
            licensePlate,
            parkingPassNumber,
            expirationDate,
            createdAt: new Date(),
          },
        });
        res.status(201).json(parkingPass);
      } catch (error) {
        console.error("Error creating parking pass:", error);
        res.status(500).json({
          error: "failed to create parking pass",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
