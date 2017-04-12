<template>
  <f7-page name="home" navbar-fixed toolbar-fixed pull-to-refresh @ptr:refresh="onRefresh" @ptr:done="refreshDone" infinite-scroll @infinite="onInfiniteScroll">

    <!-- 商品列表页面 -->
    <!-- Navbar -->
    <f7-navbar class="home">
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>
        <f7-link href="/search/">
          <!-- Search Bar -->
          <f7-searchbar
          ></f7-searchbar>
        </f7-link>
      </f7-nav-center>
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page Content -->
    
    <f7-swiper pagination class="home">
      <f7-swiper-slide><div :data-background="title_ad" class="home-swiper lazy"></div></f7-swiper-slide>
      <f7-swiper-slide><div :data-background="title_ad" class="home-swiper lazy"></div></f7-swiper-slide>
      <f7-swiper-slide><div :data-background="title_ad" class="home-swiper lazy"></div></f7-swiper-slide>
    </f7-swiper>

    <!-- Search-through list -->

    <f7-grid class="product-list home">
      <f7-col v-for="item in items" :key="item" width="50" tablet-width="25" >
        <f7-block inset>
          <div v-on:click="toDetail(item)">
            <img :src="product_img" class="product-img" :id="'product-img-'+item">
            <div class="product-title">product example{{item}}</div>
            <div class="product-price">$&nbsp;5</div>
          </div>
        </f7-block>
      </f7-col>
    </f7-grid> 

  </f7-page>
</template>

<script>
  let img = require('../assets/example.png');
  let title_ad = require('../assets/title_ad.jpg');
  let products = new Array();
  let detail_imgs = [
    require('../assets/detail_img1.png'),
    require('../assets/detail_img2.jpg'),
    require('../assets/detail_img3.jpg'),
    require('../assets/detail_img4.jpg'),
    require('../assets/detail_img5.jpg')];
  
  let service_info = ["30天无忧退货", 
                      "48小时快速退款", 
                      "满88元免邮费", 
                      "自营品牌"];
  
        
export default {
    data: function () {
      return {
        product_img:img,
        title_ad:title_ad,
        products: (() => {
          var it = [];
          for (var i = 0; i < 100; i++) it.push(i+1);
          return it;
        })(),
        items: [],
        loading: false,
        page: 0,
        itemPerPage: 10,
        detail_imgs: detail_imgs,
        service_info: service_info
      }
    },
    methods: {
      fetchProducts: function () {
        setTimeout(()=>{
          this.loading = false;
          this.items.push(...this.products.slice(this.itemPerPage*this.page,this.itemPerPage*(this.page+1)));
        }, 1000);
      },
      toDetail: function (item) {
        var fromDom = this.$$('#product-img-'+item);
        var x = fromDom.offset().left,
            y = fromDom.offset().top,
            src = fromDom.attr('src');
        
        var url = '/detail/?x='+x+'&y='+y+'&src='+src;
        if(this.$$('div[data-page=detail]').length!=0){
          console.log(1);
          this.$router.load({pageName:'detail', animatePages:false ,query:{x:x, y:y, src:src}});
        }else{
          console.log(2);
          this.$router.load({url:'detail', animatePages:false, query:{x:x, y:y, src:src}});
        }
      },
      onRefresh: function (event) {
        // 下拉刷新事件
        console.log("freshing");
        
        this.fetchProducts(); 
        setTimeout(()=>{
          this.$f7.pullToRefreshDone()
        }, 2000);
      },
      refreshDone: function (event) {
        // 下来刷新完成事件
        console.log("finish freshing");
      },
      onInfiniteScroll: function (event) {
        // 无限滚动事件
        // Exit, if loading in progress
        if(this.loading) return;
        // Set loading flag
        this.loading = true
        // Reset loading flag
        this.page++;
        this.fetchProducts();
      }
    },
    created: function(){
      this.fetchProducts();
    }
  }
</script>

<style>

  .home-swiper{
    height: 12rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .content-block {
    margin: 20px auto;
    padding: 0;
    text-align: center;  
  }
  .product-title{ 
    padding-bottom: 5px;
  }
  .product-img{
    height: 10rem;
    z-index: 999;
  }

</style>