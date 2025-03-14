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

      //Please do not delete this code, it will be used in the future after Auth is implemented
      // case "POST":
      // try {
      //   const { id } = req.query;
      //   const {
      //     propertyName,
      //     address: addressData,
      //     websiteURL,
      //     propertyManagerId: propertyManagerData,
      //   } = req.body;

      //   const propertyManager = await prisma.propertyManager.create({
      //     data: propertyManagerData,
      //   });

      //   const address = await prisma.address.create({
      //     data: addressData,
      //   });

      //   const properties = await prisma.property.create({
      //     data: {
      //       managementCompanyId: id as string,
      //       propertyManagerId: propertyManager.id,
      //       propertyName,
      //       addressId: address.id,
      //       websiteURL,
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //     },
      //   });
      //   res.status(201).json(properties);
      // } catch (error) {
      //   console.error("Error creating property:", error);
      //   res.status(500).json({ error: "Failed to create property" });
      // }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
