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
    name:"SectionOptionPanel",
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
        const section = {
            name: 'section',
            options: {
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
                data: {
                    rows: []
                },
                options: {},
                type: 'section'
            },
            type: 'base',
            allowed: ['section', 'widget']
        }
        const formOptions = ref({})

        const setOptions = () => {
            for (const opt in props.options) {
                const optionValue = props.options[`${opt}`]
                formOptions.value[`${opt}`] = section.options[`${opt}`]
                formOptions.value[`${opt}`].value = optionValue
            }
        }
        onBeforeMount(() => {
            setOptions()
        })

        return {
            section,
            formOptions,
            setOptions
        }
    }
})
</script>
<style lang="scss" scoped></style>