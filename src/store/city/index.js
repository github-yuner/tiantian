const state = {
    nm: window.localStorage.getItem('nm') || '北京',
    id: window.localStorage.getItem('id') || '1'
    // 状态变量默认值/初始值
}
const actions = {

}
// 方法 名字最好大写，方便读代码 大写的是状态管理
const mutations = {
    CITY_INFO(state, payload) {
        // 传过来的载荷  组件中使用该方法，传递的参数会以对象的形式存在payload中
        state.nm = payload.nm;
        state.id = payload.id;
    }
}
// 为该模块定义一个名字
// 提供对外的接口，将数据暴露出去供外部使用
export default {
    // name : 'city', 代表有命名空间
    namespaced : true,
    state,
    mutations,
    actions
}