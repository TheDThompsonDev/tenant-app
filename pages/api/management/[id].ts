import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function managementCompany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const managementCompany = await prisma.managementCompany.findUnique({
          where: { id: id as string },
          include: {
            address: true,
            properties: true,
          },
        });
        res.status(200).json(managementCompany);
      } catch (error) {
        console.error("Error finding management company:", error);
        res.status(500).json({ error: "failed to fecth management company" });
      }
      break;

    case "PATCH":
      try {
        const { id } = req.query;
        const { companyName, address: addressData, websiteURL } = req.body;

        if (!id) {
          return res
            .status(400)
            .json({ error: "Management Company  ID is required" });
        }

        const managementCompany = await prisma.managementCompany.update({
          where: { id: id as string },
          data: {
            ...(companyName && { companyName }),
            ...(websiteURL && { websiteURL }),
            address: {
              update: {
                ...addressData,
              },
            },
            updatedAt: new Date(),
          },
        });
        res.status(200).json(managementCompany);
      } catch (error) {
        console.error("Error updating management company:", error);
        res.status(500).json({ error: "Failed to update management company" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
