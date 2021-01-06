<template>
  <div class="hello">
    <h1 class="text-3xl text-pink-500 font-bold">{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      <toy-icon icon="user-secret" />
      <toy-icon icon="address-book" size="40" />
      <toy-icon type="fab" icon="adn" />
    </p>
    <ul class="space-y-4">
      <li>
        <div class="w-64 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-56 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-48 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-40 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-32 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-24 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-20 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-16 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-12 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
      <li>
        <div class="w-10 h-3 bg-gradient-to-br from-fuchsia-500 to-purple-600"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
