<template>
  <f7-page name="cart">

    <!-- 购物车页面 -->
    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-material="navigate_before" back></f7-link>
      </f7-nav-left>
      <f7-nav-center>购物车</f7-nav-center>
      <f7-nav-right>
        <f7-link icon-material="home" @click="toHome"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page Content -->    

    <!-- Search-through list -->
    

  </f7-page>
</template>

<script>
  
  
        
export default {
    data: function () {
      return {
       
      }
    },
    methods: {
      toHome: function(){
        console.log(this.$$('.view-main')[0].f7View.history);
        if(this.$$('.page[data-page=home].cached').length>0)
          this.$router.back({pageName:'home',force:true});
        this.$router.back();
      }
    },
    created: function(){
    }
  }
</script>

<style>

  
</style>