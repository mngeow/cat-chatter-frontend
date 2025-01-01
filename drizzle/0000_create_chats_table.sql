CREATE TABLE "chats" (
	"id" varchar PRIMARY KEY NOT NULL,
	"description" varchar,
	"conversation_history" jsonb,
	"created_at" timestamp DEFAULT now()
);
