<template>
  <f7-page name="home" pull-to-refresh @ptr:refresh="onRefresh" @ptr:done="refreshDone" infinite-scroll @infinite="onInfiniteScroll">

    <!-- 商品列表页面 -->
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
    </f7-swiper>

    <!-- Products list -->

    <f7-grid class="product-list">
      <f7-col v-for="item in items" :key="item.id" width="50" tablet-width="25" >
        <f7-block inset>
          <div v-on:click="toDetail(item.id)">
            <img :src="item.img" class="product-img" :id="'product-img-'+item.id">
            <div class="product-title">product example{{item.id}}</div>
            <div class="product-price">$&nbsp;5</div>
          </div>
        </f7-block>
      </f7-col>
    </f7-grid> 

  </f7-page>
</template>

<script>
  
  import { mapGetters } from 'vuex'
  
  export default {
    data: function () {
      return {
        page: 0,
        loading: false,
      }
    },
    watch: {
      ads: function(newValue, oldValue) {
        console.log(newValue);
        var swiper = this.$$('.swiper-container')[0].swiper;
        for(var it of newValue){
          swiper.appendSlide('<div class="swiper-slide"><img src="'+it.img+'" class="home-swiper"></img></div>');
        }
        console.log(swiper);
      }
    },
    computed: {
      ...mapGetters({
        items: 'allProducts',
        ads: 'allAdvertise'
      })
    },
    methods: {
      fetchProducts: function (from, cb) {
        
        if(from=='refresh'){
          this.page = 0;
          this.$store.dispatch('getAdvertise',()=>{
            
          });
          this.$store.dispatch('getProducts',{page:this.page, from:from, cb:cb});
        }
        if(from=='scroll'){
          this.page++;
          this.$store.dispatch('getProducts',{page:this.page, from:from, cb:cb});
        }
      },
      toDetail: function (id) {
        console.log(this.$$('.view-main')[0].f7View.history);
        var fromDom = this.$$('#product-img-'+id);
        var x = fromDom.offset().left,
            y = fromDom.offset().top,
            src = fromDom.attr('src');
        
        this.cur_item = '#product-img-'+id;
        var url = '/detail/?id='+id+'&anim='+x+'_'+y+'_'+src;
        this.$router.load({url:url, animatePages:false});
      },
      onRefresh: function (event) {
        // 下拉刷新事件
        console.log("freshing");
        
        this.fetchProducts('refresh',()=>{
          console.log("load complete");
          this.$f7.pullToRefreshDone();
        });
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
        this.fetchProducts('scroll',()=>{
          console.log("load complete");
          this.loading = false;
        });
      }
    },
    created: function(){
      this.fetchProducts('refresh');
    }
  }
</script>

<style>

  .home-swiper{
/*
    height: 12rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
*/
    width:100%;
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