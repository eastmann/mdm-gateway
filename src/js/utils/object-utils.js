export default function ObjectUtils() {

}
ObjectUtils.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
};