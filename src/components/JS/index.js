import Vue from 'vue'
import MessageBox from './MessageBox'

// 做对外的接口 很多方法暴露出去
// 定义变量 = 做一个闭包 函数 (function(){})()
// 函数内部 在定义变量
// export default 和export的区别 后者可以暴露很多方法
export var messageBox = (function () {
    
    // 默认值
    var defaults = {
        // 设置默认值 需要外部传入
        title: '',
        content: '',
        ok: '',
        cancel: '',
        handleOk: null,
        handleCancel: null // 两个函数
    }

    var MyComponent = Vue.extend(MessageBox);
    // 在return外面做Vue和组件间的结合
    // 创建一个组件 可以Vue的extend可以将MessageBox组件结合起来并返回一个类

    // 返回 - 函数
    return function (opts) { // 配置参数
        
        for (var attr in opts) { // 外部传入opts参数
            defaults[attr] = opts[attr];
        }
        var vm = new MyComponent({
            // 这个类中需要配置一些对象参数
            el: document.createElement('div'), // 删除的时候Vue会删除的 这个div只是相当于一个容器 不会有影响
            data: { // 这些数据就是MessageBox这个组件会使用到的数据 可以传递进去
                title: defaults.title,
                content: defaults.content,
                ok: defaults.ok,
                cancel: defaults.cancel
            },
            methods: {
                handleOk() {
                    // 取消的方法 通过bind修正this指向问题(错误) 改为call直接触发调用
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el); // 删除弹窗
                },
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });

        // 弹出弹窗 相应的在点击切换定位、取消的时候要删除弹窗
        document.body.appendChild(vm.$el); // 通过这个方式添加到body下 vm.$el元素

    }

})(); // 一个闭包函数