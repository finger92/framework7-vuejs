<template>
  <f7-page>
    <f7-navbar title="Search" sliding>
      <f7-searchbar class="search-worker"
          :clear="true"
          @searchbar:search="onSearch"
          @searchbar:enable="onEnable"
          @searchbar:disable="onDisable"
          @searchbar:clear="onClear"
        >
    </f7-searchbar>
      <f7-nav-right>
        <f7-link @click="$route.view.router.back()">取消</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      <p>Here is About page!</p>
      <p>You can go <f7-link back>back</f7-link>.</p>
      <p>Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac habitasse platea dictumst.</p>
      <p>Fusce eros lectus, accumsan eget mi vel, iaculis tincidunt felis. Nulla tincidunt pharetra sagittis. Fusce in felis eros. Nulla sit amet aliquam lorem, et gravida ipsum. Mauris consectetur nisl non sollicitudin tristique. Praesent vitae metus ac quam rhoncus mattis vel et nisi. Aenean aliquet, felis quis dignissim iaculis, lectus quam tincidunt ligula, et venenatis turpis risus sed lorem. Morbi eu metus elit. Ut vel diam dolor.</p>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
    data: function () {
      return {
        items: (function () {
          var it = [];
          for (var i = 0; i < 100; i++) it.push(i+1);
          return it;
        })()
      }
    },
    methods: {
      onSearch: function (query, found) {
        console.log('search', query);
      },
      onClear: function (event) {
        console.log('clear');
      },
      onEnable: function (event) {
        console.log('enable2');
      },
      onDisable: function (event) {
        console.log('disable');
      },
      jumpToProduct: function (event) {
        alert("click");
      },
      doSearch: function (event) {
        alert("searching");
      }
    },
    mounted: function(){
      this.$$('.searchbar.search-worker input').focus();
    }
  }
</script>