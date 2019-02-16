function accAdd(arg1,arg2){
    console.log(`arg1${arg1}arg2${arg2}`)
    // 如果有一方为0，则无需计算
    if (arg1 == 0) return arg2
    if (arg2 == 0) return arg1
    const len1 = arg1.toString().split(".")[1].length
    const len2 = arg2.toString().split(".")[1].length
    const maxlen = Math.pow(10,Math.max(len1,len2))
    console.log(maxlen)
    console.log(arg1*maxlen+arg2*maxlen)
    return (arg1*maxlen+arg2*maxlen)/maxlen
}


function accDiv(arg1,arg2){  
    var t1=0,t2=0,r1,r2;  
    try{
        t1=arg1.toString().split(".")[1].length
    }catch(e){
        console.log(e)
    }try{
        t2=arg2.toString().split(".")[1].length
    }catch(e){
        console.log(e)
    }with(Math){  
        r1=Number(arg1.toString().replace(".",""))  
        r2=Number(arg2.toString().replace(".",""))  
        return (r1/r2)*pow(10,t2-t1);
    }
}