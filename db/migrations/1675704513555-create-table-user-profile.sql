CREATE TABLE "user_profile" (
  "id"         UUID         NOT NULL DEFAULT GEN_RANDOM_UUID() PRIMARY KEY,
  "timestamp"  TIMESTAMP(3) NOT NULL,
  "user_id"    UUID         NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "name"       VARCHAR(100) NOT NULL,
  "photo_url"  TEXT         NULL,
  "country"    VARCHAR(50)  NULL,
  "state"      VARCHAR(50)  NULL,
  "city"       VARCHAR(50)  NULL,
  "place"      VARCHAR(100) NULL,
  "number"     VARCHAR(50)  NULL,
  "complement" VARCHAR(50)  NULL,
  "zip_code"   CHAR(8)      NULL
);