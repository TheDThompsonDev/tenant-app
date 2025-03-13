import { prisma } from "../../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function properties(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const properties = await prisma.property.findMany();
        res.status(200).json(properties);
      } catch (error) {
        console.error("Error finding property:", error);
        res.status(500).json({ error: "failed to fecth property" });
      }
      break;

    case "POST":
      try {
        const {
          managementCompany: managementData,
          propertyManager: propertyManagerData,
          address: addressData,
          propertyName,
          websiteURL,
        } = req.body;

        const address = await prisma.address.create({
          data: addressData,
        });

        const managementCompany = await prisma.managementCompany.findUnique({
          where: { id: managementData.id },
        });

        const propertyManager = await prisma.propertyManager.create({
          data: propertyManagerData,
        });

        const property = await prisma.property.create({
          data: {
            managementCompanyId: managementCompany
              ? managementCompany.id
              : null,
            propertyManagerId: propertyManager.id,
            propertyName,
            addressId: address.id,
            websiteURL,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        res.status(201).json(property);
      } catch (error) {
        console.error("Error creating property:", error);
        res.status(500).json({ error: "failed to create property" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
