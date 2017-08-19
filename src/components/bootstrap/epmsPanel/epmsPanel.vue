<template>
  <div class="panel panel-default">
    <div class="panel-heading" v-if="hasHead">{{headText}}</div>
    <div class="panel-body">
      <slot name="panelBody"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'epmsPanel',
    props: {
      hasHead: {
        type: Boolean,
        default: true
      },
      headText: {
        type: String
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
