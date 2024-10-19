-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduledEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crn" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "additionalRegistrationRequirements" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "maxRegistration" INTEGER NOT NULL DEFAULT -999,
    CONSTRAINT "ScheduledEvent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduledEvent" ("additionalRegistrationRequirements", "courseId", "createdAt", "credit", "crn", "days", "description", "endTime", "id", "instructor", "section", "startTime", "term", "type", "updatedAt", "url") SELECT "additionalRegistrationRequirements", "courseId", "createdAt", "credit", "crn", "days", "description", "endTime", "id", "instructor", "section", "startTime", "term", "type", "updatedAt", "url" FROM "ScheduledEvent";
DROP TABLE "ScheduledEvent";
ALTER TABLE "new_ScheduledEvent" RENAME TO "ScheduledEvent";
CREATE UNIQUE INDEX "ScheduledEvent_crn_key" ON "ScheduledEvent"("crn");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
