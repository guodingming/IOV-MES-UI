import {baseUrl} from './env'
import vm from '@/main'
export default async(url = '', data = {}, method = 'GET', notify = false) => {
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    method = method.toUpperCase()
    url = baseUrl + url

    if(method === 'GET'){
    	return new Promise((resolve, reject) => {
	        url += '?';
	        for (let index in data) {
	            if (data.hasOwnProperty(index)) {
	                url += index + '=' + encodeURI(encodeURI(data[index])) + '&';
	            }
	        }
	        url = url.slice(0,-1);
	        xmlhttp.open(method,url);
	        xmlhttp.send();
	        xmlhttp.onreadystatechange = function(){
	            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
	                callback(JSON.parse(xmlhttp.responseText));
	            }
	        }
	        
	        xmlhttp.onreadystatechange = () => {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					let obj = xmlhttp.response
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					resolve(obj)
				} 
				else{
					reject(xmlhttp)
				}
			}
	    })
    }
    else{
    	return new Promise((resolve, reject) => {
	        let formdata = new FormData();
	        for (let x in data) {
	            if (data.hasOwnProperty(x)) {
	            	formdata.append(x,data[x])
	            }
	        }
	        xmlhttp.open(method,url);
	        xmlhttp.send(formdata);
	        xmlhttp.onreadystatechange = () => {
				if (xmlhttp.readyState == 4) {
					if(xmlhttp.status == 200){
						let obj = xmlhttp.responseText
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						if(notify&&obj){
							if(vm.$_notify){
								vm.$_notify.close()
							}
							if(obj.status == "success"){
								vm.$_notify = vm.$notify({
						          title: '成功',
						          message: obj.message||"操作成功",
						          type: 'success'
						        });
							}
							else{
								vm.$_notify = vm.$notify.error({
						          title: '失败',
						          message: obj.message||"操作失败"
						        });
							}
						}
						resolve(obj)
					}
					else{
						reject(xmlhttp)
					}
				} 
			}
	    })
    }
}