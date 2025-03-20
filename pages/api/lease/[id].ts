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
        const lease = await prisma.lease.findUnique({
          where: { id: id as string },
        });
        res.status(200).json(lease);
      } catch (error) {
        console.error("Error finding lease", error);
        res.status(500).json({ error: "failed to fetch lease" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "Lease is required" });
        }
        const lease = await prisma.lease.delete({
          where: { id: id as string },
        });
        res.status(200).json(lease);
      } catch (error) {
        console.error("Error deleting lease:", error);
        res.status(500).json({ error: "Failed to delete lease" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
