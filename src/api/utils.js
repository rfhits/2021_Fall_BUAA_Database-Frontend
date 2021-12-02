export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function toTime(str) {

}

export function removeHtmlTag(txt) {
    const s = txt
    var re = new RegExp('<[^<>]+>', 'g');
    var text = s.replace(re, "");
    return text
}

export function formatDate(str) {
    // 2021-11-24T14:59:10.160Z
    return str.substr(0, 19).replace("T", " ")
}