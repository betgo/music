{
    let view = {
        el: "#tabs",
        init() {
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('click','a',(e)=>{
                
              
                let $li =$(e.currentTarget)
                $li.addClass('z-selected')
                    .siblings().removeClass('z-selected')
            })
        }
    }
    controller.init(view,model)
}
