## 为什么 0.1 + 0.2 != 0.3？如何解决这个问题？

> JS 的 `number` 类型是浮点类型，而 JS 采用 IEEE 754 双精度版本（64位），所以在计算小数运算时，会先将十进制的小数换算到对应的二进制，一部分小数并不能完整的换算为二进制，因此出现了误差。

注：例如`0.1.toString(2)`得到"0.0001100110011001100110011001100110011001100110011001101"，可以0.1的二进制其实包含一个 `0011` 循环，因此无法用64位二进制精确计算。

扩展：细心的同学会发现，`0.3+0.1 === 0.4 //true; 0.1+0.1 === 0.2 // true`，这是因为在`0.1 + 0.2`这个式子中，`0.1`和`0.2`都是近似表示的，在他们相加的时候，两个近似值进行了计算，导致最后得到的值是`0.30000000000000004`，此时对于JS来说，其不够近似于`0.3`，于是就出现了`0.1 + 0.2 != 0.3`这个现象。 当然，也并非所有的近似值相加都得不到正确的结果。

所以可以利用近似值来解决这个问题`parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true`

但是如若真的需要计算`0.10000000000000001+0.2`，`(0.10000000000000001+0.2).toFixed(10) // "0.3000000000"`岂不造成精度丢失？

那么问题来了，就算把浮点数转化成整数计算，比如最终计算结果为0.10000000000000001，你的返回值还是会被JS近似为0.1，除非你返回字符串'0.10000000000000001'。所以一般情况下parseFloat((0.1 + 0.2).toFixed(10))的确就够了；特殊情况下，比如你可以约定以纳米为单位，没必要以米为单位恶心自己。

## 请实现两二叉树是否相等的比较，相等返回true，否则返回false

定义一颗二叉树：
```javascript
{
    value: 1,
    left:{
        value:2,
        left:null,
        right:null
    },
    right:{
        value:3,
        left:null,
        right:null
    }
}
```

比较算法：
```javascript
function isSameTree(a,b){
    if (a === null && b === null) return true
    else if (a === null || b === null) return false
    else { // 两者都不为空
        if (a.value !== b.value) return false
        else return isSameTree(a.left,b.left)&&isSameTree(a.right,b.right)
    }
}
```

## 完成下列函数，随机从str中取出length个字符（不得重复）并返回

```javascript
/**
 * @param {Number} length - 字典
 * @param {String} str - 字典
 * @return {String}
 */
function randomStr(length,str){
    // TODO
}
```

```javascript
function randomStr(length,str){
    const chObj = {}
    let i = 0
    while(i<length){
        let ch = str[parseInt(Math.random()*str.length)]
        if(!chObj[ch]){
            chObj[ch] = 1
            i++
        }
    }
    return Object.keys(chObj).reduce((r,e)=>{
        return r + e
    },'')
}
```

## 数组去重

用对象模拟hash表
```javascript
function unique(arr) {
    var hash = {};
    return arr.filter(function (n,i) {
        if(!hash[n]){hash[n] = n;return true;}
    });
}
```

利用Set集合每个元素不允许重复的特性
```javascript
[... new Set(arr)]
```

## 数组找可以和为目标值的整数

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

**你可以假设每种输入只会对应一个答案**。但是，你不能重复利用这个数组中同样的元素

```javascript
/**
 * @param {Array} nums - 字典
 * @param {Number} target - 字典
 * @return {Array}
 */
function main(nums,target){
    const numsObj = nums.reduce((r,e,i)=>{
        r[e] = {v:1,i:i}
        return r
    },{})
    return find(numsObj,target)
}
function find(obj,target){
    if(obj[target] && obj[target].v >= 1){
        obj[target].v--
        return [obj[target].i]
    }
    for(let e of Object.keys(obj)){ // forEach不能return和break
        if(obj[e].v >= 1 && e < target){
            obj[e].v--
            let next = find(obj,target - e)
            if(next.length === 0){
                obj[e].v++
                return []
            } else {
                return [obj[e].i, ...next]
            }
        }
    }
    return []
}

console.log(main([4,7,2,3],5))
```

##  实现一个foo函数，每次调用foo会返回foo被访问次数，并提供清零:
```javascript
a = foo();
b = foo();
c = foo();
//此时  a === 1;b === 2;c === 3;
foo.clear();
d = foo(); //d === 1;
```

```javascript
let cleartimes
const foo = (function(){
    let times = 0
    cleartimes = function(){
        times = 0
    }
    return function(){
        return ++times
    }
})()

let a=foo()
console.log(a)
let b=foo()
console.log(b)
foo.clear = function(){
    cleartimes()
}
foo.clear()
let c=foo()
console.log(c)
```

## 防抖


## 节流


