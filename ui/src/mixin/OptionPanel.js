const OptionPanel = {
    data: () =>{
        return {
            defaultOption: {}
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
        localOptions: {
            get() {
                return Object.assign(this.defaultOption, this.options)
            },
            set(newValue) {
                this.updateLocalOptions(newValue)
            }
        }
    },
    methods: {
        removeNullKeys () {

        },
        updateLocalOptions (newValue) {
            const newVal = newValue ? newValue : this.localOptions
            this.$emit('update:options', newValue)
        },
        passOptions () {
            const data = {
                options: this.localOptions,
                data: this.data
            }
            this.$emit('submit', data)
        }
    }
}

export default OptionPanel
