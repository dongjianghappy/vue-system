import authorized from "@/assets/authorized"

const install = (Vue:any) => {
  Vue.config.globalProperties.$auth = {
    init(param: any){
      let auth: any = []
      const arr = param.split("/")
      if(arr.length === 2){
        auth = authorized[arr[0]][arr[1]]
      }
      else if(arr.length === 3){
        auth = authorized[arr[0]][arr[1]][arr[2]]
      }
      else{
        auth = authorized[param]
      }

     
      return {
        checked: (data: any) => {
          const gradeList: any = sessionStorage.getItem('gradeList')
          const authority = (gradeList && gradeList.split(",")) || []
          if(authority[0] === "*" || authority.indexOf(auth[data]) > -1){
              return true
          }else{
              return false
          }
        }
      }
    }
  }
}
export default install
    
