const countScore = (arr) => {
    let res = 0;
    arr.map(el => {
        res += el;
    })

    return res;
}

// 代理
const proxyCountScore = (function() {
    const existScore = {};  //设定存储对象
    return function(ansList) {
        const attr = ansList.join(',');
        if (existScore[attr] != null) {
            return existScore[attr];
        } else {
            return existScore[attr] = countScore(ansList);
        }
    }
})();

proxyCountScore([0, 1, 0]);