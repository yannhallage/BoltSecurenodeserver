

export const generateOtp = (length: number = 6): string => {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    ).toString();
};
