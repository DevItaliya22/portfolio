-- CreateTable
CREATE TABLE "views" (
    "id" SERIAL NOT NULL,
    "project" TEXT NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);
