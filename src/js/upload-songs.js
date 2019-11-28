 //配置
 $.cloudinary.config({
    cloud_name: 'dah1jcepx',
    secure: true
});



//fileupload绑定
$(document).ready(function () {
    if ($.fn.cloudinary_fileupload !== undefined) {
        $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
        console.log("ok");
    }
});
//上传事件绑定
$('.cloudinary-fileupload').bind('cloudinarydone', function (e, data) {

    console.log(data)
    let img = $.cloudinary.url(data.result.public_id)
    if(data.result.original_filename ===undefined){
        console.log("已有此文件")
        return 0;
    }
    window.eventHub.emit("upload",{
        songname:data.result.original_filename,
        url:data.result.url
    })
   
       // $('.ppp').attr('src', data.result.secure_url)
        // $('.image_public_id').val(data.result.public_id)
    return true;
});
//进度条
$('.cloudinary-fileupload').bind('cloudinaryprogress', function (e, data) {
    $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
});