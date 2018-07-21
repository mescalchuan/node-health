export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const nutrientDisplay = (nutrient) => {
    return nutrient != null ? nutrient : "--";
} 