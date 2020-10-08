# 手写bind
```
Function.prototype.bind = function() {
    //将参数拆解为数组
    const args = Array.prototype.slice.call(argument)

    //获取this
    const t = args.shift()

    //this就是需要绑定的原函数
    const self = this

    //返回一个函数
    return function() {
        return self.apply(t, args)
    }
}
```