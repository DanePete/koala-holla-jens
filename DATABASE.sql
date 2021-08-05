CREATE TABLE "koala" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255), -- varchar is a simple way of saying just text/string
	"gender" VARCHAR(1),
	"age" INTEGER,
	"ready_to_transfer" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(255)
);

INSERT INTO "public"."koala"("name", "gender", "age", "ready_to_transfer", "notes") VALUES('abc', 'M', 2, FALSE, 'jsbjbdnsj') RETURNING "id", "name", "gender", "age", "ready_to_transfer", "notes";
INSERT INTO "public"."koala"("name", "gender", "age", "ready_to_transfer", "notes") VALUES('def', 'F', 4, FALSE, 'dbfi') RETURNING "id", "name", "gender", "age", "ready_to_transfer", "notes";