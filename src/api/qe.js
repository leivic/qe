/*将网络请求的方法集中在一起的api处理js*/
import request from '@/utils/request'
const xdata = []; const ydata = []

export function fetchData(pageNum) { //export的每一个函数都是一个api,在需要的文件import后,就可直接使用该方法访问服务器、获取数据
  return request({ //request 方法的来源是文档最上方import的方法 
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
}

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

/* 抽查工位api*/
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

/* 文件修订完成率api*/
export function fetchDocumentChange(month, ydata, wenjianjihuadata, wanchendata, gailvdata) {
  request({
    url: 'http://localhost:8090/getSencondWenJianDataByDate',
    method: 'post',
    params: { date: month
    }
  }).then(res => {
    ydata.splice(0, ydata.length)
    wenjianjihuadata.splice(0, wenjianjihuadata.length)// 清空数组的方法
    wanchendata.splice(0, wanchendata.length)
    gailvdata.splice(0, gailvdata.length)// 清空数组的方法

    for (const a in res) {
      ydata.push(res[a].quYu)
      wenjianjihuadata.push(res[a].jiHuaShu)
      wanchendata.push(res[a].wanChenShu)
      gailvdata.push((res[a].wanChenShu / res[a].jiHuaShu) * 100)
    }
  })
}

/* 文件修订状态api*/
export function fetchDocumentChangeStatus(month, ydata, buxiudindata, huagaidata, huanyedata, huanbandata, xinzengdata, chexiaodata) {
  request({
    url: 'http://localhost:8090/getWenJianXiuDinThirdData',
    method: 'post',
    params: { date: month
    }
  }).then(res => {
    ydata.splice(0, ydata.length)
    buxiudindata.splice(0, buxiudindata.length)
    huagaidata.splice(0, huagaidata.length)
    huanyedata.splice(0, huanyedata.length)
    huanbandata.splice(0, huanbandata.length)
    xinzengdata.splice(0, xinzengdata.length)
    chexiaodata.splice(0, chexiaodata.length)

    for (const a in res) {
      ydata.push(res[a].quYu)
      switch (res[a].xiuGaiLeiXin) {
        case '不修订':
          buxiudindata.push(res[a].shuLiang)
          huagaidata.push('0')
          huanyedata.push('0')
          huanbandata.push('0')
          xinzengdata.push('0')
          chexiaodata.push('0')
          break
        case '划改':
          huagaidata.push(res[a].shuLiang)
          buxiudindata.push('0')
          huanyedata.push('0')
          huanbandata.push('0')
          xinzengdata.push('0')
          chexiaodata.push('0')
          break
        case '换页':
          huanyedata.push(res[a].shuLiang)
          buxiudindata.push('0')
          huagaidata.push('0')
          huanbandata.push('0')
          xinzengdata.push('0')
          chexiaodata.push('0')
          break
        case '换版':
          huanbandata.push(res[a].shuLiang)
          buxiudindata.push('0')
          huagaidata.push('0')
          huanyedata.push('0')
          xinzengdata.push('0')
          chexiaodata.push('0')
          break
        case '新增':
          xinzengdata.push(res[a].shuLiang)
          buxiudindata.push('0')
          huagaidata.push('0')
          huanyedata.push('0')
          huanbandata.push('0')
          chexiaodata.push('0')
          break
        case '撤销':
          chexiaodata.push(res[a].shuLiang)
          buxiudindata.push('0')
          huagaidata.push('0')
          huanyedata.push('0')
          huanbandata.push('0')
          xinzengdata.push('0')
          break
      }
    }
  })
}

export function fetchListGuoChen(pageNum, limit) {
  return request({
	  url: 'http://localhost:8090/selectAllGuoChenFuHe',
	  method: 'get',
    params: { pageNum: pageNum,
      limit: limit } //
  })
}

/*工位总覆盖率api*/
export function fetchListallstationcover(month,xdata,ydataone,ydatatwo) {
  xdata.splice(0, xdata.length)//数组对象原型上的方法
  ydataone.splice(0, ydataone.length)
  ydatatwo.splice(0, ydatatwo.length)
  let year = month.substring(0,4)
   request({
	  url: 'http://localhost:8090/getGongWeiFuGaiLvSecondDataByYear',
	  method: 'post',
    params: { year: year } //
  }).then(function(res){
			for (const x of res) {//调用函数时，传递的实参弱是个数组,就会一次次循环调用push方法增加元素
				xdata.push(x.yuefen),
				ydataone.push(x.shuLiang),
				ydatatwo.push(x.gaiLv)	
			}
  })
}

/*区域覆盖率api*/
export function fetchListzonestationcover(month,zone,xdata1,ydataone1,ydatatwo1) {
  xdata1.splice(0, xdata1.length)//数组对象原型上的方法
  ydataone1.splice(0, ydataone1.length)
  ydatatwo1.splice(0, ydatatwo1.length)
  let year = month.substring(0,4)
   request({
	  url: 'http://localhost:8090/getGongWeiFuGaiLvSecondDataByYearAndQuYu',
	  method: 'post',
    params: { year: year,
              quYu: zone
            } //
  }).then(function(res){
			for (const x of res) {//调用函数时，传递的实参弱是个数组,就会一次次循环调用push方法增加元素
				xdata1.push(x.yuefen),
				ydataone1.push(x.shuLiang),
				ydatatwo1.push(x.gaiLv)	
			}
  })
}
