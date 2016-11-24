function formSubmit() {
    var postData = {};
    postData.pName = $("#pName").val()
    postData.imgUrl = $("#imgUrl").val()
    postData.price = $("#price").val()
    postData.desc = $("#desc").val()

    $.post('/api/addProduct', postData, function(response) {
        console.log(JSON.stringify(response));
    });
}
