export const useProps = {
  name: {
    type: String,
    default: ""
  },
  action: {
    type: String,
    default: "add"
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  },
  auth: {
    type: Boolean,
    default: false
  },
  kind: {
    type: String,
    default: "music"
  },
  disabled: {
    type: Boolean,
    default: false
  },
}