import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Forward the request to the external API
    const externalResponse = await fetch(
      "https://www.randomnumberapi.com/api/v1.0/random?min=0&max=10&count=5"
    );

    if (!externalResponse.ok) {
      throw new Error(`Error fetching data: ${externalResponse.statusText}`);
    }

    const data = await externalResponse.json();

    // Send the response back to the frontend
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
