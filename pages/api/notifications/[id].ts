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
        });
        res.status(200).json(notification);
      } catch (error) {
        console.error("Error finding Notifification:", error);
        res.status(500).json({ error: "failed to fecth Notification" });
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "Notification ID is required" });
        }

        const { subject, message, notificationType, status, priority } =
          req.body;

        const notification = await prisma.notification.update({
          where: { id: id as string },
          data: {
            ...(subject && { subject }),
            ...(message && { message }),
            ...(notificationType && { notificationType }),
            ...(status && { status }),
            ...(priority && { priority }),
            updatedAt: new Date(),
          },
        });
        res.status(200).json(notification);
      } catch (error) {
        console.error("Error updating Notification:", error);
        res.status(500).json({ error: "Failed to update Notification" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "Notification ID is required" });
        }
        const notification = await prisma.notification.delete({
          where: { id: id as string },
        });
        res.status(200).json(notification);
      } catch (error) {
        console.error("Error deleting Notification:", error);
        res.status(500).json({ error: "Failed to delete Notification" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
