
{
    let view = {
        el: '.page > main',
        init() {
            this.$el = $(this.el)
        },
        template: `
        <form class="form">
            <div class="row">
                <label>歌名</label>
                <input type="text" value="__songname__" name ="songname">
            </div>
            <div class="row">
                <label >歌手</label>
                <input type="text" name = "singer" value="__singer__" >
            </div>
            <div class="row">
                <label>外链</label>
                <input type="text" value="__url__" name="url">
            </div>
             <div class="row">
                 <label></label>
                <button type="submit">保存</button>
            </div>
        </form>`,
        render(data = {}) {
         
            let placholders = ['songname', 'url', 'singer'];
            let html = this.template;
            placholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '');
            })
            this.$el.html(html);
            if(data.id)
            {
                this.$el.prepend('<h1>编辑歌曲</h1>')
            }else{
                this.$el.prepend('<h1>新建歌曲</h1>')
            }
        },
        reset() {
            this.render();
        }
    }
    let model = {
        data: {
            songname: "",
            singer: "",
            url: "",
            id: "",
        },
        create(data) {
            let Song = AV.Object.extend('Song');
            let song = new Song();
            _this = this
            song.set('songname', data.songname);
            song.set('singer', data.singer)
            song.set('url', data.url)
            return song.save().then(function (newsong) {
                // 成功保存之后，执行其他逻辑
                let { id, attributes } = newsong;
                Object.assign(this.data, { id, ...attributes });
            }.bind(this), (error) => {
                console.log('error :', error);
            });
        }


    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init();
            this.view.render(this.model.data)
            this.bindEvent();
            this.bindEventHub();
          
        },
        render(data) {
            this.view.render(data)
        },
        bindEvent() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault();
                let needs = ['songname', 'singer', 'url'];
                let data = {};
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name="${string}"]`).val();
                })
                this.model.create(data)
                    .then(
                        () => {
                            this.view.reset();
                            console.log("发射")
                            __data = JSON.parse(JSON.stringify(this.model.data));
                            window.eventHub.emit("create", __data)
                        },
                        (err) => {
                            console.log('获取失败', err)
                        }
                    )
            })
        },
        bindEventHub(){
            window.eventHub.on("upload", (data) => {
                this.render(data);
            })
            window.eventHub.on("select", (data) => {
                console.log(data[0])
                console.log('this. :', this.model.data);
                this.view.render(data[0]);
            })
            window.eventHub.on("init", () => {
               this.view.reset()
            })
        }

    }
    controller.init(view, model)
    window.app.songform = controller
}