import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const lease = await prisma.lease.findMany();
        res.status(200).json(lease);
      } catch (error) {
        console.error("Error fetching leases:", error);
        res.status(500).json({ error: "Failed to fetch leases" });
      }
      break;

    case "POST":
      try {
        const { tenantName, leaseStartDate, leaseEndDate, propertyAddress, rentAmount } = req.body;

        // Validate required fields
        const requiredFields = ["tenantName", "leaseStartDate", "leaseEndDate", "propertyAddress", "rentAmount"];
        const missingFields = requiredFields.filter((field) => !req.body[field]);

        if (missingFields.length > 0) {
          return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        // Create new lease record
        const newLease = await prisma.lease.create({
          data: {
            tenantName,
            leaseStartDate: new Date(leaseStartDate),
            leaseEndDate: new Date(leaseEndDate),
            propertyAddress,
            rentAmount: parseFloat(rentAmount),
            createdAt: new Date(),
          },
        });

        res.status(201).json(newLease);
      } catch (error) {
        console.error("Error creating lease:", error);
        res.status(500).json({ error: "Failed to create lease" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
