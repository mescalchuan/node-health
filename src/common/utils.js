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
        case "主食": return {name: "zhushi", color: "yellow"};
        case "肉蛋": return {name: "rou", color: "#ff4f4f"};
        case "大豆制品": return {name: "dadou", color: "yellow"};
        case "蔬菜": return {name: "shucai", color: "green"};
        case "水果": return {name: "shuiguo", color: "red"};
        case "奶制品": return {name: "niunai", color: "gray"};
        case "油脂": return {name: "youzhi", color: "orange"};
        case "坚果": return {name: "jianguo", color: "yellow"};
        case "调味品": return {name: "tiaoweipin", color: "blue"};
        case "饮料": return {name: "yinliao", color: "#ff4f4f"};
        case "零食": return {name: "lingshi", color: "blue"};
        case "其他": return {name: "qita", color: "gray"};
        default: return {name: "zhushi", color: "yellow"};
    }
}