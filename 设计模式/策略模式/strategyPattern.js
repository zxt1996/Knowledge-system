// 利用对象映射消灭大量的if-else

// 定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 20;
      }
      return originPrice * 0.9;
    },
    onSale(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 30;
      }
      return originPrice * 0.8;
    },
    back(originPrice) {
      if (originPrice >= 200) {
        return originPrice - 50;
      }
      return originPrice;
    },
    fresh(originPrice) {
      return originPrice * 0.5;
    },
  };

function askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice);
}

// 如果要新增一些询价逻辑,直接新增一个映射关系即可
priceProcessor.newUser = function (originPrice) {
    if (originPrice >= 100) {
        return originPrice - 50;
      }
      return originPrice;
}