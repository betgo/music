{
    let view = {
        el: '.page >aside',
        template: `
        <div class="newsongs">新建歌曲</div>
        <div class="song-list"></div>
      
   <div class="upload-btn-wrapper">
           <button class="btn">拖拽上传音乐</button>
           <input name="file" type="file" class="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data="{ &quot;upload_preset&quot;:  &quot;ogrs8whk&quot;,&quot;folder&quot;:  &quot;test&quot;, 
           &quot;callback&quot;: &quot;https://www.example.com/cloudinary_cors.html&quot;
       }"></input>
           <div class="bar-wrapper">
               <div class="progress_bar"></div>
           </div>
       </div>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
        activeItem(data) {
            $(data).addClass('active')
        },
        duactive(e){
            $(e).removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, data) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEventHub()
            this.bindEvent()
        },
        bindEventHub() {
            window.eventHub.on("upload", (data) => {
                console.log("new-song 收到 upload")
                console.log(data)
            })
            window.eventHub.on("select", (data) => {
                    this.view.duactive('.newsongs')
            })
        },
        bindEvent() {
            $(this.view.el).on('click', '.newsongs', (e) => {
                this.view.activeItem(e.currentTarget)
                window.eventHub.emit("init",{})
            })
        }
    }
    controller.init(view, model)
    window.app.newsong = controller
}