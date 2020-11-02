# 用Proxy重构表单验证
```
const isNotEmpty = value => value !== '';

const isNumber = value => /^[0-9]*$/.test(value);

const isBetween = (value, min, max) => {
  if (max === undefined) {
    max = Number.MAX_VALUE;
  }
  if (min === undefined) {
    min = Number.MIN_VALUE;
  }
  return value > min && value < max;
}

const isEmail = value => {console.log(value);return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);}

// 负责校验的逻辑
let validators = {
    name: [{
      validator: isNotEmpty,
      errorMsg: '姓名必须不为空'
    }],
    age: [{
      validator: isNumber,
      errorMsg: '年龄必须为数字'
    }, {
      validator: isBetween,
      errorMsg: '年龄必须为大于 0 并且小于 100',
      params: [0, 100]
    }],
    email: [{
      validator: isNotEmpty,
      errorMsg: '邮箱不能为空'
    }, {
      validator: isEmail,
      errorMsg: '邮箱格式不正确'
    }]
  };

//   在目标对象上创建一个有检验功能的代理
const validatorCreater = (target, validator) => new Proxy(target, {
    // 保存校验器
    _validator: validator,
    set(target, key, value, proxy) {
        // 如果赋值的属性存在校验器,则进行校验
        if (this._validator[key]) {
            // 遍历其多个子校验
            for (validatorStrategy of this._validator[key]) {
                let {validator, errorMsg='', params=[]} = validatorStrategy;
                if (!validator.call(null, value, ...params)) {
                    // 校验失败抛出异常
                    throw new Error(errorMsg);
                    return false;
                }
            }
        }

        // 赋值语句放最后，如果失败不赋值，如果不存在校验器则赋值
        // Reflect.set 写入一个对象属性，如果写入成功则返回 true，否则返回 false
        return Reflect.set(target, key, value, proxy);
    }
})

function validate() {
    // 创建表单校验对象实例
    let formObj = validatorCreater({}, validators);
  
    // 获取form元素
    let eleName = document.getElementById('name');
    let eleAge = document.getElementById('age');
    let eleMail = document.getElementById('mail');
  
    // 开始校验，并接收错误信息
    try {
      formObj.name = eleName.value;
      formObj.age = eleAge.value;
      formObj.email = eleMail.value;
    } catch (e) {
      alert(e.message);
      return false;
    }
    alert('验证通过');
    return true;
  }
```