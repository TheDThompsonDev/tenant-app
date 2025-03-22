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

      //case "POST":
      try {
        const { fullName, email, phoneNumber, subject, message } = req.body;

        const requiredFields = ["fullName", "phoneNumber", "email"];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const contactUs = await prisma.contactUs.create({
          data: {
            fullName,
            email,
            phoneNumber,
            subject,
            message,
            createdAt: new Date(),
          },
        });
        res.status(201).json(contactUs);
      } catch (error) {
        console.error("Error creating contact info:", error);
        res.status(500).json({
          error: "failed to create contact info",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
