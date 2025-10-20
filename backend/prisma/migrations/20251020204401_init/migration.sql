/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Note` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NoteTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `NoteTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `noteId` on the `NoteTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tagId` on the `NoteTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."NoteTag" DROP CONSTRAINT "NoteTag_noteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."NoteTag" DROP CONSTRAINT "NoteTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NoteTag" DROP CONSTRAINT "NoteTag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "noteId",
ADD COLUMN     "noteId" INTEGER NOT NULL,
DROP COLUMN "tagId",
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "NoteTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "NoteTag_noteId_tagId_key" ON "NoteTag"("noteId", "tagId");

-- AddForeignKey
ALTER TABLE "NoteTag" ADD CONSTRAINT "NoteTag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteTag" ADD CONSTRAINT "NoteTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
