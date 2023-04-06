CREATE TABLE tax_periods (
    id           BIGSERIAL PRIMARY KEY,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    name         TEXT      NOT NULL,
    region       TEXT      NOT NULL,
    period_start DATE      NOT NULL,
    period_end   DATE      NOT NULL
);

INSERT INTO tax_periods (name, region, period_start, period_end)
VALUES ('2022-23', 'GB', '2022-04-06', '2023-04-06')