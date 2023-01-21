ALTER TABLE receipts RENAME TO transactions;
ALTER TABLE transactions RENAME CONSTRAINT receipts_pkey TO transactions_pkey;