CREATE TABLE "user" (
  "id"         UUID         NOT NULL DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "timestamp"  TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL,
  "removed_at" TIMESTAMP(3) NULL,
  "email"      VARCHAR(100) NOT NULL UNIQUE,
  "password"   TEXT         NOT NULL
);