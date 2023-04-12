export default {
    isCompanyInn(inn) {
        return typeof inn === "string" && inn.length >= 9 && inn.length <=10;
    },

    isEntrepreneurInn(inn) {
        return typeof inn === "string" && inn.length >= 11 && inn.length <=12
    }
}