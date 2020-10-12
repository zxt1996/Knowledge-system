# Fiber
> React渲染资源时，会递归对比VirtualDOM树，找出需要变动的节点，然后同步更新它们。这个过程称为Reconcilation(协调)。  

React通过Fiber架构，让自己的Reconcilation过程变成可被中断。  

- 适时让出CPU执行权，可以让浏览器及时响应用户的交互
- 分批延时对DOM进行操作,得到更好的用户体验
- 给浏览器一点喘息的机会，它会对代码进行编译优化(JIT)及进行热代码优化，或对reflow进行修正