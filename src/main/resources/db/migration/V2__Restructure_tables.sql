ALTER TABLE receipt_details
    DROP CONSTRAINT receipt_details_receipt_id_fkey;

DROP INDEX receipt_details_uidx;

DROP TABLE receipts;

DELETE
FROM receipt_details
WHERE deleted_at IS NOT NULL;

ALTER TABLE receipt_details
    RENAME TO transactions;

UPDATE transactions
SET amount = amount * -1
WHERE type = 'EXPENSE';

ALTER TABLE transactions
    DROP CONSTRAINT receipt_details_pkey;

ALTER TABLE transactions
    DROP COLUMN id,
    DROP COLUMN deleted_at,
    DROP COLUMN receipt_id,
    DROP COLUMN type;

ALTER TABLE transactions
    ADD COLUMN id UUID NOT NULL DEFAULT gen_random_uuid();

ALTER TABLE transactions
    ADD PRIMARY KEY (id);

ALTER TABLE transactions
    ALTER COLUMN created_by TYPE TEXT,
    ALTER COLUMN details TYPE TEXT;