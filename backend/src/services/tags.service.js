import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllTags() {
  return prisma.tag.findMany();
}

export function createTag(data) {
  return prisma.tag.create({ data });
}

export async function deleteTag(id) {
  const tag = await prisma.tag.findUnique({ where: { id } });
  if (!tag) return null;
  await prisma.tag.delete({ where: { id } });
  return true;
}
