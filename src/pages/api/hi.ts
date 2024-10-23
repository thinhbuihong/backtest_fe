import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const user = await prisma.user.findMany();
  res.status(200).json({ name: "John Doe", user });
}
