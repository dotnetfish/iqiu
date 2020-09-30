<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
      setTimeout(() => {
      const div = document.createElement('div')
      div.innerHTML = this.$route.query.htmls;
      document.body.appendChild(div);
      document.forms[0].submit();
     }, 200);
  },
};
</script>