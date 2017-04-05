<template>
  <f7-page pull-to-refresh @ptr:refresh="onRefresh" @ptr:done="refreshDone" infinite-scroll @infinite="onInfiniteScroll">

    <!-- Navbar -->
    <f7-navbar>
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
    
    <f7-swiper pagination>
      <f7-swiper-slide><div :data-background="title_ad" class="lazy"></div></f7-swiper-slide>
      <f7-swiper-slide><div :data-background="title_ad" class="lazy"></div></f7-swiper-slide>
      <f7-swiper-slide><div :data-background="title_ad" class="lazy"></div></f7-swiper-slide>
    </f7-swiper>

    <!-- Search-through list -->

    <f7-grid class="product-list">
      <f7-col v-for="item in items" :key="item" width="50" tablet-width="25">
        <f7-block inset>
          <div v-on:click="jumpToProduct">
            <img :src="product_img" class="product-img">
            <div class="product-title">product example{{item}}</div>
            <div class="product-price">$200</div>
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
        itemPerPage: 10
      }
    },
    methods: {
      fetchProducts: function () {
        setTimeout(()=>{
          this.loading = false;
          this.items.push(...this.products.slice(this.itemPerPage*this.page,this.itemPerPage*(this.page+1)));
        }, 1000);
      },
      jumpToProduct: function (event) {
        this.$router.load({url: '/detail/'})
      },
      doSearch: function (event) {
        alert("searching");
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
  .content-block {
    margin: 20px 0;
    padding: 0;
    text-align: center;  
  }
  .product-title{ 
    padding-bottom: 5px;
  }
  .page-content{
    padding-top: 44px;
  }
  .product-img{
    height: 10rem;
  }
</style>