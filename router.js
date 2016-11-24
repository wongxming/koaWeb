var router = require('koa-router')();
var laoMaPie = require('./api/laoMaPie');

//http://localhost:9001/api/addProduct?name=&img=&price=
router.post('/api/addProduct', laoMaPie.addProduct);
router.get('/api/addProduct', laoMaPie.addProduct);

//http://localhost:9001/api/getAllProducts   ?onSale=y
router.get('/api/getAllProducts', laoMaPie.getAllProducts);

//http://localhost:9001/api/getAllOrders?date=
router.get('/api/getAllOrders', laoMaPie.getAllOrders);

//http://localhost:9001/api/getOrder?mobile=
router.get('/api/getOrder', laoMaPie.getOrder);

//http://localhost:9001/api/submitOrder?name=&address=&mobile=
router.post('/api/submitOrder', laoMaPie.submitOrder);
router.get('/api/submitOrder', laoMaPie.submitOrder);

//http://localhost:9001/api/acceptOrder?id=
router.get('/api/acceptOrder', laoMaPie.acceptOrder);
//http://localhost:9001/api/deliverOrder?id=
router.get('/api/deliverOrder', laoMaPie.deliverOrder);


var pages = require('./app/pages');
router.get('/', pages.home);
router.get('/app/admin/addProduct', pages.addProduct);
router.get('/app/admin/addOrder', pages.addOrder);


router.get('/app/showOrder', pages.showOrder);

router.get('/app/shoppingCart', pages.shoppingCart);

exports = module.exports = router;
