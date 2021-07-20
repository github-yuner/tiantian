<!--  -->
<template>
    <div class="movie_body">
        <Loading v-if="isLoading"></Loading>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul >
                <li class="pull_down">{{pullDownMsg}}</li>
                <li v-for="item in comingList" :key="item.id">
                    <div class="pic_show"><img :src="item.img | setWH('128.180')" @touchstart="handleToDetail(item.id)"></div>
                    <div class="info_list">
                        <h2 @touchstart="handleToDetail(item.id)" >{{item.nm}}</h2>
                        <p><span class="person">{{item.wish}}</span> 人想看</p>
                        <p>主演: {{item.star}}</p>
                        <p>{{item.rt}}上映</p>
                    </div>
                    <div class="btn_pre">
                        预售
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
    export default {
        name:'ComingSoon',
        data(){
            return {
                comingList:'',
                pullDownMsg : '', // 存放下拉的信息
                isLoading : true,
                preCityId : -1
            }
        },
        activated(){
            var cityId = this.$store.state.city.id;
            if(this.preCityId == cityId) { return; }
            this.isLoading = true;
            this.$axios.get("/ajax/comingList?ci="+cityId+"&token=&limit=10") // 限制请求10条数据
            .then(res => {
                this.comingList = res.data.coming;
                this.isLoading = false;
                this.preCityId = cityId; // 记录下当前请求数据的城市

            }).catch(e => {
                console.log(e);
            })
        },
        methods : {
            handleToDetail(movieId){
                // this.$router.push('movie/detail/'+movieId);
                this.$router.push('/movie/detail/2/'+movieId);
            },
            handleToScroll(pos){
                // pos是一个表示位置的对象 有x和y两个参数
                if(pos.y > 30) {
                    this.pullDownMsg = '正在更新中......'; // 一定条件下更新数据
                }
            },
            handleToTouchEnd(pos){
                if(pos.y > 30) {
                    this.$axios.get("/ajax/moreComingList?token=&movieIds=1302134%2C1215841%2C1222268%2C1298349%2C1355802%2C226991%2C1337804%2C1375624%2C1368406%2C344264&optimus_uuid=DEE14AD0E45211EBA6C5E7E3445023FE965969F481484698932F304B135E05BB&optimus_risk_level=71&optimus_code=10")
                    .then(res => {
                        var comingList = res.data.coming;
                        this.pullDownMsg = '更新成功';
                        setTimeout(() => {
                            this.comingList = comingList; // 下拉刷新重新渲染数据
                            this.pullDownMsg = ''; // 更新完毕之后又清空
                        },1000) // 做一个延迟定时器 为了更直观观看效果
                    })
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

.movie_body ul{ margin:0 12px; overflow: hidden;}
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