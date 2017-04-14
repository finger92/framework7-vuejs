/**
 * Mocking client-server processing
 */
const img = require('../assets/example.png')
const title_ad = require('../assets/title_ad.jpg')

const _advertisements = (() => {
          var its = [];
          for (var i = 0; i < 3; i++) {
            var it = {id:i+1, img:title_ad};
            its.push(it);
          }
          return its;
        })()

const _products = (() => {
          var its = [];
          for (var i = 0; i < 100; i++) {
            var it = {id:i+1, img:img};
            its.push(it);
          }
          return its;
        })()

const _product = {
  id:1,
  title:'进口榉木T形煎饼推',
  shortDesc:'description',
  price:'$5',
  style:['23cm*13cmx1'],
  imgs:[require('../assets/detail_img1.png'),
    require('../assets/detail_img2.jpg'),
    require('../assets/detail_img3.jpg'),
    require('../assets/detail_img4.jpg'),
    require('../assets/detail_img5.jpg')],
  service:["30天无忧退货", 
            "48小时快速退款", 
            "满88元免邮费", 
            "自营品牌"],
  params:[{key:"材质", value:"德国进口榉木"},
    {key:"尺寸", value:"长23cm 宽13cm"},
    {key:"注意", value:"圆孔"}],
  intros:[
    require('../assets/detail_img1.png'),
    require('../assets/detail_img2.jpg'),
    require('../assets/detail_img3.jpg'),
    require('../assets/detail_img4.jpg'),
    require('../assets/detail_img5.jpg')
  ]
}



const itemPerPage = 10

export default {
  getAdvertise (commit) {
    setTimeout(() => {
      commit(_advertisements);
      console.log('(ads) ajax done');
    }, 1000)
  },
  
  getProducts (page, cb, commit) {
    setTimeout(() => {
      commit(_products.slice(itemPerPage*page,itemPerPage*(page+1)));
      console.log('(products) ajax done');
      if(typeof cb != undefined & cb instanceof Function)
        cb();
    }, 1000)
  },
  
  getProductById (id, cb, errorCb, commit) {
    setTimeout(() => {
      if(_product.id!=id){
        if(typeof errorCb != undefined & errorCb instanceof Function)
          errorCb();
        return;
      }
      commit(_product);
      console.log('(product'+id+') ajax done');
      if(typeof cb != undefined & cb instanceof Function)
        cb();
    }, 1000)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
