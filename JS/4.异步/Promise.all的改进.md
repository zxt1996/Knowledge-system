# Promise.all的改进
改成，就算有一个报错，也能执行其他的 resolve  

```
function isPromise(obj) {
    if (!!obj && (typeof(obj) === 'object' || typeof(obj) === 'function') && typeof(obj.then) === 'function') {
        return true;
    } else {
        return false;
    }
}

function newPromiseAll(arr) {
    let result = [];

    return new Promise((resolve, reject) => {
        for(let i = 0; i < arr.length;i++) {
            if(isPromise(arr[i])) {
                arr[i].then(data => {
                    result[i] = data;
                    if(result.length === arr.length) {
                        resolve(result);
                    }
                }).catch(err => {
                    result[i] = err;
                    if(result.length === arr.length) {
                        resolve(result);
                    }
                })
            } else {
                result[i] = arr[i];
            }
        }
    })
}
```