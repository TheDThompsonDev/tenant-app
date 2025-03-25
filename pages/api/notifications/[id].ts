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
        const { id } = req.query;
        const notification = await prisma.notification.findUnique({
          where: { id: id as string },
          include: {
            sender: true,
            receiver: true,
          }
        });

        if (!notification) {
          return res.status(404).json({ error: "Notification not found" });
        }
        await prisma.notification.update({
          where: { id: id as string },
          data: {
            status: "READ",
          },
        });

        res.status(200).json(notification);
      } catch (error) {
        console.error("Error finding Notification:", error);
        res.status(500).json({ error: "Failed to fetch Notification" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
