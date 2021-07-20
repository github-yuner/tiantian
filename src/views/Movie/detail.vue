<!--  -->
<template>
    <div id="detailContainer" class="slide-enter-active">
        <Loading v-if="isLoading"></Loading>
        <div v-else>
            <Header title="电影详情">
                <i class="iconfont icon-right" @touchstart="handleToBack"></i>
                <!-- 记得去Header组件上加上插槽 在h2标题前面 -->
            </Header>
            <div id="content" class="contentDetail">
                <div class="detail_list">
                    <div class="detail_list_bg"></div>
                    <div class="detail_list_filter"></div>
                    <div class="detail_list_content">
                        <div class="detail_list_img">
                            <img :src="detailMovie.img | setWH('128.180')" alt="">
                        </div>
                        <div class="detail_list_info">
                            <h2>{{detailMovie.nm}}</h2>
                            <p>{{detailMovie.enm}}</p>
                            <p>{{detailMovie.sc}}</p>
                            <p>{{detailMovie.cat}}</p>
                            <p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
                            <p>{{detailMovie.pubDesc}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail_intro">
                    <p>简介：{{detailMovie.dra}}</p>
                </div>
                <div class="detail_player swiper-container" ref="detail_swiper">
                    <p>演员</p>
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="iStar in detailMovie.star" :key="iStar.id">
                            <div>
                                <img :src="detailMovie.img | setWH('128.180')" alt="">
                            </div>
                            <p>{{iStar.starNm}}</p>
                        </li>
                    </ul>
                </div>
                <!-- 剧照 -->
                <div class="detail_player swiper-container" ref="detail_photo" >
                    <p>剧照</p>
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="iPhoto,index in detailMovie.photos" :key="index">
                            <div>
                                <img :src="iPhoto | setWH('140.127')" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Header from '@/components/Header';
export default {
    name:'detail',
    data(){
        return {
            isLoading : true,
            detailMovie:{
                id : '',
                nm : '',
                enm : '', 
                sc : '',// 评分
                cat : '',// 剧情
                img : '',
                src : '',// 中国大陆
                dur : '',// 影片时长
                pubDesc : '',// 上映时间
                dra : '', // 简介
                star : [],
                photos:[] //剧照
            }
        }
    },
    components: {
        Header
    },
    props: ['movieId'], // 这个movieId要和动态路由设置中的movieId一致，不然会提示undefined
    mounted(){
        // console.log(this.movieId); // movieId直接挂在实例上面，所以直接this.调用就可以
        
        // 获取当前路由上的参数
        // this.movieId = this.$router.currentRoute.params.movieId;
        
        // 进行数据请求
        this.$axios.get('/ajax/detailmovie?movieId='+this.movieId)
        .then(res => {
            var detailMovie = res.data.detailMovie;
            this.detailMovie = detailMovie;
            // 对detailMovie应该优化一下，需要什么数据可以先提前过滤一下
            var stars = detailMovie.star.split(',');
            var starList = [];
            for(var i = 0; i < stars.length; i++) {
                starList.push({id:i,starNm:stars[i],starImg:''})
            }
            this.detailMovie.star = starList;
            this.isLoading = false; // 关闭加载

            this.$nextTick(() => { // 加上Swiper动画
                new Swiper((this.$refs.detail_swiper) , {
                    slidesPerView : 'auto',
                    freeMode : true,
                    freeModeSticky: true
                });
                new Swiper((this.$refs.detail_photo) , {
                    slidesPerView : 'auto',
                    freeMode : true,
                    freeModeSticky: true
                });
            })
            // this.isLoading = false; // 关闭加载 关闭加载写在下面会导致swiper动画失效
            
        })
        .catch(e => {
            console.log(e);
        })
    },
    methods: {
        handleToBack(){
            this.$router.back();
        }
    }
}

</script>

<style scoped>
#detailContainer {position: absolute; top: 0; left: 0; width: 100%; min-height: 100%; background-color: #fff; z-index: 999;}
.slide-enter-active {animation: .3s slideMove;}
@keyframes slideMove {
    0% {transform: translateX(100%)
    } 100% {transform: translateX(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
/* .detail_list .detail_list_bg{ width:100%; height:100%; background: url(../images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;} */
.detail_list .detail_list_bg{ width:100%; height:100%;  filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

</style>