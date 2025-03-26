import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: "Parking pass ID is required" });
        }

        const parkingPass = await prisma.parkingPass.findUnique({
          where: { id },
        });

        if (!parkingPass) {
          return res.status(404).json({ error: "Parking pass not found" });
        }

        const updatedPass = await prisma.parkingPass.update({
          where: { id },
          data: {
            expirationDate: new Date(), 
          },
        });

        await prisma.notification.create({
          data: {
            subject: "Parking Pass Expired",
            message: `Your guest parking pass #${parkingPass.parkingPassNumber} has been expired.`,
            receiverId: parkingPass.userId,
            notificationType: "PARKING_PASS",
            createdAt: new Date(),
          },
        });

        return res.status(200).json(updatedPass);
      } catch (error) {
        console.error("Error expiring parking pass:", error);
        res.status(500).json({
          error: "Failed to expire parking pass",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
