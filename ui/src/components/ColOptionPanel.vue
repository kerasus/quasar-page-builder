<template>
    <div class="option-panel-container">
        <q-form
            @submit="onSubmitElement"
            class="q-gutter-md"
        >
            <div class="form-input"
                v-for="(item, index) in formOptions"
                :key="index">
            <label for="form"></label>
            <q-input v-model="item.value"
                    v-if="item.name === 'height' ? (item.type === 'text' && formData.fullHeight === true) :item.type === 'text'"
                    outlined
                    type="text"
                    :label="item.label" />
            <q-input v-model="item.value"
                    v-if="item.type === 'number'"
                    outlined
                    type="number"
                    :label="item.label" />
            <q-checkbox v-model="item.value"
                        v-if="item.type === 'boolean'"
                        :label="item.label" />
            </div>
            <div>
            <q-btn label="ذخیره"
                    type="submit"
                    color="primary" />
            </div>
        </q-form>
    </div>
</template>
<script>
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
    name:"ColOptionPanel",
    props: {
        data: {
            type: Object,
            default: () => {}
        },
        options: {
            type: Object,
            default: () => {}
        }
    },
    setup(props){
        const col = {
            name: 'col',
            options: {
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
                style: {
                    label: 'استایل',
                    type: 'text',
                    value: '',
                    name: 'style'
                },
                className: {
                    label: 'کلاس',
                    type: 'text',
                    value: '',
                    name: 'className'
                }
            },
            info: {
                widgets: [],
                type: 'col'
            },
            type: 'base',
            allowed: ['col']
        }
        const formOptions = ref({})

        const setOptions = () => {
            for (const opt in props.options) {
                const optionValue = props.options[`${opt}`]
                formOptions.value[`${opt}`] = col.options[`${opt}`]
                formOptions.value[`${opt}`].value = optionValue
            }
        }
        onBeforeMount(() => {
            setOptions()
        })

        return {
            col,
            formOptions,
            setOptions
        }
    }
})
</script>
<style lang="scss" scoped></style>