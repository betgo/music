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
            console.log("渲染数据", data)
            console.log("songs", songs)
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
            var query = new AV.Query('Song');
            query.find().then((songs) => {
                songs.map((song) => {
                    _this.model.data.songs.push(song.attributes);
                })
                this.render(_this.model.data)
            }
            )
        }

    }
    let model = {
        data: {
            songs: []
        }
    }
    let controller = {
        init(view, data) {
            this.view = view
            this.model = model
            this.view.init(this)//this传入
            window.eventHub.on("create", (songData) => {
                console.log("获得到create", songData)
                console.log("this1", this)
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