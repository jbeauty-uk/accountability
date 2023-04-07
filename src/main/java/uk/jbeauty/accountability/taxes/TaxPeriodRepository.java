package uk.jbeauty.accountability.taxes;

import java.util.UUID;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface TaxPeriodRepository extends R2dbcRepository<TaxPeriod, UUID> {
}
