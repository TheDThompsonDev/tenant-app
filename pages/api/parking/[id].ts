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
        const parkingPass = await prisma.parkingPass.findUnique({
          where: { id: id as string },
        });
        if (!parkingPass) {
          return res.status(404).json({ error: "Parking Pass not found" });
        }
        res.status(200).json(parkingPass);
      } catch (error) {
        console.error("Error finding Parking Pass:", error);
        res.status(500).json({ error: "failed to fecth Parking Pass" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "Parking Pass ID is required" });
        }
        const parkingPass = await prisma.parkingPass.delete({
          where: { id: id as string },
        });
        res.status(200).json(parkingPass);
      } catch (error) {
        console.error("Error deleting Parking Pass:", error);
        res.status(500).json({ error: "Failed to delete Parking Pass" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
