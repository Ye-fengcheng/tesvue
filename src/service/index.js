//http访问类
let serviceIp = 'http://10.5.16.54:8092';

class baseHttp{
    service ='';    
    constructor(service = ''){
        this.service = service;
    }
    getFunc(){
        let thiz = this;
        let func = function(vm,code,url,method = 'GET',data = {},headers={} ,moduleName='deliveryconfig'){
            data.epmsMsbCode = code;
            /*
                只能配置dev,test,uat和默认环境，其他增加需要修改打包代码
            */
            if(vm.$epmsEnv == 'dev'){
                serviceIp = 'http://10.5.16.54::8091';
            }
            if(vm.$epmsEnv == 'test'){
                serviceIp = 'http://10.5.16.54';
            }
            if(vm.$epmsEnv == 'uat'){
                serviceIp = 'http://uat';
            }
            url = serviceIp + thiz.service + moduleName + url;
            let promise = new Promise((resolve,reject) => {
                let pro = null;
                if(method=="POST"){
                    pro = vm.$http.post(url,data,headers)
                }
                else if(method=="GET"){
                    pro = vm.$http.get(url,data,headers)
                }
                else if(method=="PUT"){
                    pro = vm.$http.put(url,data,headers)
                }
                else if(method=="DELETE"){
                    pro = vm.$http.delete(url,data,headers)
                }
                pro.then(response=>{
                    debugger
                    if(!response.body.code){
                        resolve(response);
                        window.open(response.url)
                        return;
                    }
                    if(response.body.code.code === '0000'){
                        resolve(response);
                    }
                    else
                    {
                        vm.$message({
                            showClose: true,
                            message: response.body.code.msg,
                            type: 'error',
                            duration: 2000
                        });
                        reject(response);
                    }            
                },response=>{
                    if(response.url.indexOf('/export')>=0){
                        resolve(response);
                        window.open(response.url)
                        return;
                    }
                    let message = response.url + '请求出错';
                    if(process.env.NODE_ENV == 'production')
                        message = '请求出错';
                    vm.$message({
                        showClose: true,
                        message: message,
                        type: 'error',
                        duration: 2000
                    }); 
                    reject(response);
                });
            });
            return promise;
        }
        return func;
    }
    getChechLogin(){
        let fun = function(vm){
            if(!uac.cookie.getCookie("PORTALSSOCookie")){
                vm.$router.push({ path: '/epmsLogin' });
            }
        }
        return fun;
    }   
}

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Object.defineProperties(Vue.prototype, {
        $epmsDeliveryConfig: {
            get() {
                return new baseHttp('/zte-crm-epmsscopemanagement-deliveryconfig/').getFunc();
            }
        },
        $epmsUser: {
            get() {
                return new baseHttp('/zte-crm-epmssysmanagement-user/').getFunc();
            }
        },
        $epmsChechLogin: {
            get() {
                return new baseHttp('').getChechLogin();
            }
        },
        $epmsEnv:{
            get() {
                return window.epmsEnv;
            }
        }
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;