<!--  -->
<template>
   <div id="main">
       <Header title="登陆天天"/>
       <div id="content">
           <keep-alive>
               <router-view/>
           </keep-alive>
       </div>
       <TabBar />
   </div>
</template>

<script>
    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar';

    export default {
        name:'Mine',
        components:{
            Header,
            TabBar
        }
    }

</script>
<style scoped>

</style>