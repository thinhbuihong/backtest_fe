/*
  Warnings:

  - You are about to drop the column `strategyId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `strategy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "FK_070581df53052d2b111a3046bab";

-- DropForeignKey
ALTER TABLE "strategy" DROP CONSTRAINT "FK_c1c10ab196af1494177a8b08fc9";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "strategyId";

-- AlterTable
ALTER TABLE "strategy" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_070581df53052d2b111a3046bab" FOREIGN KEY ("strategy_id") REFERENCES "strategy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "strategy" ADD CONSTRAINT "FK_c1c10ab196af1494177a8b08fc9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
