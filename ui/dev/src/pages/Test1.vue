<template>
  <q-page padding>
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
      :preview="true"
      :editable="editable"
      @toggleEdit="toggleEdit"
    />
  </q-page>
</template>

<script>
export default {
  name: 'BaseComponent',
  data() {
    return {
      editable: false,
      pageConfig: {
        padding: {
          a: 'md'
        }
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {name: 'test-component1-widget'},
                      {name: 'test-component2-widget'}
                    ]
                  },
                  {
                    widgets: [
                      {name: 'test-component2-widget'},
                      {name: 'test-component1-widget'}
                    ]
                  }
                ]
              },
            ]
          },
          options: {
            style: {
              backgroundImage: 'url("https://nodes.alaatv.com/upload/images/slideShow/1666601246_8921.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            className: '123',
            fullHeight: true,
            verticalAlign: 'center'
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget',
                                      options: {
                                        style: { color: 'yellow !important' },
                                        className: 'q-ma-lg'
                                      }
                                    }
                                  ],
                                  options: {
                                    style: { border: '1px blue solid' }
                                  }
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ],
                              options: {
                                style: {},
                                className: 'boxed'
                              }
                            }
                          ]
                        }
                      }
                    ],
                    options: {
                      style: { color: 'blue !important' }
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget',
                                      options: {
                                        style: { color: 'yellow !important' },
                                        className: 'q-ma-lg'
                                      }
                                    }
                                  ],
                                  options: {
                                    style: { border: '1px blue solid' }
                                  }
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ],
                              options: {
                                style: {},
                                className: 'boxed target'
                              }
                            }
                          ]
                        }
                      }
                    ],
                    options: {
                      style: { color: 'blue !important' }
                    }
                  }
                ],
                options: {
                  style: { color: 'white' },
                  className: 'q-ma-md boxed'
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("https://nodes.alaatv.com/upload/images/slideShow/1666601246_8921.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            className: '',
            fullHeight: true,
            verticalAlign: 'center'
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            fullHeight: true,
            verticalAlign: 'center'
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ],
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
