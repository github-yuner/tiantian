<!--  -->
<template>
   <div id="main">
       <Header title="天天影院" />
       <div id="content">
			<div class="cinema_menu">
				<router-link tag="div" to="/cinema/cListCity" class="city_switch">
					&nbsp;&nbsp;全城 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/cinema/cListBrand" class="brand_swtich">
					&nbsp;&nbsp;品牌 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/cinema/cListCharacter" class="feature_switch">
					&nbsp;&nbsp;特色 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
			</div>
            <div style="height:50px"></div>
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

    export default {
        name:'Cinema',
        components:{
            Header,
            TabBar
        }
    }

</script>
<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;position: fixed; left: 0; top:50px; z-index:10;}
.cinema_menu .city_switch.active{
    color: #ef4238; border-bottom: 2px #ef4238 solid;
    height: 45px;
    line-height: 45px;
}
.cinema_menu .city_switch.router-link-active{
    color: #ef4238; border-bottom: 2px #ef4238 solid;
    height: 45px;
    line-height: 45px;
}
.cinema_menu .brand_swtich.router-link-active{
    color: #ef4238; border-bottom: 2px #ef4238 solid;
    height: 45px;
    line-height: 45px;
}
.cinema_menu .feature_switch.router-link-active{
    color: #ef4238; border-bottom: 2px #ef4238 solid;
    height: 45px;
    line-height: 45px;
}


</style>