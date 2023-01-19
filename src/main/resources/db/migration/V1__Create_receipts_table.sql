CREATE TABLE IF NOT EXISTS receipts
(
    id         UUID PRIMARY KEY   DEFAULT gen_random_uuid(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    created_by TEXT      NOT NULL,
    date       DATE      NOT NULL,
    details    TEXT,
    amount     BIGINT    NOT NULL
);