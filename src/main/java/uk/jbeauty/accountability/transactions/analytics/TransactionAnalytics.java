package uk.jbeauty.accountability.transactions.analytics;

public record TransactionAnalytics(
    String detail,
    Long count,
    Long min,
    Long average,
    Long max
) {
}
