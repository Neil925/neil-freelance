-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('Sent', 'Contacted', 'Accepted', 'Completed', 'Rejected', 'Cancelled');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'Sent';
