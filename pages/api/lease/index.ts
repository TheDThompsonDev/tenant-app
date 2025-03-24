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
        const lease = await prisma.lease.findMany();
        res.status(200).json(lease);
      } catch (error) {
        console.error("Error finding lease:", error);
        res.status(500).json({ error: "failed to fetch lease" });
      }
      break;

    case "POST":
      try {
        const {
          firstName,
          lastName,
          tenantEmail,
          securityDeposit,
          apartmentNumber,
          leaseStartDate,
          leaseEndDate,
          monthlyRent,
          landlordEmail,
        } = req.body;

        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "apartmentNumber",
          "landlordEmail",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const property = await prisma.property.findFirst({
          where: {
            email: landlordEmail,
          },
        });

        if (!property) {
          return res.status(404).json({ error: "Property not found" });
        }

        const lease = await prisma.lease.create({
          data: {
            firstName,
            lastName,
            email: tenantEmail,
            securityDeposit,
            apartmentNumber,
            leaseStart: new Date(leaseStartDate),
            leaseEnd: new Date(leaseEndDate),
            monthlyRent,
            leaseStatus: "PENDING",
            propertyId: property.id,
            createdAt: new Date(),
          },
        });
        res.status(201).json(lease);
      } catch (error) {
        console.error("Error creating lease:", error);
        res.status(500).json({
          error: "failed to create lease",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
