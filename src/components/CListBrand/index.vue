<!--  -->
<template>
  <div class="cinema_body">
      <Loading v-if="isLoading"></Loading>
      <Scroller v-else>
        <ul>
        <li v-for="item in cinemaList" :key="item.id">
            <div>
            <span>{{ item.nm }}</span>
            <span class="q"
                ><span class="price">{{ item.price }}</span> 元起</span
            >
            </div>
            <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
            </div>
            <div class="card">
            <div v-if="item.allowRefound != ''" class="bl">
                {{ item.allowRefound }}
            </div>
            <div v-if="item.endorse != ''" class="bl">{{ item.endorse }}</div>
            <div v-if="item.vipTag != ''">{{ item.vipTag }}</div>
            <div v-if="item.hallType != ''">{{ item.hallType }}</div>
            </div>
        </li>
        </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
    name: "CListBrand",
    data() {
        return {
            cinemaList: [],
            isLoading : true,
            preCityId : -1
        };
    },
    activated() {
        var cityId = this.$store.state.city.id;
        if(this.preCityId == cityId) {return; }
        this.isLoading = true;
        this.$axios.get("/ajax/moreCinemas?cityId="+cityId)
        .then((res) => {
            var content = res.data.replace(/\s/gi, "");
            var list = [];

            var pattern = /<divclass="title-blockbox-flexmiddle">(.*?)<\/div><\/div><\/div><\/div><\/div>/g;
            var dt = content.match(pattern);

            var nmPattern = /<divclass="titleline-ellipsis"><span>(.*?)<\/span>/g;
            var pricePa = /<spanclass="price">(.*?)<\/span>/g;
            var addrPa = /<divclass="flexline-ellipsis">(.*?)<\/div>/g;
            var distancePa = /<divclass="distance">(.*?)<\/div>/g;
            var allowRefundPa = /<divclass="allowRefund">(.*?)<\/div>/g;
            var endorsePa = /<divclass="endorse">(.*?)<\/div>/g;
            var vipTagPa = /<divclass="vipTag">(.*?)<\/div>/g;
            var hallTypePa = /<divclass="hallType">(.*?)<\/div>/g;

            // 有些影院没有 退 改签 小吃 折扣卡
            for (var i = 0; i < dt.length; i++) {
                // 每个dt都匹配出 id nm price addr distance allowRefound endorse vipTag hallType
                // console.log(dt[i].match(nmPattern)[0]);
                var nm =
                dt[i].match(nmPattern) != null
                    ? dt[i].match(nmPattern)[0].replace(/<.+?>/g, "")
                    : "";
                var price =
                dt[i].match(pricePa) != null
                    ? dt[i].match(pricePa)[0].replace(/<.+?>/g, "")
                    : "";
                var addr =
                dt[i].match(addrPa) != null
                    ? dt[i].match(addrPa)[0].replace(/<.+?>/g, "")
                    : "";
                var distance =
                dt[i].match(distancePa) != null
                    ? dt[i].match(distancePa)[0].replace(/<.+?>/g, "")
                    : "";
                var allowRefound =
                dt[i].match(allowRefundPa) != null
                    ? dt[i].match(allowRefundPa)[0].replace(/<.+?>/g, "")
                    : "";
                var endorse =
                dt[i].match(endorsePa) != null
                    ? dt[i].match(endorsePa)[0].replace(/<.+?>/g, "")
                    : "";
                var vipTag =
                dt[i].match(vipTagPa) != null
                    ? dt[i].match(vipTagPa)[0].replace(/<.+?>/g, "")
                    : "";
                var hallType =
                dt[i].match(hallTypePa) != null
                    ? dt[i].match(hallTypePa)[0].replace(/<.+?>/g, "")
                    : "";

                list.push({
                id: i,
                nm,
                price,
                addr,
                distance,
                allowRefound,
                endorse,
                vipTag,
                hallType,
                });
            }
            this.cinemaList = list;
            this.isLoading = false;
        })
        .catch((e) => {
        console.log(e);
        });
    }
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
