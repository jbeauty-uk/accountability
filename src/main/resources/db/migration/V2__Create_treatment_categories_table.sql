CREATE TABLE IF NOT EXISTS treatments.treatment_category
(
    id         BIGSERIAL PRIMARY KEY,
    category   VARCHAR   NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS treatment_category_uidx
    ON treatments.treatment_category (category, deleted_at)
    WHERE deleted_at IS NULL;

INSERT INTO treatments.treatment_category (category)
VALUES ('MANICURE');
INSERT INTO treatments.treatment_category (category)
VALUES ('PEDICURE');
INSERT INTO treatments.treatment_category (category)
VALUES ('MASSAGE');
INSERT INTO treatments.treatment_category (category)
VALUES ('EYEBROWS');
INSERT INTO treatments.treatment_category (category)
VALUES ('WAXING');
INSERT INTO treatments.treatment_category (category)
VALUES ('NAILS');
INSERT INTO treatments.treatment_category (category)
VALUES ('VOUCHER');
INSERT INTO treatments.treatment_category (category)
VALUES ('FACIAL');
INSERT INTO treatments.treatment_category (category)
VALUES ('MESOTHERAPY');