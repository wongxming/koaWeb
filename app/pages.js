var views = require('co-views');
var path = require('path');
var viewsPath = path.resolve(__dirname, "../views");
var render = views(viewsPath, {
    map: { njk: 'nunjucks' }
});
var Order = require('../model/order');

var Utils = require('../utils/utils');


var Pages = {

    home: function*() {
        var data = {
            title: 'Home ',
            tmpPath: viewsPath
        };

        var mobile = this.cookies.get('mobile');
        
        if (mobile) {
            var dateStr = Utils.getFormatDate();
            var order = yield Order.findOne({ mobile: mobile, date: dateStr });
            if (order) {
                this.redirect('app/showOrder');
                return;
            }
        }

        this.body = yield render('home.njk', data);
    },
    showOrder: function*() {
        var data = {
            title: '下单',
            tmpPath: viewsPath
        };
        this.body = yield render('app/showOrder.njk', data);
    },
    shoppingCart: function*() {
        var data = {
            title: '下单',
            tmpPath: viewsPath
        };
        this.body = yield render('app/shoppingCart.njk', data);
    },


    addProduct: function*() {
        var data = {
            title: '添加商品',
            tmpPath: viewsPath
        };
        this.body = yield render('app/admin/addProduct.njk', data);
    },
    addOrder: function*() {
        var data = {
            title: '下单',
            tmpPath: viewsPath
        };
        this.body = yield render('app/admin/addOrder.njk', data);
    }
};

exports = module.exports = Pages;
