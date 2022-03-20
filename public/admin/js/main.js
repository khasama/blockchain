// Call the dataTables jQuery plugin
$(document).ready(function () {
    $("#dataTable").DataTable();
    
    $(".editProd").click(function(){
        const id = this.getAttribute("data-id");
        $.ajax({
            method: "GET",
            url: `${window.location.origin}/product/get/${id}`
        }).done((res) => {
            const product = res[0];
            console.log(product);
            $("#editName").val(product.name);
            $("#editDescription").val(product.description);
            $("#editPrice").val(product.price);
            $("#idProduct").val(product._id);
            $("#useImg").val(product.image);
            $("#img").attr("src", `/img/product/${product.image}`);
        }).fail(() => {
            alert("Error !!!!");
        });
    });

    $(".deleteProd").click(function(){
        const id = this.getAttribute("data-id");
        const img = this.getAttribute("data-img");
        if (confirm("Are you sure about that?")) {
            $.ajax({
                method: "POST",
                url: `${window.location.origin}/product/delete`,
                data: {id: id, img: img}
            }).done(() => {
                location.reload();
            }).fail(() => {
                alert("Error !!!!");
            });
        } else {
            return false;
        }
        
    });

    $(".deleteUser").click(function(){
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure about that?")) {
            $.ajax({
                method: "POST",
                url: `${window.location.origin}/user/delete`,
                data: {id: id}
            }).done(() => {
                location.reload();
            }).fail(() => {
                alert("Error !!!!");
            });
        } else {
            return false;
        }
        
    });
    
});


