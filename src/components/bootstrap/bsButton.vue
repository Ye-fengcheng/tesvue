<template>
  <div>
    <button
      class="btn btn-default" 
      type="submit"
      @click="greet">
      {{ title }}
    </button>
    <p> {{count}} </p>
  </div>
</template>

<script>
  export default {
    name: 'bsButton',
    props: {
      title: {
        type: String,
        default: 'btn'
      }
    },
    computed: {
      count () {
        return this.$store.state.count
      }
    },
    methods: {
      greet () {
        this.$store.commit({
          type: 'increment',
          amount: 2
        })
        this.$emit('bsClick')
      }
    }

  }
</script>
