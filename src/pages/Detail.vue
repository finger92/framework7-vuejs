<template>
  <f7-page>

    <!-- Navbar -->
    <f7-navbar back-link="Back">

    </f7-navbar>

    <!-- Page Content -->
    
    <f7-swiper pagination>
      <f7-swiper-slide v-for="img in detail_imgs"><div :data-background="img" class="lazy"></div></f7-swiper-slide>
    </f7-swiper>

    <!-- Search-through list -->

    <f7-grid class="product-list">
      <f7-col width="100" tablet-width="25">
        <f7-block inset>
          
        </f7-block>
      </f7-col>
    </f7-grid>

  </f7-page>
</template>

<script>
  let detail_imgs = [
    require('../assets/detail_img1.png'),
    require('../assets/detail_img2.jpg'),
    require('../assets/detail_img3.jpg'),
    require('../assets/detail_img4.jpg'),
    require('../assets/detail_img5.jpg')];
  
export default {
    data: function () {
      return {
        items: (function () {
          var it = [];
          for (var i = 0; i < 100; i++) it.push(i+1);
          return it;
        })(),
        detail_imgs: detail_imgs
      }
    },
    methods: {
      
    },
    mounted: function(){
      
    }
  }
</script>