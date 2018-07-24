export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const nutrientDisplay = (nutrient) => {
    return nutrient != null ? nutrient : "--";
} 

export const getRateColor = (rate) => {
    switch(rate) {
        case 3: return "#53cd0f";
        case 2: return "#fabd14";
        case 1: return "red"
    }
}

export const getIconByCName = (cname) => {
    switch(cname) {
        case "主食": return "zhushi";
        case "肉蛋": return "rou";
        case "大豆制品": return "dadou";
        case "蔬菜": return "shucai";
        case "水果": return "shuiguo";
        case "奶制品": return "niunai";
        case "油脂": return "youzhi";
        case "坚果": return "jianguo";
        case "调味品": return "tiaoweipin";
        case "饮料": return "yinliao";
        case "零食": return "lingshi";
        case "其他": return "qita";
        default: return "zhushi";
    }
}