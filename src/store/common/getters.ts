const getters = {
  channel: (state: any) => state.channel || [],   
  recommendUser: (state: any) => state.recommendUser || [],   
  page: (state: any) => state.page || []
}

export default getters;