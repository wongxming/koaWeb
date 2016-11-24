
var appUtils = {
    getFormatDate: function() {
        var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        return '' + year + month + strDate;
    }
};

exports = module.exports = appUtils;
