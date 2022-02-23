export function fromWeiWithDecimals(amount, decimals) {
    return amount / Math.pow(10, decimals);
}

export function toWeiWithDecimals(amount, decimals) {
    return amount * Math.pow(10, decimals);
}