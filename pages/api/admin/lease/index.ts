import { prisma } from "../../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const lease = await prisma.lease.findMany();
        res.status(200).json(lease);
      } catch (error) {
        console.error("Error finding leases:", error);
        res.status(500).json({ error: "failed to fetch leases" });
      }
      break;

    case "POST":
      try {
        const {
          appwriteId,
          firstName,
          lastName,
          email,
          apartmentNumber,
          phoneNumber,
        } = req.body;

        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "apartmentNumber",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const user = await prisma.user.create({
          data: {
            appwriteId,
            firstName,
            lastName,
            email,
            apartmentNumber,
            phoneNumber,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        res.status(201).json(user.id);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
          error: "failed to create user",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
