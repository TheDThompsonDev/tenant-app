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
        const { id } = req.query;
        const users = await prisma.user.findUnique({
          where: { id: id as string },
        });
        res.status(200).json(users);
      } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ error: "failed to fecth users" });
      }
      break;

    // ------------ Please do not remove this code as I am still working on it -------------
    // case "PATCH":
    //   try {
    //     const { id } = req.query;
    //     const updateData = req.body;

    //     if (!id) {
    //       return res.status(400).json({ error: "User ID is required" });
    //     }

    //     const user = await prisma.user.update({
    //       where: { id: id as string },
    //       data: {
    //         ...updateData,
    //         updatedAt: new Date(),
    //       },
    //     });
    //     res.status(200).json(user);
    //   } catch (error) {
    //     console.error("Error updating user:", error);
    //     res.status(500).json({ error: "Failed to update user" });
    //   }
    //   break;

    // ------------ Please do not remove this code as I am still working on it -------------

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
