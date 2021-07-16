<!--  -->
<template>
   <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                    <li>上海</li>
                    <li>北京</li>
                </ul>
            </div>
            
                <!-- <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>	-->
            <div class="city_sort" ref="city_sort">
                <div v-for="(item) in cityList" :key="item.index">
                    <h2>{{item.index}}</h2>
                    <ul v-for="(iList) in item.list" :key="iList.id">
                        <li>{{iList.nm}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="city_index">
            <ul>
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
                hotList : []
            }
        },
        mounted(){ // 组件挂载完成之后
            this.$axios.get('/dianying/cities.json').then(res => {
                var msg = res.statusText;
                var cities = null;
                if(msg == "OK") {
                    cities = res.data.cts;
                    var {cityList,hotList } = this.formatCityList(cities); // 格式化城市数据
                    // [ {index:'A', list:[{nm:'',id:''},{},{}] }  ]
                    this.cityList = cityList;
                    this.hotList = hotList;
                }
            }).catch(e => {
                console.log(e);
            })
        },
        methods : {
            formatCityList(cities) {
                var cityList = [];
                var hotList = [];
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

            handleToIndex(index) {
                console.log(index);
                var h2 = this.$refs.city_sort.getElementsByTagName('h2'); // 获取到所有的h2标签元素
                console.log(this.$refs.city_sort.parentNode.scrollTop);
                this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop; // 设置滚动的top值
                
            }

        }
    }

</script>

<style scoped>
#content .city_body{ display: flex; width:100%;}
.city_body .city_list{ flex:1; overflow: auto; background: #f5f5f5;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}

.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}

.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 40px; line-height: 40px; border-bottom: 1px solid #ddd;}
.city_body .city_index{ 
    width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center;
    position: fixed;
    right: 0;   
}

</style>