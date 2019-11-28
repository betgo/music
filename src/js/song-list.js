{
    let view = {
        el: '.song-list',
        template: `
       
    <ul class="songslist">
   </ul>

        `,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)
            let { songs } = data;
            // console.log("渲染数据", data)
            // console.log("songs", songs)
            if (songs.length != 0) {
                let LiList = songs.map((song) => {
                    return `<li>${song.songname}</li>`;
                });

                LiList.map((domLi) => {
                    $el.find('ul').append(domLi);
                })

            }

        },
        init(_this) {
            //获取歌曲
            _this.model.find().then(
                () => {
                    this.render(_this.model.data)
                }
            );
        },
        activeItem(li){
            let $li = $(li)
            $li.addClass('active')
                .siblings('.active').removeClass('active')
        }

    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then((songs) => {
                songs.map((song) => {
                    this.data.songs.push({ id: song.id, ...song.attributes });
                })
            })
        }
    }
    let controller = {
        init(view, data) {
            this.view = view
            this.model = model
            this.view.init(this)//this传入
            this.bindEventHub()
            this.bindevent()
        },
        bindevent() {
            console.log(this.view.el)
            $(this.view.el).on('click', 'li', (e) => {
                    
                    this.view.activeItem(e.currentTarget)
            })
        },
        bindEventHub() {
            window.eventHub.on("create", (songData) => {
                this.model.data.songs.push(songData)
                this.view.render(this.model.data);
            })
        },
        active() {
            $(this.view.el).children('.songslist').children('li').addClass('active');
        }
    }
    controller.init(view, model)
    window.app.songlist = controller
}