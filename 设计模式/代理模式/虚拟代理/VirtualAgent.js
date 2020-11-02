// 单一职责原则
// 一个对象专门做DOM 层面的事情（真实 DOM 节点的获取、img 节点的链接设置）
// 一个对象专门做加载
class PreLoadImage {
    constructor(imgNode) {
        // 获取真实的DOM节点
        this.imgNode = imgNode;
    }

    // 操作img节点的src属性
    setSrc(imgUrl) {
        this.imgNode.src = imgUrl;
    }
}

class ProxyImage {
    // 占位图的url地址
    static LOADING_URL = 'loading.gif';

    constructor(targetImage) {
        // 目标Image，即PreLoadImage实例
        this.targetImage = targetImage;
    }

    setSrc(targetUrl) {
        // 真实img节点初始化时展示的是一个占位图
        this.targetImage.setSrc(PreLoadImage.LOADING_URL);
        const virtualImage = new Image();
        // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
        virtualImage.onload = () => {
            this.targetImage.setSrc(targetUrl);
        }

        virtualImage.src = targetUrl;
    }
}