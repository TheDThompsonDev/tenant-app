import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { user } = req.body;

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ id: user }, { appwriteId: user }],
          },
        });

        if (!findUser) {
          return res.status(404).json({ error: "User not found" });
        }

        const requiredFields = ["user"];
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
            senderId: findUser.id,
            subject: "Noise complaint",
            message: "Noise complaint",
            receiverId: adminUser?.id,
            notificationType: "NOISE_COMPLAINT",
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
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
