import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function transformNoteWithTags(note) {
  return {
    ...note,
    NoteTag: note.NoteTag.map(nt => nt.tag)
  };
}

export async function getAllNotes(archived = false) {
  const notes = await prisma.note.findMany({
    where: { archived },
    orderBy: { createdAt: "desc" },
    include: {
      NoteTag: {
        include: {
          tag: true
        }
      }
    }
  });
  
  return notes.map(transformNoteWithTags);
}

export async function getNoteById(id) {
  const note = await prisma.note.findUnique({ 
    where: { id },
    include: {
      NoteTag: {
        include: {
          tag: true
        }
      }
    }
  });
  
  if (!note) return null;
  
  return transformNoteWithTags(note);
}

export async function createNote(data) {
  const { tagIds, ...noteData } = data;
  
  const note = await prisma.note.create({
    data: noteData,
    include: {
      NoteTag: {
        include: {
          tag: true
        }
      }
    }
  });
  
  const transformedNote = transformNoteWithTags(note);

  if (tagIds && tagIds.length > 0) {
    const noteTagData = tagIds.map(tagId => ({
      noteId: note.id,
      tagId: parseInt(tagId)
    }));
    
    await prisma.noteTag.createMany({ data: noteTagData });
    
    const noteWithTags = await prisma.note.findUnique({
      where: { id: note.id },
      include: {
        NoteTag: {
          include: {
            tag: true
          }
        }
      }
    });
    
    return transformNoteWithTags(noteWithTags);
  }

  return transformedNote;
}

export async function updateNote(id, data) {
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) return null;

  const { tagIds, ...noteData } = data;

  const updatedNote = await prisma.note.update({ 
    where: { id }, 
    data: noteData,
    include: {
      NoteTag: {
        include: {
          tag: true
        }
      }
    }
  });
  
  const transformedNote = transformNoteWithTags(updatedNote);

  if (tagIds !== undefined) {
    await prisma.noteTag.deleteMany({ where: { noteId: id } });

    if (tagIds && tagIds.length > 0) {
      const noteTagData = tagIds.map(tagId => ({
        noteId: id,
        tagId: parseInt(tagId)
      }));
      
      await prisma.noteTag.createMany({ data: noteTagData });
    }

    const noteWithTags = await prisma.note.findUnique({
      where: { id },
      include: {
        NoteTag: {
          include: {
            tag: true
          }
        }
      }
    });
    
    return transformNoteWithTags(noteWithTags);
  }

  return transformedNote;
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
