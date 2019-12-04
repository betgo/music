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
            let { songs,selectId  } = data;
            // console.log("渲染数据", data)
            // console.log("songs", songs)
            if (songs.length != 0) {
                let LiList = songs.map((song) => {
                    return `<li data-song-id="${song.id}">${song.songname}</li>`;
                });
                LiList.map((domLi) => {
                    $el.find('ul').append(domLi);
                })
            }
            if(selectId){
                this.activeItem($(`[data-song-id="${selectId}"]`))
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
        activeItem(li) {
            $(li).addClass('active')
                .siblings('.active').removeClass('active')
        },
        reset(){
            $(this.el).find('li').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: [],
            selectId:"",
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
            this.view.init(this)//this传入
            this.bindEventHub()
            this.bindevent()
        },
        bindevent() {
            $(this.view.el).on('click', 'li', (e) => {
                    //点击绑定
                let songId = e.currentTarget.getAttribute('data-song-id');
                this.model.data.selectId = songId
                this.view.render(  this.model.data)
                let song =this.model.data.songs.filter((s)=> s.id == songId)
                window.eventHub.emit('select',{...song})
            })
        },
        bindEventHub() {
            window.eventHub.on("create", (songData) => {
                this.model.data.songs.push(songData)
                this.view.render(this.model.data);
            })
            window.eventHub.on("new",(data)=>{
                this.view.reset()
            })
            window.eventHub.on("update",(song)=>{
                console.log("upadate收到 song",song)
                let songssss = this.model.data.songs
                for (let i = 0; i < songssss.length; i++) {
                    if (songssss[i].id === song.id){
                        console.log('i :', i);
                        Object.assign(songssss[i],song)
                    }
                }
                this.view.render(this.model.data);

            })
        }
    }
    controller.init(view, model)
    window.app.songlist = controller
}