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

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
