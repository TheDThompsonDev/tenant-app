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
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ error: "failed to fecth users" });
      }
      break;

    case "POST":
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          phoneNumber,
        } = req.body;

        const requiredFields = [
          "firstName",
          "lastName",
          "email",
          "password",
          "dateOfBirth",
          "phoneNumber",
        ];
        const missingFields = requiredFields.filter(
          (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
          return res
            .status(400)
            .json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth: new Date(dateOfBirth),
            phoneNumber,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        res.status(201).json(user);
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
          error: "failed to create user",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
