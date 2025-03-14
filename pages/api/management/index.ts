import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function management(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const managementCompany = await prisma.managementCompany.findMany({
          include: {
            address: true,
          },
        });
        res.status(200).json(managementCompany);
      } catch (error) {
        console.error("Error finding management company:", error);
        res.status(500).json({ error: "failed to fecth management company" });
      }
      break;

    case "POST":
      try {
        const { companyName, address: addressData, websiteURL } = req.body;

        const address = await prisma.address.create({
          data: addressData,
        });

        const managementCompany = await prisma.managementCompany.create({
          data: {
            companyName,
            addressId: address.id,
            websiteURL,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        res.status(201).json(managementCompany);
      } catch (error) {
        console.error("Error creating management company:", error);
        res.status(500).json({ error: "failed to create management company" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
