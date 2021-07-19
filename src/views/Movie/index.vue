<!--  -->
<template>
   <div id="main">
       <Header title="天天电影" />
            <div id="content">
                <div class="movie_menu">
                    <router-link tag="div" to="/movie/city" class="city_name">
                        <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
                    </router-link>
                    <div class="hot_swtich">
                        <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
                        <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
                    </div>
                    <router-link tag="div" to="/movie/search" class="search_entry">
                        <i class="iconfont icon-sousuo"></i>
                    </router-link>
                </div>
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
       <TabBar />
   </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { messageBox } from '@/components/JS';

export default {
    name:'Movie',
    components:{
        Header,
        TabBar
    },
    // 不在这里设置，在状态管理的模块中设置
    mounted(){
        // 一加载这个组件/页面 就将messageBox这个挂载在页面上 点击按钮的时候就移除
        // this.timerOut = setTimeout(()=>{
        //     messageBox({
        //         title: '定位',
        //         content: '宁波',
        //         ok: '切换定位',
        //         cancel: '取消',
        //         handleOk(){
        //             console.log("切换");
        //         },
        //         handleCancel(){
        //             console.log("取消");
        //         }
        //     });
        // },3000)
    //     var nm = JSON.parse(window.localStorage.getItem('nm'));
    //     var id = JSON.parse(window.localStorage.getItem('id'));
    //     if(nm && id) {
    //         this.$store.commit('city/CITY_INFO',{nm, id});
    //     }
    }
}

</script>
<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}

</style>