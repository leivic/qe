/*网络请求 删除api*/

import request from '@/utils/request' 

export function deletGongWei(id) {
	return request({
		url: 'http://localhost:8090/deleteGongWeiFuHeById',
		method: 'post',
	  	params: { id: id} //第一个id是在服务里面的那个方法的变量名,第二个id才是本方法的形参
	})
      }

 export function deletGuoChen(id) {
	return request({
		url: 'http://localhost:8090/deletGuoChenByid',
		method: 'post',
	  	params: { id: id} //第一个id是在服务里面的那个方法的变量名,第二个id才是本方法的形参
	})
      }