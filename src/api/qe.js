import request from '@/utils/request'
let xdata=[],ydata=[]

export function fetchData(pageNum) {
	return request({
	  url: 'http://localhost:8090/selectAllWenTiQinDan',
	  method: 'get',
	  params: { pageNum: pageNum } //这个params就是原生axios的params 所以参数列表里，需要键名和后端参数名对应才行 我不知道它怎么封装的，但是要运用自己的基础，万变不离其宗
	})
      }

export function fetchSelfProcess(month,xData,yData) {
	request({
	  url: 'http://localhost:8090/GetSecondGuoChenDataByQuYu',
	  method: 'get',
	  params: { date:month,
		pingShengXingZhi:"自查"
	} 
	}).then(res=>{
		xData.splice(0,xData.length)
		yData.splice(0,yData.length)//清空数组的方法
		for (const a in res) {
			xData.push(res[a].fenLeiYiJu)
			yData.push(res[a].guoChenpercentage*100)
		}
	})
      }//then是另一个函数 当然取不到fetchSelefProcess里面的

export function fetchSelfProcessZone(month,xData,yData) {
	request({
		url: 'http://localhost:8090/GetSecondGuoChenDataByGuoChen',
	  	method: 'get',
	  	params: { date:month,
		pingShengXingZhi:"自查"
	} 	
	}).then(res=>{
		xData.splice(0,xData.length)
		yData.splice(0,yData.length)//清空数组的方法
		for (const a in res) {
			xData.push(res[a].fenLeiYiJu)
			yData.push(res[a].guoChenpercentage*100)
		}
	})
}

export function fetchRandomProcess(month,xData,yData) {
	request({
	  url: 'http://localhost:8090/GetSecondGuoChenDataByQuYu',
	  method: 'get',
	  params: { date:month,
		pingShengXingZhi:"抽查"
	} 
	}).then(res=>{
		xData.splice(0,xData.length)
		yData.splice(0,yData.length)//清空数组的方法
		for (const a in res) {
			xData.push(res[a].fenLeiYiJu)
			yData.push(res[a].guoChenpercentage*100)
		}
	})
      }//then是另一个函数 当然取不到fetchSelefProcess里面的

export function fetchRandomProcessZone(month,xData,yData) {
	request({
		url: 'http://localhost:8090/GetSecondGuoChenDataByGuoChen',
	  	method: 'get',
	  	params: { date:month,
		pingShengXingZhi:"抽查"
	} 	
	}).then(res=>{
		xData.splice(0,xData.length)
		yData.splice(0,yData.length)//清空数组的方法
		for (const a in res) {
			xData.push(res[a].fenLeiYiJu)
			yData.push(res[a].guoChenpercentage*100)
		}
	})
}
