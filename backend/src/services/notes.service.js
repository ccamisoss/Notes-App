import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllNotes(archived = false) {
  return prisma.note.findMany({
    where: { archived },
    orderBy: { createdAt: "desc" },
  });
}

export function getNoteById(id) {
  return prisma.note.findUnique({ where: { id } });
}

export function createNote(data) {
  return prisma.note.create({ data });
}

export async function updateNote(id, data) {
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) return null;
  return prisma.note.update({ where: { id }, data });
}

export async function deleteNote(id) {
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) return null;
  await prisma.note.delete({ where: { id } });
  return true;
}

export async function setArchived(id, archived) {
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) return null;
  return prisma.note.update({ where: { id }, data: { archived } });
}
