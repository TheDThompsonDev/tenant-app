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
        const properties = await prisma.property.findMany({
          include: {
            address: true,
          },
        });
        res.status(200).json(properties);
      } catch (error) {
        console.error("Error finding properties:", error);
        res.status(500).json({ error: "failed to fecth properties" });
      }
      break;

    case "POST":
      try {
        const {
          managementCompanyName,
          propertyName,
          websiteURL,
          propertyManagerName,
          phoneNumber,
          streetAddress,
          suiteNumber,
          city,
          state,
          zipCode,
          country,
          email,
        } = req.body;

        const requiredFields = [
          "managementCompanyName",
          "propertyName",
          "websiteURL",
          "propertyManagerName",
          "phoneNumber",
          "streetAddress",
          "suiteNumber",
          "city",
          "state",
          "zipCode",
          "country",
          "email",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const saveAddress = await prisma.address.create({
          data: {
            address: streetAddress,
            suiteNumber,
            city,
            state,
            zipCode,
            country,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        const property = await prisma.property.create({
          data: {
            managementCompanyName,
            propertyName,
            websiteURL,
            propertyManagerName,
            phoneNumber,
            email,
            addressId: saveAddress.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        res.status(201).json(property.id);
      } catch (error) {
        console.error("Error creating property:", error);
        res.status(500).json({
          error: "failed to create property",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
