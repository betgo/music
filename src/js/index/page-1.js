{
    let view = {
        el:'.tabctitem',
        templete:`
        
        `
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            
            this.loadModule1()
            
        },
        loadModule1(){
            let script1 =document.createElement('script')
            script1.src = './js/index/page-1-1.js'
            script1.onload =function (){
                console.log("模块一加载完毕")
            }
            document.body.appendChild(script1);
        }
    }
    controller.init(view,model)
}