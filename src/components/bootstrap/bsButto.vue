<template>
  <div>
    <button
      class="btn btn-default" 
      type="submit"
      @click="greet">
      {{ title }}
    </button>
    <p> {{count}} </p>
    <p> {{count1}} </p>
  </div>
</template>

<script>
  export default {
    name: 'bsButto',
    props: {
      title: {
        type: String,
        default: 'btn'
      }
    },
    computed: {
      count () {
        return this.$store.getters.filterThanTwo
      },
      count1 () {
        return this.$store.getters.modTwo
      }
    },
    methods: {
      greet () {
        this.$store.commit({
          type: 'increment',
          amount: 1
        })
      }
    }

  }
</script>
