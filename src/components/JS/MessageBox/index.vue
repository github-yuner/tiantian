<!--  -->
<template>
    <div>
        <div class="msgBox">
            <h2>{{title}}</h2>
            <p>&#x2661;&nbsp;{{content}}</p>
            <div>
                <div @touchstart="handleOk">{{ok}}</div>
                <div @touchstart="handleCancel">{{cancel}}</div>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
export default {
   name:'MessageBox',
   mounted(){

   }
}

</script>

<style scoped>
.mask {width: 100%; height: 100%; background-color: #666;position: absolute;top: 0;left: 0;opacity: .3; ;z-index: 99;}
.msgBox {display: flex;flex-direction:column; width: 70%; height: 25%;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);border-radius: 20px; box-shadow: 0 0 2px 3px rgba(0, 0, 0, .2); background-color: #fff; ;padding-top: 10px ;z-index: 999;}
.msgBox h2 {flex: 1;text-align: center;  font-size: 24px; font-weight: 700;}
.msgBox p {flex: 1;text-align: center; font-size: 18px;}
.msgBox > div {flex: 1;display: flex; bottom: 0;font-size: 18px; }
.msgBox > div div {flex: 1;border: 1px solid #ccc; display: flex; justify-content: center; align-items: center;}
.msgBox > div:nth-last-child(2) {border: 0;}
</style>