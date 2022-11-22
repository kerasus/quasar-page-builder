const OptionPanel = {
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
                return this.options
            },
            set(newValue) {
                this.$emit('update:options', newValue)
            }
        }
    },
    methods: {
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
