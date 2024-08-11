<template>
  <div class="Test-component1-widget"
       :class="{'cursor-pointer': localOptions.action.hasAction}"
       @click="takeAction()">
    <component :is="'style'">
      {{ kebabCaseStyle }}
    </component>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
    Test-component-11111111111111111111111111111111111111111111111111
    <br>
  </div>
</template>

<script>
import { mixinOptionPanel, mixinWidget } from 'ui'

export default {
  name: 'Test-component1-widget',
  mixins: [mixinOptionPanel, mixinWidget],
  data: () => {
    return {
      defaultOptions: {
        style: {},
        boxShadows: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        },
        action: {
          hasAction: false,
          actionName: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  computed: {
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('localOptions.cssHoverEffects.borderStyle.borderCssString');
$hoverBorderRadius: v-bind('localOptions.cssHoverEffects.borderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.borderStyle.borderCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');

.Test-component1-widget {
  box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  border-radius: $borderRadius;
  -webkit-border-radius: $borderRadius;
  -moz-border-radius: $borderRadius;
  border: $border;
  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    -webkit-box-shadow: $hoverShadows;
    -moz-box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    -webkit-border-radius: $hoverBorderRadius;
    -moz-border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }
}
</style>
