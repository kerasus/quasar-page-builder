const OptionPanel = {
  data: () => {
    return {
      defaultOptions: {}
    }
  },
  watch: {
    localOptions: {
      handler(newValue) {
        this.updateLocalOptions(newValue)
      },
      deep: true
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    kebabCaseStyle () {
      return Object.entries(this.localOptions.style)
        .map(([key, value]) => {
          const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
          return `${kebabKey}: ${value};`
        })
        .join(' ')
    },
    localOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.updateLocalOptions(newValue)
      }
    }
  },
  methods: {
    removeNullKeys () {

    },
    takeAction() {
      if (!this.localOptions.action.hasAction) {

      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'scroll') {
        this.scrollToElement(this.localOptions.action.scrollTo, this.localOptions.action.headerOffset)
      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'link') {
        this.redirectRoute(this.localOptions.action.route)
      } else if (this.localOptions.action.actionName && this.localOptions.action.actionName === 'event') {
        this.$bus.emit(this.localOptions.action.eventName, this.localOptions.action.eventArgs)
      }
    },
    scrollToElement(className, offset = 0) {
      const el = document.getElementsByClassName(className)[0]
      const headerOffset = offset
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    redirectRoute(url) {
      if ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1)) {
        window.open(url, '_blank')
      } else {
        this.$router.push(url)
      }
    },
    updateLocalOptions (newValue) {
      const newVal = newValue || this.localOptions
      this.$emit('update:options', newVal)
    }
  }
}

export default OptionPanel
