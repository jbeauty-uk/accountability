CREATE TABLE IF NOT EXISTS receipts
(
    id         BIGSERIAL PRIMARY KEY,
    created_by VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS receipt_details
(
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP,
    receipt_id BIGINT REFERENCES receipts (id),
    type       VARCHAR   NOT NULL,
    date       DATE      NOT NULL,
    details    VARCHAR,
    amount     BIGINT    NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS receipt_details_uidx
    ON receipt_details (receipt_id, deleted_at)
    WHERE deleted_at IS NULL;