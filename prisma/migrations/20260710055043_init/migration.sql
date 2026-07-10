-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BetTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transactionId" TEXT NOT NULL,
    "betId" TEXT,
    "time" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "balance" REAL NOT NULL,
    "single" BOOLEAN,
    "multiple" BOOLEAN,
    "exotic" BOOLEAN,
    "pool" BOOLEAN,
    "playerId" INTEGER,
    CONSTRAINT "BetTransaction_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BetTransaction_transactionId_key" ON "BetTransaction"("transactionId");

-- CreateIndex
CREATE INDEX "BetTransaction_betId_idx" ON "BetTransaction"("betId");

-- CreateIndex
CREATE INDEX "BetTransaction_time_idx" ON "BetTransaction"("time");

-- CreateIndex
CREATE INDEX "BetTransaction_playerId_idx" ON "BetTransaction"("playerId");
