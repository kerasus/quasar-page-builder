const mixinWidget = {
  props: {
    data: {
      type: Object,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    dragStatus: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      defaultOptions: {
        className: ''
      }
    }
  },
  methods: {
    getUpdateClassNamesWithKey (className, key, state) {
      const finalClassString = ' ' + key + ' '
      if (state && className.search(finalClassString) === -1) {
        className += finalClassString
      }
      if (!state) {
        className = className.replace(finalClassString, ' ')
      }

      return className
    }
  }
}

export default mixinWidget
