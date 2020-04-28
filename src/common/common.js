function deepCopy(obj = {}){
    if(typeof obj !== 'object' || obj == null){
        return obj
    }
    let res
    if(obj instanceof Array){
        res = []
    }
    if(obj instanceof Object){
        res = {}
    }
    for(let key in obj){
        // eslint-disable-next-line no-prototype-builtins
        if(obj.hasOwnProperty(key)){
            res[key] = deepCopy(obj[key])
        }
    }
    return res
}

export default{
    deepCopy
}