CREATE TABLE "koala" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255), -- varchar is a simple way of saying just text/string
	"gender" VARCHAR(1),
	"age" INTEGER,
	"ready_to_transfer" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(255)
);
