// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/
import materialDisignIcons from 'material-design-icons/iconfont/material-icons.css'

import Velocity from 'velocity-animate/velocity.js'
import VelocityUi from 'velocity-animate/velocity.ui.js'

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

import store from './store'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    //material: true,
    routes: Routes,
    allowDuplicateUrls: true,
    onPageReinit: function(app,page){
      console.log(app,page);
    }
  },
  // Register App Component
  components: {
    app: App
  }
});
