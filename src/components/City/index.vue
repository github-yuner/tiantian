<!--  -->
<template>
   <div class="city_body">
       <Loading v-if="isLoading"></Loading>
        <div v-else  class="city_list">
            <Scroller ref="city_list"> 
                <!-- 引入滑动之后 导致原来的索引跳转失效了 原来的跳转的部分被better-scroll进行管理了
                原生的跳转已经不太好使用 需要作出修改使用better-scroll的方法 -->
                <!-- Scroller只针对一个节点进行滑动 此处要滑动的话 需要在热门城市和城市列表外部再包裹一个节点，让他们都在一个节点下 -->
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix" >
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                            <!-- 取cityList前10个为热门城市 -->
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="(item) in cityList" :key="item.index">
                            <!-- 这里的key使用index是为了方便设置滚动 -->
                            <h2>{{item.index}}</h2>
                            <ul >
                                <li v-for="(iList) in item.list" :key="iList.id" @tap="handleToCity(iList.nm,iList.id)">{{iList.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li class="hot_city_index"  @touchstart="handleToTop">热门城市</li>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)" >{{item.index }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'City',
        data(){
            return {
                cityList : [],
                hotList : [],
                isLoading : true
            }
        },
        mounted(){ // 组件挂载完成之后
            // 城市列表的数据
            var cityList = window.localStorage.getItem('cityList');
            var hotList = window.localStorage.getItem('hotList'); 
            if(cityList && hotList) {
                // 直接取出来使用
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
                this.isLoading = false;
            } else {
                this.$axios.get('/dianying/cities.json').then(res => {
                    var msg = res.statusText;
                    var cities = null;
                    if(msg == "OK") {
                        cities = res.data.cts;
                        var {cityList,hotList } = this.formatCityList(cities); // 格式化城市数据
                        // [ {index:'A', list:[{nm:'',id:''},{},{}] }  ]
                        this.cityList = cityList;
                        this.hotList = hotList;
                        this.isLoading = false;
                        // 进行本地存储
                        window.localStorage.setItem('cityList',JSON.stringify(cityList));
                        window.localStorage.setItem('hotList',JSON.stringify(hotList));
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        methods : {
            formatCityList(cities) {
                var cityList = [];
                var hotList = []; // 取cities的前10个
                for(var i = 0; i < 10; i++) {
                    hotList.push({id:cities[i].id, nm:cities[i].nm})
                }
                // 改造城市数据 将数据按照城市的首字母分类到一起
                // 并且分类之后 按照英文大写字母排序
                // 第一步 循环城市数据 取出每个城市拼音的首字母并转成大写
                for (var i = 0; i < cities.length; i++) {
                    var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                    // 判断改字母是否是第一次出现   是第一次出现需要建立分类索引
                    // 不是第一次出现则直接将该城市划分到对应分类字母中去
                    if(isExist(firstLetter)) { // 存在
                        // 循环找出对应的类将城市push到对应的城市类中
                        for(var j = 0; j < cityList.length; j++) {
                            if(cityList[j].index === firstLetter) {
                                // 找到了城市类
                                cityList[j].list.push({nm : cities[i].nm, id : cities[i].id});
                                break;// 退出当前循环
                            }
                        }
                    } else{ // 第一次出现
                        // 添加类
                        cityList.push({index: firstLetter, list: [{nm : cities[i].nm, id : cities[i].id}] })
                    }
                }

                // 对cityList进行城市类别排序
                cityList.sort((a,b)=>{
                    if(a.index < b.index) { // 字母之间可以进行比较
                        return -1;
                    } else if (a.index > b.index) {
                        return 1;
                    } else {
                        return 0;
                    }
                })

                function isExist(firstLetter) { // 循环去遍历 cityList查看对应的index是否存在
                    for(var i = 0; i < cityList.length; i++) {
                        if(cityList[i].index === firstLetter) { // 存在
                            return true;
                        }
                    }
                    // 循环完了都不存在
                    return false;

                }
                return {cityList, hotList}
            },
            // 在这个方法中取Scroll这个组件实例 取得它得实例对象($refs)，然后去带调用它的属性toScrollTop()需要传递水平移动的距离（这个方法内部会调用scroll实例的scrollTo方法进行页面滚动的）
            handleToIndex(index) {
                var h2 = this.$refs.city_sort.getElementsByTagName('h2'); // 获取到所有的h2标签元素
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop; // 设置滚动的top值
                this.$refs.city_list.toScrollTop(0,-h2[index].offsetTop)  // 拿到这个组件对象的toScrollTop这个方法 第一个参数水平方向不移动
            },
            handleToTop() {
                // this.$refs.city_sort.parentNode.scrollTop = 0; // 设置滚动的top值
                this.$refs.city_list.toScrollTop(0,0)
            },
            handleToCity(nm, id){
                // 状态模块下的方法
                this.$store.commit('city/CITY_INFO',{nm,id});
                window.localStorage.setItem('nm',nm);
                window.localStorage.setItem('id',id); // 在组件一加载的时候使用
                this.$router.push('./nowPlaying')
            }
        }
    }

</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #f5f5f5;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box; }
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ height: 45px; line-height: 45px;border-bottom:1px solid #ccc;}
.city_body .city_index{position: relative; width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
.city_index .hot_city_index {position: absolute;top:-5px; left: -20px; width: 40px;font-size:14px;z-index: 999;}
</style>