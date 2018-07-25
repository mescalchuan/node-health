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
        case "主食": return {name: "zhushi", color: "#b9b9b9"};
        case "肉蛋": return {name: "rou", color: "#dac2ab"};
        case "大豆制品": return {name: "dadou", color: "#f3af39"};
        case "蔬菜": return {name: "shucai", color: "#1ab51a"};
        case "水果": return {name: "shuiguo", color: "#ff4f4f"};
        case "奶制品": return {name: "niunai", color: "#68b1ed"};
        case "油脂": return {name: "youzhi", color: "#d3b71a"};
        case "坚果": return {name: "jianguo", color: "#b3853d"};
        case "调味品": return {name: "tiaoweipin", color: "#0b9bba"};
        case "饮料": return {name: "yinliao", color: "#ff4f4f"};
        case "零食": return {name: "lingshi", color: "#e9af54"};
        case "其他": return {name: "qita", color: "#666666"};
        default: return {name: "zhushi", color: "#cecece"};
    }
}