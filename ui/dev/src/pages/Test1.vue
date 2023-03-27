<template>
  <q-page padding>
    <q-btn style="position: absolute; top: 0; left: 0; z-index: 2;"
           @click="editable = !editable">
      edit
    </q-btn>
    <q-page-builder v-model:sections="sections"
                    v-model:options="pageConfig"
                    :editable="editable" />
  </q-page>
</template>

<script>
export default {
  name: 'BaseComponent',
  data() {
    return {
      editable: false,
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TestComponent1Widget',
                        options: {
                        }
                      },
                      {
                        name: 'TestComponent2Widget',
                        options: {
                        }
                      },
                      {
                        name: 'TestComponent3Widget',
                        options: {
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'TestComponent2Widget',
                        options: {
                        }
                      },
                      {
                        name: 'TestComponent1Widget',
                        options: {
                        }
                      },
                      {
                        name: 'TestComponent3Widget',
                        options: {
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-6'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ]
    }
  },
  methods: {
    toggleEdit() {
      this.editable = !this.editable
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
