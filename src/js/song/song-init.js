
{
    let view = {
        el:'.player',
        template:  `
        <audio id="music" autoplay preload="true">
        <source src="{{url}}">
        <source src="{{url}}">
          </audio>
      <div id="audioplayer">
          <button id="pButton" class="play"></button>
        <div id="timeline">    
                  <div id="playhead"></div>
        </div>
      </div>
        `,
        render(data){
           
                 let $el =$(this.el)
            let {song} =data
            song.map(
                (s)=>{
                    $audio =this.template.replace("{{url}}",s.url).replace("{{url}}",s.url)
                       $el.append($audio)
                }
            )
        },
        init(model){
           return  model.find().then(()=>{
                this.render(model.data)
            },
            (erro)=>{
                console.log(erro)
            }
            )   
        }
    }
    let model = {
        data:{
            id:'',
            song:[],
        },
        find(){
            var query = new AV.Query('Song');
            query.equalTo('objectId', this.data.id);
           return  query.find().then( (songs)=> {
               console.log(songs)
               songs.map((song)=>this.data.song.push({...song.attributes})) 
              });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.model.data.id=this.getId()
            this.view.init(this.model).then(  this.loadModule())
          
        },
        getId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(4)
            }
            return search
        },
        loadModule(){
            let script1 =document.createElement('script')
            script1.src = './js/song/song-play.js'
            script1.onload =function (){
                console.log("模块song-play加载完毕")
            }
            document.body.appendChild(script1);
        }
    }
    controller.init(view,model)
}

