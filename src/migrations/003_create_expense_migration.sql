CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE expense_type AS ENUM ('Expense', 'Income');

CREATE TABLE IF NOT EXISTS expense (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid (),
    userId UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    description VARCHAR(250) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    categoryId UUID NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    expenseType expense_type NOT NULL DEFAULT 'Expense',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expense_userId ON expense (userId);

CREATE INDEX IF NOT EXISTS idx_expense_categoryId ON expense (categoryId);