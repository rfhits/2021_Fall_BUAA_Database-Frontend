export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function removeHtmlTag(txt) {
    let s = txt
    let replaceList = ["&nbsp;", "&rdquo;", "&mdash;", "&gt;"]
    let replaceMap = [
        {
            src: "&hellip;",
            dst: "…"
        }
    ]
    var re = new RegExp('<[^<>]+>', 'g');
    s =  s.replace(re, "");
    s = s.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g,'')
    for (let i = 0; i < replaceList.length; i++) {
        var re = new RegExp(replaceList[i], "ig");
        s = s.replace(re, "")
    }
    for (let i = 0; i < replaceMap.length; i++) {
        var re = new RegExp(replaceMap[i].src, "ig");
        s = s.replace(re, replaceMap[i].dst)
    }

    s = s.replace("&nbsp;", "").replace("&rdquo;", "");
    return s
}

export function formatDate(str) {
    // 2021-11-24T14:59:10.160Z
    return str.substr(0, 16).replace("T", " ")
}