class PrimitiveTest{
    static [Symbol.hasInstance](obj){
        return typeof(obj) === "number"
    }
}
console.log(1 instanceof PrimitiveTest )

function a(){
    return Promise.reject(new Error("I donnot love you"))
}
try{
    a()
}catch(e){
    console.log(e)
}

function deepClone(obj){
    function isObj(obj){
        return (typeof(obj)==='object'||typeof(obj)==='function')&&obj!==null
    }

    if (!isObj(obj)) {
        throw new Error('非对象')
    }

    let copy = Array.isArray(obj) ? [...obj]:{...obj}
    Reflect.ownKeys(copy).forEach(key=>{
        copy[key] = isObj(obj[key])?deepClone(obj[key]):obj[key]
    })
    return copy
}