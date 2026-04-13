CREATE TABLE "mirror_results" (
  "id" TEXT NOT NULL,
  "inputText" TEXT NOT NULL,
  "normalizedInput" TEXT NOT NULL,
  "worldType" VARCHAR(64) NOT NULL,
  "summary" TEXT NOT NULL,
  "shockLine" TEXT NOT NULL,
  "consequencesJson" TEXT NOT NULL,
  "trustScore" INTEGER NOT NULL,
  "cooperationScore" INTEGER NOT NULL,
  "empathyScore" INTEGER NOT NULL,
  "stabilityScore" INTEGER NOT NULL,
  "conflictScore" INTEGER NOT NULL,
  "opennessScore" INTEGER NOT NULL,
  "extractionScore" INTEGER NOT NULL,
  "longTermismScore" INTEGER NOT NULL,
  "source" VARCHAR(64),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "mirror_results_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "mirror_results_createdAt_idx" ON "mirror_results"("createdAt" DESC);
CREATE INDEX "mirror_results_worldType_idx" ON "mirror_results"("worldType");
