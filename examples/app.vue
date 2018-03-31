<template>
    <div>
        <TopHeader/>
        <div class="container">
            <PullDown/>
        </div>
    </div>
</template>

<script>

    import TopHeader from './header';
    import PullDown from './pages/pullDown';

    export default {
        name: "app",
        components: {
            TopHeader,
            PullDown
        }
    }
</script>

<style lang="scss">
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #ECEFF1;
        padding: 0;
        margin: 0;
    }

    .container {
        padding: 16px;
    }

    * {
        box-sizing: border-box;
    }
</style>