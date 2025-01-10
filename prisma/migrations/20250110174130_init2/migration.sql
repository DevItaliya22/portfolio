/*
  Warnings:

  - A unique constraint covering the columns `[project]` on the table `views` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "views_project_key" ON "views"("project");
