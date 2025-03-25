import { PackageLockerStatus } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { userId } = req.query;

      try {
        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ id: userId as string }, { appwriteId: userId as string }],
          },
        });
        if (!findUser) {
          return res.status(404).json({ error: "User not found" });
        }

        const getPackage = await prisma.packageLocker.findMany({
          where: {
            userId: findUser.id,
          },
        });
        res.status(200).json(getPackage);
      } catch (error) {
        console.error("Error finding package:", error);
        res.status(500).json({ error: "failed to fetch packages" });
      }
      break;

    case "POST":
      const { user, lockerNumber, accessCode } = req.body;
      try {
        const createPackage = await prisma.packageLocker.create({
          data: {
            userId: user,
            lockerNumber,
            packageLockerStatus: PackageLockerStatus
              ? "READY_FOR_PICKUP"
              : "READY_FOR_PICKUP",
            accessCode,
            lastAcessed: new Date(),
          },
        });
        res.status(201).json(createPackage);
      } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ error: "failed to create package" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
