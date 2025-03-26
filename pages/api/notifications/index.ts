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
        const { userId } = req.query;
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { id: Array.isArray(userId) ? userId[0] : userId },
              { appwriteId: Array.isArray(userId) ? userId[0] : userId },
            ],
          },
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const userNotifications = await prisma.notification.findMany({
          where: {
            OR: [{ senderId: user.id }, { receiverId: user.id }],
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            sender: true,
            receiver: true,
          },
        });
        res.status(200).json(userNotifications);
      } catch (error) {
        console.error("Error finding Notification:", error);
        res.status(500).json({ error: "failed to fetch Notification" });
      }
      break;

    case "POST":
      try {
        const { sender, subject, message, notificationType } = req.body;

        const findSender = await prisma.user.findFirst({
          where: {
            OR: [{ id: sender }, { appwriteId: sender }],
          },
        });
        if (!findSender) {
          return res.status(404).json({ error: "Sender not found" });
        }

        const requiredFields = ["sender", "subject", "message"];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const adminUser = await prisma.user.findFirst({
          where: {
            userRole: "ADMIN",
          },
        });

        if (!adminUser) {
          return res.status(404).json({ error: "Admin user not found" });
        }

        const notification = await prisma.notification.create({
          data: {
            senderId: findSender.id,
            subject,
            message,
            receiverId: adminUser.id,
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
