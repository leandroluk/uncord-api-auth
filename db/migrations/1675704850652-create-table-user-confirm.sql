CREATE TABLE "user_confirm" (
  "id"         UUID         NOT NULL DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "timestamp"  TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL,
  "removed_at" TIMESTAMP(3) NULL,
  "user_id"    UUID         NOT NULL REFERENCES "user" ("id"),
  "code"       UUID         NOT NULL,
  "expires_in" TIMESTAMP(3)
);