# Vue-refresh
Vue pull down refresh and infinite scrolling with loader.


[![GitHub issues](https://img.shields.io/github/issues/keshavkatwe/vue-pull-to-refresh.svg?style=for-the-badge)](https://github.com/keshavkatwe/vue-pull-to-refresh/issues)
[![GitHub stars](https://img.shields.io/github/stars/keshavkatwe/vue-pull-to-refresh.svg?style=for-the-badge)](https://github.com/keshavkatwe/vue-pull-to-refresh/stargazers)
[![GitHub license](https://img.shields.io/github/license/keshavkatwe/vue-pull-to-refresh.svg?style=for-the-badge)](https://github.com/keshavkatwe/vue-pull-to-refresh/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm.svg?style=for-the-badge)](https://github.com/keshavkatwe/vue-pull-to-refresh)

## Live Examples
<img src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fkeshavkatwe.github.io%2Fvue-pull-to-refresh%2Fexamples%2Fdist%2F&chs=180x180&choe=UTF-8&chld=L|2' alt=''>

[examples](https://keshavkatwe.github.io/vue-pull-to-refresh/examples/dist/)

## Installation
```
 npm install vue-refresh --save
```

## Use Setup
``` vue
<template>  
   <div class="news__list">
        <pull-to-refresh @refresh="refresh" ref="list" :triggerRefreshOnMounted="true">
            <div class="news" v-for="(article, key) in articles" :key="key">
                <h4 class="news__title">{{article.title}}</h4>
                <p class="news__desc">{{article.description}}</p>
            </div>
        </pull-to-refresh>
    </div>
</template>

<script>
  import PullToRefresh from '../../src/pullToRefresh'
  import Service from '../service'
  
  export default {
    name: 'example',
    components: {
      PullToRefresh
    },
    data() {
      return {
        articles: [],
      }
    },
    methods: {
     refresh(finish) {
       Service.getNews.then(res => {
        this.articles = res.articles;
        finish();
       });
      },
    }
  }
</script>
 ```

 
 ## API Docs
 
 ### props
| Attribute | Description | type | Default |
| --- | --- | --- | --- | 
| sliding-threshold | Slip the threshold (the greater the value the slower the sliding) | Number | 2 |
| top-slidingHeight | The height of the block element area outside the top of the scroll container | Number | 80 |
| wrapper-height | The height of the scrolling container | String | '100%' |
| refresh | Top drop-down method | Function | |
| triggerScroll | Scroll bottom end | Function | |

```
 ### slots
| Name | Description | scope |
| --- | --- | --- |
| default | The default slot scrolls the contents of the container |
| top-scroll-container | Scroll the contents of the top of the container outer (support the scope slot need to use `template` tag with slot-scope `attribute`) | `state`：Current state |

 ### events
| name | Description |
| --- | --- |
| refresh | Pull down the trigger, with the `action` parameter to be called after success or failure |
| triggerScroll | Triggered when the scroll container scrolls to the end |
