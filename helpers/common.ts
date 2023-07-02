export const getMaxDiffPixels = (width: number, height: number): number => {
    return Math.round(((width * height) / 100) * 0.01);
};