<template>
  <f7-page toolbar-fixed navbar-fixed>

    <!-- Navbar -->
    <f7-navbar back-link="Back">

    </f7-navbar>

    <!-- Page Content -->
    
    <f7-swiper>
      <f7-swiper-slide v-for="img in detail_imgs" :key="img"><div :data-background="img" class="detail-swiper lazy"></div></f7-swiper-slide>
    </f7-swiper>

    <!-- Search-through list -->
    <f7-list class="detail-section-top">
      <f7-list-item>
        <f7-block>
          <div class="detail-title">进口榉木T形煎饼推</div>
          <div class="detail-desc">description</div>
          <div class="detail-price">$&nbsp;5</div>
        </f7-block>
      </f7-list-item>
      <f7-list-item link="about">
        <f7-grid no-gutter class="style-choose">
          <f7-col width="20" >已选择：</f7-col>
          <f7-col width="80" >23cm*13cmx1</f7-col>
        </f7-grid>
      </f7-list-item>
      <f7-list-item link="about">
        <f7-grid no-gutter class="sale-info">
          <f7-col width="20" >1个促销：</f7-col>
          <f7-col width="80" >周年庆抢先囤8这卡，享店庆最低...</f7-col>
        </f7-grid>
      </f7-list-item>
      <f7-list-item link="about">
        <f7-grid no-gutter class="service-list">
          <f7-col width="20" >服务：</f7-col>
          <f7-col width="80" >
            
              <f7-grid no-gutter>
                <f7-col class="service-iter" v-for="info in service_info" :key="info" width="50">{{info}}</f7-col>
              </f7-grid>
            
          </f7-col>
        </f7-grid>
         
      </f7-list-item>
    </f7-list>

    <f7-toolbar>
      <f7-grid class="detail-operation" no-gutter>
        <f7-col width="20"><f7-button big class="custom-service">empty</f7-button></f7-col>
        <f7-col width="40"><f7-button big class="buy">立即购买</f7-button></f7-col>
        <f7-col width="40"><f7-button big class="add-to-cart">加入购物车</f7-button></f7-col>
        <f7-link>fewg</f7-link>
      </f7-grid>
    </f7-toolbar>
  </f7-page>
</template>

<script>
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
        items: (function () {
          var it = [];
          for (var i = 0; i < 100; i++) it.push(i+1);
          return it;
        })(),
        detail_imgs: detail_imgs,
        service_info: service_info
      }
    },
    methods: {
      
    },
    mounted: function(){
      
    }
  }
</script>

<style>
  /*
    导航栏
  */
  
  /*
    商品图片展示区
  */
  
  .detail-swiper{
    height: 26rem;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  
  /*
    商品简述区
  */
  
  .list-block{
    margin: 0;
  }
  .detail-title{
    font-size: 1.2rem;
    color: #000;
  }
  .detail-price{
    color: red;
  }
  .style-choose,.sale-info,.service-list{
    font-size: .8rem;
    width: 100%;
  }
  .service-iter:after{
    content: "";
    position: absolute;
    width: .10667rem;
    height: .10667rem;
    background: #b4282d;
    border-radius: 100%;
    left: -.18667rem;
    top: .13333rem;
  }
  
  /*
    商品详述区
  */
  
  /*
    底部操作栏
  */
  
  .toolbar-inner{
    padding: 0;
  }
  .detail-operation{
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 44px;
    font-size:1rem;
  }
  .detail-operation .button.active-state{
    background-color:rgb(225,225,225);
  }
  .add-to-cart,.custom-service,.buy{
    border:none;
    border-top: 1px solid #c7c7c7;
    border-radius: 0;
  }
  .custom-service,.buy{
    color: #000;
  }
  .add-to-cart{
    background-color: #b4282d;
    color: #fff;
    border: 1px solid #b4282d;
  } 
  .buy{
    border-left: 0.1px solid #c7c7c7;
  } 
  .add-to-cart.button.active-state{
    background-color:rgb(154,39,39);
  }
</style>