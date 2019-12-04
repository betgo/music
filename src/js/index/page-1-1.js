{
    let view = {
        el: '.remd_newsg',
        template: `
                <a class="m-sgitem" href="/src/song.html?id={{song.id}}">
                <div class="sgfr f-bd f-bd-btm">
                    <div class="sgchfl">
                        <div class="f-thide sgtl">{{song.songname}}</div>
                        <div class="f-thide sginfo"><i class="u-hmsprt sghot"></i>{{song.singer}}
                        </div>
                    </div>
                    <div class="sgchfr"><span class="u-hmsprt sgchply"></span></div>
                </div>
            </a>
        `,
        render(data) {
            let $el = $(this.el)

            let { songs } = data
            songs.map((song) => {
                let $div = this.template
                    .replace("{{song.id}}", song.id)
                    .replace("{{song.songname}}", song.songname)
                    .replace("{{song.singer}}", song.singer)
                $el.find('.m-sglst').append($div)
            })

        },
        init(_this) {
            _this.model.find().then(() => {
                this.render(_this.model.data)
            })
        }

    }
    let model = {
        data: {
            songs: [],
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
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init(this)
        }
    }
    controller.init(view, model)
}