const state = {
  month: ''
}

/* 状态管理器内赋值初始值
*/
// 看似下面一段代码未导出 但是它也加载执行了 那是因为整个store都配置在vue的根实例上 所以这段代码当然加载了
const theDate = new Date()
let month1
        		if (theDate.getMonth() < 9) {
          			month1 = theDate.getFullYear() + '-' + '0' + (theDate.getMonth() + 1)
        		} else {
          			month1 = theDate.getFullYear() + '-' + (theDate.getMonth() + 1)
}
state.month = month1

const mutations = {
  CHANGE_MONTH: (state, month) => {
    state.month = month
  }
}

export default {
  state,
  mutations
}
