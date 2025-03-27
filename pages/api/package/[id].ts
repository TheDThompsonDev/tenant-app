import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;
    const packageLocker = await prisma.packageLocker.findUnique({
      where: { id: id as string },
    });
    if (!packageLocker) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(packageLocker);
  } catch (error) {
    console.error("Error finding Package:", error);
    res.status(500).json({ error: "failed to fecth Package" });

  }
}
