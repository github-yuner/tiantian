<!--  -->
<template>
   <div class="wrapper" ref="wrapper">
       <slot></slot>
   </div>
</template>

<script>
// <!-- 父容器 包裹内容分发过来的数据 -->
// <!-- 内容分发到这里的方式 利用vue中的插槽  -->
// <!-- 配置成全局组件 很多地方可能都用的到 
//  在main.js中将Scroller组件注册成全局组件
//             -->
import BScroll from 'better-scroll';
export default {
    name : 'Scroller' ,
    props : {
        handleToScroll : {
            type : Function,
            default : function(){} // 设置为空 以防调用的时候不传出错
        },
        handleToTouchEnd : {
            type : Function, // Function首字母大写
            default : function(){}
        }
    },
    mounted(){
        this.timer = setTimeout(()=>{
            var scroll = new BScroll(this.$refs.wrapper , {
                tap : 'tap',  // 这里使用tap : true会使标签中的tap事件失效   对应标签中@tap="handleToDetail" 'tap'就是@后面的tap
                probeType : 1,// 需要进行配置的参数可以百度 按需填写
            });
            this.scroll = scroll; // 挂载到Sroll实列对象上 方便调用容器的scrollTo(滚动的大小，一般为负数向上滚动)方法
            scroll.on('scroll',(pos) => {
                this.handleToScroll(pos)
            });
            scroll.on('touchEnd',(po) => {
                this.handleToTouchEnd(po);
            })
        },1000) // 0.5秒之后在执行new BScroll 确保页面的dom渲染完毕
        // this.$nextTick(() => {
        // })
    },
    methods : {
        toScrollTop(x,y){
            this.scroll.scrollTo(x,y);
            // scroll这个实例带有scrollTo()这个方法，带有水平和垂直跳转的x,y两个参数
        }
    },
    beforeDestroy(){
        clearTimeout(this.timer);
    }
}

</script>

<style scoped>
 .wrapper {height: 100%; overflow: auto;}
</style>