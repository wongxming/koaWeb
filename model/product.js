var mongoose = require('./mongodb');

//var ObjectId = mongoose.Schema.Types.ObjectId;

var productSchema = new mongoose.Schema({
    //商品名字
    pName: {
        type: String,
        required: true
    },
    //图片
    imgUrl: {
        type: String,
        required: true
    },
    //单价
    price: {
        type: Number,
        default: 0
    },
    //上架，下架
    onSale: {
        type: String,
        default: 'y'
    },
    //描述
    desc: {
        type: String,
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


var Product = mongoose.model('Product', productSchema);

module.exports = Product;
