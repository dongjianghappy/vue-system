const install = (Vue:any) => {
  Vue.config.globalProperties.$drag = {

    init(callback: any){

    const el = document.getElementsByClassName('dragObj')

    let moveIndex: any = ""
    let enterIndex: any = ""
    let findex: any = ""
    
    for(let i = 0; i < el.length; i++){
      // 开始拖拽
      el[i].addEventListener('dragstart', (e: any) => {
        moveIndex = e.currentTarget.getAttribute('index')
        findex = e.currentTarget.getAttribute('findex')
      })

      // 开始拖拽
      el[i].addEventListener('dragenter', (e: any) => {
        enterIndex = e.currentTarget.getAttribute('index')
        e.currentTarget.style.background = "#fafafa"
        if (moveIndex === enterIndex) {
          return
        }
      })

      // 开始拖拽
      el[i].addEventListener('dragleave', (e: any) => {
        e.currentTarget.style.background = "none"
        // alert("3")
      })

      // 拖拽结束
      el[i].addEventListener('dragend', () => {
        callback({
          moveIndex,
          enterIndex,
          findex
        })
      })
    }
    },


  }
}



export default install
    
