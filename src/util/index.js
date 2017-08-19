//util工具类

class util{   
    constructor(){
    }
    deepCopyObject(source) { 
        let result={};
        for (let key in source) {
            result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
        } 
        return result; 
    }
    deepClone(obj){
        let result,oClass=this._isClass(obj);
        //确定result的类型
        if(oClass==="Object"){
            result={};
        }else if(oClass==="Array"){
            result=[];
        }else{
            return obj;
        }
        for(let key in obj){
            let copy=obj[key];
            if(this._isClass(copy)=="Object"){
                result[key]=this.deepClone(copy);//递归调用
            }else if(this._isClass(copy)=="Array"){
                result[key]=this.deepClone(copy);
            }else{
                result[key]=obj[key];
            }
        }
        return result;
    }  
    _isClass(o){
        if(o===null) return "Null";
        if(o===undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8,-1);
    }
}



function plugin(Vue) {
    debugger
    let ut = new util();
    if (plugin.installed) {
        return;
    }
    Object.defineProperties(Vue.prototype, {
        $util: {
            get() {
                return ut;
            }
        }
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;