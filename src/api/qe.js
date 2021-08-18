import request from '@/utils/request'
const xdata = []; const ydata = []

export function fetchData(pageNum) {
  return request({
	  url: 'http://localhost:8090/selectAllWenTiQinDan',
	  method: 'get',
	  params: { pageNum: pageNum } // 这个params就是原生axios的params 所以参数列表里，需要键名和后端参数名对应才行 我不知道它怎么封装的，但是要运用自己的基础，万变不离其宗
  })
}

export function fetchSelfProcess(month, xData, yData) {
  request({
	  url: 'http://localhost:8090/GetSecondGuoChenDataByQuYu',
	  method: 'get',
	  params: { date: month,
      pingShengXingZhi: '自查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].fenLeiYiJu)
      yData.push(res[a].guoChenpercentage * 100)
    }
  })
}// then是另一个函数 当然取不到fetchSelefProcess里面的

export function fetchSelfProcessZone(month, xData, yData) {
  request({
    url: 'http://localhost:8090/GetSecondGuoChenDataByGuoChen',
	  	method: 'get',
	  	params: { date: month,
      pingShengXingZhi: '自查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].fenLeiYiJu)
      yData.push(res[a].guoChenpercentage * 100)
    }
  })
}

export function fetchRandomProcess(month, xData, yData) {
  request({
	  url: 'http://localhost:8090/GetSecondGuoChenDataByQuYu',
	  method: 'get',
	  params: { date: month,
      pingShengXingZhi: '抽查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].fenLeiYiJu)
      yData.push(res[a].guoChenpercentage * 100)
    }
  })
}// then是另一个函数 当然取不到fetchSelefProcess里面的

export function fetchRandomProcessZone(month, xData, yData) {
  request({
    url: 'http://localhost:8090/GetSecondGuoChenDataByGuoChen',
	  	method: 'get',
	  	params: { date: month,
      pingShengXingZhi: '抽查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].fenLeiYiJu)
      yData.push(res[a].guoChenpercentage * 100)
    }
  })
}

export function fetchSelfStation(month, xData, yData) {
  request({
    url: 'http://localhost:8090/getLastGongWeiData',
	  	method: 'get',
	  	params: { date: month,
      pingShengXingZhi: '自查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].stationName)
      yData.push(res[a].stationPercentage * 100)
    }
  })
}

export function fetchRandomStation(month, xData, yData) {
  request({
    url: 'http://localhost:8090/getLastGongWeiData',
	  	method: 'get',
	  	params: { date: month,
      pingShengXingZhi: '抽查'
    }
  }).then(res => {
    xData.splice(0, xData.length)
    yData.splice(0, yData.length)// 清空数组的方法
    for (const a in res) {
      xData.push(res[a].stationName)
      yData.push(res[a].stationPercentage * 100)
    }
  })
}


export function fetchDocumentChange(month, ydata, wenjianjihuadata,wanchendata,gailvdata) {
    request({
      url: 'http://localhost:8090/getSencondWenJianDataByDate',
        method: 'post',
        params: { date: month,
      }
    }).then(res => {
      
      ydata.splice(0, ydata.length)
      wenjianjihuadata.splice(0, wenjianjihuadata.length)// 清空数组的方法
      wanchendata.splice(0, wanchendata.length)
      gailvdata.splice(0, gailvdata.length)// 清空数组的方法

      for(const a in res){
				ydata.push(res[a].quYu)
				wenjianjihuadata.push(res[a].jiHuaShu)
				wanchendata.push(res[a].wanChenShu)
				gailvdata.push((res[a].wanChenShu/res[a].jiHuaShu)*100) 
      }
    })

}
