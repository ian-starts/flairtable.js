// "Full Jitter" algorithm taken from https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
function exponentialBackoffWithJitter(numberOfRetries: number) {
    const rawBackoffTimeMs =
        .5000 * Math.pow(2, numberOfRetries);
    const clippedBackoffTimeMs = Math.min(
        600000,
        rawBackoffTimeMs
    );
    return Math.random() * clippedBackoffTimeMs;
}