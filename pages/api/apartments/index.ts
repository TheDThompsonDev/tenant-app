import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function apartments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const apartments = await prisma.apartment.findMany();
        res.status(200).json(apartments);
      } catch (error) {
        console.error("Error finding apartments:", error);
        res.status(500).json({ error: "failed to fecth apartments" });
      }
      break;
  }
}
