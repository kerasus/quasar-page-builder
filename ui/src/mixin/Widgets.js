const options = {
  section: {
    fullHeight: {
      label: 'ارتفاع کامل',
      type: 'boolean',
      value: false,
      name: 'fullHeight'
    },
    height: {
      label: 'ارتفاع کامل',
      type: 'text',
      value: '100vh',
      name: 'height'
    },
    verticalAlign: {
      label: 'چینش عمودی',
      type: 'text',
      value: 'center',
      name: 'verticalAlign'
    }
  },
  row: {
    boxed: {
      label: 'باکس باشد؟',
      type: 'boolean',
      value: false,
      name: 'boxed'
    },
    boxedWidth: {
      label: 'عرض باکس',
      type: 'number',
      value: 1362,
      name: 'boxedWidth'
    }
  },
  col: {
    boxed: {
      label: 'باکس باشد؟',
      type: 'boolean',
      value: false,
      name: 'boxed'
    },
    boxedWidth: {
      label: 'عرض باکس',
      type: 'number',
      value: 1362,
      name: 'boxedWidth'
    },
    colNumber: {
      label: 'تعداد ستون',
      type: 'text',
      value: 'col-12',
      name: 'colNumber'
    },
    className: {
      label: 'کلاس متفرقه',
      type: 'text',
      value: '',
      name: 'className'
    }
  }
}

export const getElement = (element) => {
  let form
  if (element.type === 'section' || element.type === 'row' || element.type === 'col') {
    form = options[`${element.type}`]
  } else {
    form = element.info.options
  }
  return form
}

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
    }
  },
  data() {
    return {
      optionPanelDialog: false,
      defaultOptions: {}
    }
  },
  created() {
    this.mergeOptionsToDefaultOptions()
  },
  computed: {
    className() {
      if (!this.defaultOptions.className) {
        this.defaultOptions.className = ''
      }
      // TODO: adding more vertical align values such as top & bottom
      if (this.defaultOptions.verticalAlign === 'center') {
        this.defaultOptions.className += ' vertical-align-center'
      }

      if (this.editable) {
        this.defaultOptions.className += ' editable'
      }
      return this.defaultOptions.className
    }
  },
  methods: {
    mergeOptionsToDefaultOptions () {
      Object.assign(this.defaultOptions, this.options)
      if (!this.defaultOptions.style) {
        this.defaultOptions.style = {}
      }
    }
  }
}

export default mixinWidget
