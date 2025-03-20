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
        const { userId } = req.body;
        const notification = await prisma.notification.findMany({
          where: {
            userId: userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        res.status(200).json(notification);
      } catch (error) {
        console.error("Error finding Notification:", error);
        res.status(500).json({ error: "failed to fecth Notification" });
      }
      break;

    case "POST":
      try {
        const { userId, subject, message, notificationType } = req.body;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ id: userId }, { appwriteId: userId }],
          },
        });

        if (!findUser) {
          return res.status(404).json({ error: "User not found" });
        }

        const requiredFields = ["user", "subject", "message"];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const notification = await prisma.notification.create({
          data: {
            userId: findUser.id,
            subject,
            message,
            notificationType,
            createdAt: new Date(),
          },
        });
        res.status(201).json(notification);
      } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({
          error: "failed to create notification",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
