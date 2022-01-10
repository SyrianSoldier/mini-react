## 1. 正则用法

> ####将驼峰转为横线写法

```js
var str = 'backgroundColorName'

str.replace(/[A-Z]/g,matched => `-${matched.toLowerCase()}`) // background-color-name
```

## 2. Object Api

> ####将object转成二维数组

```js
var obj = {
    name:'张三',
    age:18
}
var objArr = Object.entries(obj) // [['name','张三'],['age':18]]
```

## 3. React API 的实现 (15以下版本)

####	3-1: React.render(element,container)

```jsx
/*
 	1: container为容器
 	2: element参数能接受的类型: 
 		2-1: 字符串,数字. 对于字符串和数字将会直接生成标记插入DOM中
 		2-2: DOM元素, 如<div/>, 将会被babel转义成,React.CreateElement('div',null,null), 这个函数的返回值为虚拟DOM
 		2-3: 组件元素, 如<Person name="张三"/>, 如2-2一样会被转移为React.CreateElement(Person,{name:'张三'},null)
	3: render函数的作用: 总的来说, 就是将虚拟DOM或者基本数据类型转为真实DOM,并插入容器中
*/
import $ from 'jquery'
import {CreateElement} from 'react'
import {CreateUnit} from './unit'

function render(element,container){
    const virtualDom = CreateElement(element) //生成虚拟DOM
    const unitInstance = createUnit(virtualDom) // element有多种类型, createUnit为工厂函数, 返回一个实例
    const markUp = unitInstance.getMarkUp(rootId)// 调用该实例getMarkUp方法, 就可获得对应的, 正确的真实DOM字符串
    $(document).html(markUp)  // 插入页面中
}
```

