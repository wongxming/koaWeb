var Order = require('../model/order');
var Product = require('../model/product');

var Utils = require('../utils/utils');

var laoMaPie = {

    getAllProducts: function*() {
        var postData = this.request.query;
        var query = {};
        if (postData.onSale) {
            query.onSale = postData.onSale;
        }
        var data = yield Product.find(query);

        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    addProduct: function*() {

        var postData = this.request.body;
        if (this.method == 'GET') {
            postData = this.request.query;
        }
        console.log(postData);
        //pName,imgUrl,price,desc
        var p = new Product({
            pName: postData.pName,
            imgUrl: postData.imgUrl,
            price: postData.price,
            desc: postData.desc
        });

        var data = yield p.save();
        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    getAllOrders: function*() {

        var data = yield Order.find({});

        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    submitOrder: function*() {

        var postData = this.request.body;
        if (this.method == 'GET') {
            postData = this.request.query;
        }

        console.log(JSON.stringify(postData));
        //address,name,mobile,products,modifier,date,totalPrice
        var order = new Order({
            name: postData.name,
            address: postData.address,
            mobile: postData.mobile,
            modifier: postData.name
        });
        this.cookies.set('mobile', order.mobile, { httpOnly: false });
        postData.products = JSON.parse(postData.productsStr);
        //记录商品ids
        var products = [];
        //记录商品id->count
        var pCounts = new Array();
        for (var key in postData.products) {
            var pId = postData.products[key].pId;

            pCounts[pId] = postData.products[key].pCount;
            //
            products.push(pId);
        }


        var buyProducts = yield Product.find({ onSale: 'y' }).where('_id').in(products);

        var buyPds = [];
        //计算总价
        var totalPrice = 0;
        for (var key in buyProducts) {

            var buyP = {};
            buyP.pId = buyProducts[key]._id;
            buyP.price = buyProducts[key].price;
            buyP.pName = buyProducts[key].pName;
            buyP.imgUrl = buyProducts[key].imgUrl;

            buyP.count = pCounts[buyP.pId];
            buyPds.push(buyP);

            totalPrice += buyP.price * buyP.count;

        }

        order.totalPrice = totalPrice;
        order.products = buyPds;
        order.date = Utils.getFormatDate();

        var data = yield order.save();
        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    acceptOrder: function*() {

        var postData = this.request.body;
        if (this.method == 'GET') {
            postData = this.request.query;
        }
        var _id = postData.id;

        var updateJson = { modifier: "wxm", status: "accept", update_time: new Date() };

        yield Order.findByIdAndUpdate(_id, { $set: updateJson });
        var data = yield Order.findOne({ _id: _id });

        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    deliverOrder: function*() {

        var postData = this.request.body;
        if (this.method == 'GET') {
            postData = this.request.query;
        }

        var _id = postData.id;
        var updateJson = { modifier: "wxm", status: "deliver", update_time: new Date() };

        yield Order.findByIdAndUpdate(_id, { $set: updateJson });
        var data = yield Order.findOne({ _id: _id });
        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    },
    getOrder: function*() {

        var postData = this.request.query;
        var dateStr = Utils.getFormatDate();

        var data = yield Order.findOne({ mobile: postData.mobile, date: dateStr });

        if (data) {
            this.body = { code: 0, data: data };
        } else {
            this.body = { code: 1, msg: '服务异常' };
        }
    }
};


exports = module.exports = laoMaPie;
