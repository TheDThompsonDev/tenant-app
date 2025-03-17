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
        const contactUs = await prisma.contactUs.findUnique({
          where: { id: id as string },
        });
        res.status(200).json(contactUs);
      } catch (error) {
        console.error("Error finding contact us form:", error);
        res.status(500).json({ error: "failed to fecth contact us form" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
        }
        const contactUs = await prisma.contactUs.delete({
          where: { id: id as string },
        });
        res.status(200).json(contactUs);
      } catch (error) {
        console.error("Error deleting contact form:", error);
        res.status(500).json({ error: "Failed to delete contact form" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
