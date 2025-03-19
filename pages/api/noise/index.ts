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
        const notification = await prisma.notification.findMany();
        const noiseComplains = notification.filter(
          (notification) => notification.notificationType === "NOISE_COMPLAINT"
        );
        res.status(200).json(noiseComplains);
      } catch (error) {
        console.error("Error Noise Complaint:", error);
        res.status(500).json({ error: "failed to fecth Notification" });
      }
      break;

    case "POST":
      try {
        const { user } = req.body;

        const appwriteUser = await prisma.user.findUnique({
          where: {
            appwriteId: user,
          },
        });

        if (!appwriteUser) {
          return res.status(404).json({ error: "User not found" });
        }

        const notification = await prisma.notification.create({
          data: {
            userId: appwriteUser.id,
            subject: "Noise Complaint",
            message: "Noise Complaint",
            notificationType: "NOISE_COMPLAINT",
            createdAt: new Date(),
          },
        });
        res.status(201).json(notification);
      } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ error: "Failed to create notification" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
