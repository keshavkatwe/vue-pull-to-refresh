<template>
    <div class="news__list">
        <pull-to-refresh @refresh="refresh" @triggerScroll="infiniteScroll" ref="list" :triggerRefreshOnMounted="true">
            <!--<template slot="top-scroll-container" slot-scope="item">-->
            <!--{{item}}-->
            <!--</template>-->
            <div class="news" v-for="(article, key) in articles" :key="key">
                <h4 class="news__title">{{article.title}}</h4>
                <p class="news__desc">{{article.description}}</p>
            </div>
        </pull-to-refresh>
    </div>
</template>

<script>
    import PullToRefresh from '../../src/pullToRefresh';
    import Service from '../service';

    export default {
        mounted() {
            // this.$refs.list.triggerRefresh();
        },
        data() {
            return {
                articles: [],
                pageNumber: 1
            }
        },
        components: {
            PullToRefresh
        },
        methods: {
            shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }

                return array;
            },
            refresh(finish) {
                this.pageNumber = 1;
                this.getNews(finish).then(res => {
                    this.articles = this.shuffleArray(res.articles);
                    finish();
                });
            },

            getNews() {
                let requestPayload = {
                    pageNumber: this.pageNumber,
                    pageSize: 20
                };
                return Service.getNews(requestPayload);
            },

            infiniteScroll(finish) {
                this.pageNumber++;
                this.getNews(finish).then(res => {
                    this.articles = this.articles.concat(res.articles);
                    finish();
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .news__list {
        height: calc(100vh - 32px);
        overflow: scroll;
        padding-top: 62px;
    }

    .news {
        background-color: #FFF;
        overflow: hidden;
        padding: 16px;
        border-bottom: 1px solid #DDD;

        .news__title {
            margin: 0;
            font-size: 14px;
        }

        .news__desc {
            font-size: 12px;
        }
    }
</style>