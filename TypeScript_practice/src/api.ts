export function simulateApiCall<T>(data: T, delayMs: number = 500): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data === undefined || data === null) {
                reject(new Error("No data provided to API call."));
            } else {
                resolve(data);
            }
        }, delayMs);
    });
}