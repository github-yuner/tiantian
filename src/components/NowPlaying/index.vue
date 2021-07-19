<!--  -->
<template>
    <div  class="movie_body">
        <Loading v-if="isLoading"></Loading>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pull_down">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id" >
                    <div class="pic_show"   @tap="handleToDetail"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2>{{item.nm}}</h2>
                        <p>观众评 <span class="grade">{{item.sc}}</span></p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>

export default {
    name:'NowPlaying',
    data(){
        return {
            movieList : [],
            pullDownMsg : '', // 存放下拉的信息
            isLoading : true,
            preCityId : -1
        }
    },
    // 将原来的mounted生命周期更换为actiated生命周期 在keep-alive的时候生效
    activated(){
        var cityId = this.$store.state.city.id;
        if(this.preCityId == cityId) { return; }
        this.isLoading = true;
        this.$axios.get("/ajax/movieOnInfoList?cityId="+cityId).then(res => {
            var movieList = res.data.movieList;
            this.movieList = movieList;
            this.isLoading = false;
            this.preCityId = cityId;

            // 为了保证数据完全渲染完成之后成功使用better-scroll，vue提供了$nextTick()方法，
            // 保证数据赋值完成之后，界面在渲染完毕之后触发方法中的回调函数，
            // 即可以进行new BScroll()操作
            // this.$nextTick(() => {
            //     var scroll = new BScroll(this.$refs.movie_body , {
            //         tap : 'tap',  // 这里使用tap : true会使标签中的tap事件失效   对应标签中@tap="handleToDetail" 'tap'就是@后面的tap
            //         probeType : 1,// 需要进行配置的参数可以百度 按需填写
            //     });

                
            //     scroll.on('scroll' ,(pos)=> { // 当页面滚动的顶部或者底部的时候触发 会节流 提高性能
            //         // pos是一个表示位置的对象 有x和y两个参数
            //         if(pos.y > 30) {
            //             this.pullDownMsg = '正在更新中......'; // 一定条件下更新数据
            //         }
            //     });
            //     scroll.on('touchEnd',(pos)=>{ // 注意大小写 当触发结束的时候会触发这个事件 进行数据请求
            //         if(pos.y > 30) {
            //             this.$axios.get("/ajax/movieOnInfoList")
            //             .then(res => {
            //                 var movieList = res.data.movieList;
            //                 this.pullDownMsg = '更新成功';
            //                 setTimeout(() => {
            //                     this.movieList = movieList; // 下拉刷新重新渲染数据
            //                     this.pullDownMsg = ''; // 更新完毕之后又清空
            //                 },1000) // 做一个延迟定时器 为了更直观观看效果
            //             });
            //         }
            //     })

            // });

        }).catch(e => {
            console.log("失败"+e);
        })
    },
    methods : {
        handleToDetail(){
            console.log("handleToDetail");
        },
        handleToScroll(pos){
            // pos是一个表示位置的对象 有x和y两个参数
            if(pos.y > 30) {
                this.pullDownMsg = '正在更新中......'; // 一定条件下更新数据
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30) {
                this.$axios.get("/ajax/movieOnInfoList")
                .then(res => {
                    var movieList = res.data.movieList;
                    this.pullDownMsg = '更新成功';
                    setTimeout(() => {
                        this.movieList = movieList; // 下拉刷新重新渲染数据
                        this.pullDownMsg = ''; // 更新完毕之后又清空
                    },1000) // 做一个延迟定时器 为了更直观观看效果
                });
            }
        }
    }
}

</script>

<style scoped>
#content .movie_body{flex:1; overflow: auto;}
.movie_body .pull_down {
    margin: 0;
    padding: 0;
    border: none;
    color: #666666;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
}
.movie_body ul{ margin:0 12px;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>