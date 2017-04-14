<template>
  <f7-page name="detail" class="detail-page">

    <!-- 商品动画图标，用于从商品列表跳转到详情页面 -->
    <img :src="temp_img" class="shadow-img" :style="shadow_img_css"></img>
    
    <!-- 详细商品页面 -->
    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-material="navigate_before" back></f7-link>
      </f7-nav-left>
      <f7-nav-right>
        <f7-link icon-material="home" @click="toHome"></f7-link>
        <f7-link icon-material="share"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page Content -->    
    <f7-swiper class="detail" :id="'swiper-product-'+cur_pId">
<!--      <f7-swiper-slide v-for="img in product.imgs" :key="img"><div :data-background="img" class="detail-swiper lazy"></div></f7-swiper-slide>-->
    </f7-swiper>

    <!-- 购买类型及促销 -->
    <f7-list class="detail-section-top detail">
      <f7-list-item>
        <f7-block>
          <div class="detail-title">{{product.title}}</div>
          <div class="detail-desc">{{product.shortDesc}}</div>
          <div class="detail-price">{{product.price}}</div>
        </f7-block>
      </f7-list-item>
      <f7-list-item link="about">
        <f7-grid no-gutter class="style-choose">
          <f7-col width="20" >已选择：</f7-col>
          <f7-col width="80" >{{product.style}}</f7-col>
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
                <f7-col class="service-iter" v-for="info in product.service" :key="info" width="50">{{info}}</f7-col>
              </f7-grid>
            
          </f7-col>
        </f7-grid>
         
      </f7-list-item>
    </f7-list>

    <hr class="detail detail-hr"/>

    <!-- 商品参数描述 -->
    <f7-block-title class="detail">商品参数</f7-block-title>
    <f7-block class="detail">
      <f7-grid no-gutter class="service-list" v-for="param in product.params" :key="param.key">
        <f7-col width="20">{{param.key}} :</f7-col>
        <f7-col width="80" class="text-left">{{param.value}}</f7-col>
      </f7-grid>
    </f7-block>
  
    <hr class="detail detail-hr"/>

    <!-- 商品详细描述 -->
    <div class="detail">
      <p v-for="img in product.intros" :key="img">
        <img :src="img" class="detail-swiper"></img>
      </p>
    </div>

    <!-- 常见问题 -->
    <f7-block-title class="detail text-center">常见问题</f7-block-title>
    <f7-block class="detail">
      <ul>
        <li v-for="question in common_questions" :key="question" class="text-left">
          <p>{{question.key}}</p>
          <p>{{question.value}}</p>
        </li>                                                          
      </ul>
    </f7-block>

    <f7-grid class="detail-product-list">
      <f7-col v-for="item in items" :key="item" width="50" tablet-width="25">
        <f7-block inset>
          <div @click="toDetail(item)">
            <img :src="product_img" class="product-img" :id="'product-img-'+item">
            <div class="product-title">product example{{item}}</div>
            <div class="product-price">$&nbsp;5</div>
          </div>
        </f7-block>
      </f7-col>
    </f7-grid>

    <!-- 底部操作栏 -->
    <f7-toolbar class="detail">
      <f7-grid class="detail-operation" no-gutter>
        <f7-col width="20">
          <f7-button @click="addFavorite" big class="add-favorite" icon-material="favorite_border"></f7-button>
        </f7-col>
        <f7-col width="20">
          <f7-button @click="toCart" big class="check-cart">
            <f7-icon material="add_shopping_cart">
              <f7-badge v-if="cartLength>0" color="red">{{cartLength}}</f7-badge>
            </f7-icon>
          </f7-button>
        </f7-col>
        <f7-col width="30"><f7-button big class="buy">立即购买</f7-button></f7-col>
        <f7-col width="30"><f7-button @click="addToCart" big class="add-to-cart">加入购物车</f7-button></f7-col>    
      </f7-grid>
    </f7-toolbar>

  </f7-page>
</template>

<script>
  import { mapGetters } from 'vuex'
    
  let common_questions = [
    {key:"购买运费如何收取？", value:"单笔订单金额（不含运费）满88元免邮费；不满88元，每单收取10元运费"},
    {key:"使用什么快递发货", value:"默认用顺丰快递发货"},
    {key:"如何申请退货？", value:"1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；2.内裤和食品等特殊商品无质量问题不支持退货。确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；"}
  ]
  
  let img = require('../assets/example.png');
  
export default {
    data: function () {
      return {
        anim:[],
        items: (function () {
          var it = [];
          for (var i = 0; i < 10; i++) it.push(i+1);
          return it;
        })(),
        common_questions: common_questions,
        temp_img: '',
        shadow_img_css:{
          top:'0px',
          left:'0px',
          width:'10rem',
          height: '10rem',
          position:'absolute'
        },
        cartLength: 0,
        product_img:img,
        cur_pId:''
      }
    },
    watch: {
      product: function(newValue, oldValue) {
        console.log('product change');
        
      }
    },
    computed: {
      ...mapGetters({
        product: 'getCurProduct'
      })
    },
    methods: {
      addFavorite: function(){
        this.$$('.add-favorite i').html(this.$$('.add-favorite i').html() 
          == 'favorite'?'favorite_border':'favorite');
      },
      addToCart: function(){
        this.$$('.add-to-cart').prepend('<i class="material-icons lens">lens</i>');
        Velocity(this.$$('.material-icons.lens'), {translateX: -100},{duration:2000});
        Velocity(this.$$('.material-icons.lens'), {translatey: -100},{duration:1000,queue:false});
        Velocity(this.$$('.material-icons.lens'), {translatey: 100},{duration:1000});
        this.cartLength++;
      },
      toCart: function(){
        console.log(this.$$('.view-main')[0].f7View.history);
        this.$router.load({url:'/cart/'});
      },
      toHome: function(){
        console.log(this.$$('.view-main')[0].f7View.history);
        if(this.$$('.page[data-page=home].cached').length>0)
          this.$router.back({pageName:'home',force:true});
        this.$router.back();
      },
      toDetail: function (item) {
        this.$router.load({url:'/detail/?id='+item});
      },
    },
    created: function(){
      var query = this.$route.query;
      this.cur_pId = query.id;
      this.$store.dispatch('getProductById',{
          id:query.id, 
          cb:()=>{
            console.log(this.product);
            var swiper = this.$$('.page-on-center #swiper-product-'+this.product.id)[0].swiper;
            for(var img of this.product.imgs){
              swiper.appendSlide('<div class="swiper-slide"><img src="'+img+'" class="home-swiper"></img></div>');
            }
            console.log('user defined call back');
            Velocity(this.$$('.detail'), 'transition.fadeIn');
            Velocity(this.$$('.detail-product-list'), 'transition.fadeIn', {display:'flex'});
            Velocity(this.$$('.shadow-img'), 'transition.fadeOut');
          }, 
          errorCb:()=>{
            alert('获取商品失败')
          }
        }
      );
      
      if(query.anim!=undefined){
        this.anim = query.anim.split('_');
        console.log(this.anim);
        var x = this.anim[0],
            y = this.anim[1],
            src = this.anim[2];

        this.shadow_img_css.top = y+'px';
        this.shadow_img_css.left = x+'px';
        this.temp_img = src;
      }
    },
    mounted: function(){
      var shadowImg = this.$$('.shadow-img'),
            detail = this.$$('.detail');
      if(this.anim!=''){
         var x = this.anim[0],
            y = this.anim[1], 
            to_x = 0,
            to_y = 44,
            to_w = this.$$(".view-main").width(),
            to_h = this.$$(".swiper-container.detail").height();

        console.log(to_x,to_y,to_w,to_h);
        console.log(to_x-x,to_y-y,to_w,to_h);

        Velocity(
          this.$$('.shadow-img')
          ,{ 
            translateX: to_x-x,
            translateY: to_y-y,
            width: to_w,
            height: to_h
          }, {

          }
        );
      }else{
        this.$$('.shadow-img').hide();
      }
    }
  }
</script>

<style>
  .detail,.detail-product-list{
    opacity: 0;
  }
  /*
    导航栏
  */
  
  /*
    商品图片展示区
  */
 
  .swiper-container.detail{
    height: 26rem;
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
  .service-list{
    margin:5px 0;
  }
  .detail-hr{
    border: none;
    border-top: 1rem solid #f4f4f4;
    margin: 0;
  }
  /*
    商品详述区
  */
  .detail-swiper{
    width:100%
  }
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
  .add-to-cart,.check-cart,.add-favorite,.buy{
    border:none;
    border-top: 1px solid #c7c7c7;
    border-radius: 0;
  }
  .add-favorite{
    border-right: 1px solid #c7c7c7;
  }
  .add-favorite .icon,.check-cart .icon{
    display: inline-block !important;
  }
  .buy{
    color: #000;
    border-left: 0.1px solid #c7c7c7;
  }
  .add-to-cart{
    background-color: #b4282d;
    color: #fff;
    border: 1px solid #b4282d;
  } 
  .add-to-cart.button.active-state{
    background-color:rgb(154,39,39);
  }
  .material-icons.lens{
    color:#b4282d;
    font-size: 18px;
    position:absolute
  }
</style>