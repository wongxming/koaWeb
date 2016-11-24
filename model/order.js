var mongoose = require('./mongodb');

//var ObjectId = mongoose.Schema.Types.ObjectId;

var orderSchema = new mongoose.Schema({
    //送货地址
    address: {
        type: String,
        required: true
    },
    //收货人
    name: {
        type: String,
        required: true
    },
    //收货人手机号
    mobile: {
        type: String,
        required: true
    },
    //购买的产品列表
    products: {
        type: Array,
        default: []
    },
    //订单更新人
    modifier: {
        type: String,
        default: 'sys'
    },
    //状态
    status: {
        type: String,
        default:'new'//new,accept,deliver,over
    },
    //yyyyMMdd
    date: {
        type: String
    },
    //总价
    totalPrice: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
});

orderSchema.methods.getDisplayPrice = function() {
    return '$' + (this.total_price / 100).toFixed(2);
};

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
