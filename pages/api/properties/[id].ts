import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function properties(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const properties = await prisma.property.findUnique({
          where: { id: id as string },
          include: {
            managementCompany: {
              include: {
                address: true,
              },
            },
            propertyManager: true,
            address: true,
          },
        });
        res.status(200).json(properties);
      } catch (error) {
        console.error("Error finding property:", error);
        res.status(500).json({ error: "failed to fecth property" });
      }
      break;
  }
}
