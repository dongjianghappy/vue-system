// 更新保存
export const updateSave = (store: any, params: any) => {
  alert(store)
  // const store = useStore();
  alert("11111111111111")
  store.dispatch('common/Save', {
    api: "navigation",
    data: {
      coding: "P0001",
      data: JSON.stringify([{id: "123"}]),
    }
  }).then((res: any) => {
    // dataList.value = res.result.list
  })
}

      