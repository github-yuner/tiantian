<!--  -->
<template>
   <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message" >
            </div>					
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <Loading v-if="isLoading"></Loading>
            <ul v-else>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info">
                        <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Search',
        data(){
            return {
                message: '',
                moviesList: [],
                isLoading : false
            }
        },
        methods : {
            cancelRequest(){
                if(typeof this.source === 'function'){
                    this.source('终止请求')
                }
            }
        },
        watch : { // 能够监听data中的数据的变化 需要绑定 到标签/元素上
            message(newVal) {
                // 监听的属性和此方法的名字一致
                // 进行数据请求操作
                // clearTimeout()
                // setTimeout() // 方法1、将请求放入延迟定时器中 快速输入的时候 就会先清除延迟定时器中的请求 重新开始新的延迟定时器中的请求
                // 方法2、ajax也有此种防止多次触发的操作如abort()
                // 方法3、axios也有自带的方法 百度查找axio终止多次请求
                // 放到axios.get()中的第二个参数{}的形式

                var that = this;
                this.cancelRequest();
                var cityId = this.$store.state.city.id; // 这里只需要城市id，不需要判断城市变化，因为关键词变化都会引起数据请求
                if(newVal) {this.isLoading = true;} // 打开加载
                this.$axios.get('/ajax/search?kw='+newVal+'&cityId='+cityId+'&stype=-1'
                ,{
                    cancelToken : new this.$axios.CancelToken((c) => {
                        that.source = c;
                    })
                }
                ).then(res => {
                    // 函数防抖策略
                    // 快速输入的时候让最后一次触发 使用延迟定时器
                    var movies = res.data.movies.list;
                    if(movies) {
                        this.moviesList = res.data.movies.list;
                        this.isLoading = false;
                    }
                }).catch( e => {
                    console.log(e);
                    if(this.$axios.isCancel(e)){
                        console.log(e.message);
                    } else {
                        console.log(e);
                    }
                })
            }
        }
    }

</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}

.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}

.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}


</style>