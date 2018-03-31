<template>
    <div class="header">
        <h4 class="header__title">Pull to refresh</h4>
    </div>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style lang="scss" scoped>
    .header {
        background-color: #01579B;
        overflow: hidden;
        height: 64px;
        box-shadow: 0px 3px 10px 2px #c3c3c3;
        position: fixed;
        width: 100%;
        z-index: 1;

        .header__title {
            color: #FFFFFF;
            font-size: 18px;
            margin: 0;
            margin-top: 20px;
            margin-left: 16px;
        }
    }
</style>