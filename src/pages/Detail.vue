<template>
  <f7-page name="detail" toolbar-fixed navbar-fixed class="detail-page">

    <!-- 商品动画图标，用于从商品列表跳转到详情页面 -->
    <img :src="temp_img" class="shadow-img" :style="shadow_img_css"></img>
    
    <!-- 详细商品页面 -->
    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-f7="chevron_left" back></f7-link>
      </f7-nav-left>
    </f7-navbar>

    <!-- Page Content -->    
    <f7-swiper class="detail">
      <f7-swiper-slide v-for="img in detail_imgs" :key="img"><div :data-background="img" class="detail-swiper lazy"></div></f7-swiper-slide>
    </f7-swiper>

    <!-- Search-through list -->
    <f7-list class="detail-section-top detail">
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

    <f7-toolbar class="detail">
      <f7-grid class="detail-operation" no-gutter>
        <f7-col width="20"><f7-button big class="custom-service"><f7-link icon-f7="share"></f7-link></f7-button></f7-col>
        <f7-col width="40"><f7-button big class="buy">立即购买</f7-button></f7-col>
        <f7-col width="40"><f7-button big class="add-to-cart">加入购物车</f7-button></f7-col>    
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
        service_info: service_info,
        temp_img: '',
        img_init_loc:{
          position: 'absolute'
        },
        temp_img: '',
        shadow_img_css:{
          top:'0px',
          left:'0px',
          width:'10rem',
          height: '10rem',
          position:'absolute'
        }
      }
    },
    methods: {
      iniImgLoc:function(loc){

      },
      fetchProductsDetail: function () {
        setTimeout(()=>{
          
        }, 1000);
      },
    },
    created: function(){
      console.log(this.$route.url);
      var x = this.$route.query.x,
          y = this.$route.query.y,
          src = this.$route.query.src;
      
      this.shadow_img_css.top = y+'px';
      this.shadow_img_css.left = x+'px';
      this.temp_img = src;
      
//
//      console.log(x,y,w,h);
//
//      this.shadow_img_css.top = y+'px';
//      this.shadow_img_css.left = x+'px';
//      this.shadow_img_css.width = w+'px';
//      this.shadow_img_css.height = h+'px';
//      this.temp_img = fromDom.attr("src");
//
      var to_x = 0,
          to_y = 44,
          to_w = this.$$(".swiper-container").width(),
          to_h = this.$$(".swiper-container").height();
      
      console.log(to_x,to_y,to_w,to_h);

      Velocity(
        this.$$('.shadow-img')
        ,{ 
          translateX: to_x-x,
          translateY: to_y-y,
          width: to_w,
          height: to_h
        }, {
          complete:function(elements){
            transDom.hide();
            detailDom.show();
          }
        }
      );
    }
  }
</script>

<style>
  .detail{
    display: none;
  }
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