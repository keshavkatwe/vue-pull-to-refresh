<template>
    <div class="pull__container" @touchstart="touchStart" @touchmove="touchMoving" @touchend="touchEnd">
        <slot name="top-scroll-container" :state="state">
            <div class="pull__spinner_container">
                <div class="pull__spinner" :class="spinnerClass"
                     :style="{transform: 'translateY('+transformYValue+'px) rotate('+(transformYValue * 5)+'deg)'}">
                    <div class="circle__idle"></div>
                    <svg class="circle__spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33"
                                r="30"></circle>
                    </svg>
                </div>
            </div>
        </slot>

        <div class="pull__list" ref="list" @scroll="scrolling">
            <slot/>
            <div class="loadMore" v-if="isLoadMoreLoading">
                <svg class="loadMore__spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33"
                            r="30"></circle>
                </svg>
            </div>
        </div>

    </div>
</template>

<script>
    const STATES = {
        IDLE: 'IDLE',
        START: 'START',
        TRIGGERED: 'TRIGGERED'
    };

    export default {
        props: {
            topSlidingHeight: {
                type: Number,
                default: 80
            },
            slidingThreshold: {
                type: Number,
                default: 2
            },
            triggerRefreshOnMounted: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            if (this.triggerRefreshOnMounted) {
                this.triggerRefresh();
            }
        },
        computed: {
            spinnerClass() {
                if (this.state == STATES.IDLE) {
                    return 'pull__spinner--animate';
                }
                else if (this.state == STATES.TRIGGERED) {
                    return 'pull__spinner--active';
                }
                return '';
            },
        },
        data() {
            return {
                startY: 0,
                endY: 0,
                transformYValue: 0,
                state: STATES.IDLE,
                isLoadMoreLoading: false
            }
        },
        methods: {
            touchStart(e) {
                if (this.state != STATES.TRIGGERED && this.$refs.list.scrollTop == 0) {
                    this.startY = e.touches[0].pageY;
                    this.state = STATES.START;
                }
            },
            touchMoving(e) {
                if (this.state == STATES.START && this.$refs.list.scrollTop == 0) {
                    this.endY = e.touches[0].pageY;
                    const diff = this.endY - this.startY;

                    if ((diff / this.slidingThreshold) <= this.topSlidingHeight) {
                        this.transformYValue = diff / this.slidingThreshold;
                    }
                }
            },
            touchEnd() {
                if (this.$refs.list.scrollTop == 0) {
                    const diff = this.endY - this.startY;
                    if (diff / this.slidingThreshold >= this.topSlidingHeight) {
                        this.triggerRefresh();
                    }

                    if (this.state == STATES.START) {
                        this.finishLoading();
                    }
                }
            },
            triggerRefresh() {
                this.state = STATES.TRIGGERED;
                this.$emit('refresh', this.finishLoading);
                this.transformYValue = this.topSlidingHeight;
            },
            finishLoading() {
                this.transformYValue = 0;
                this.state = STATES.IDLE;
            },
            scrolling() {
                if (!this.isLoadMoreLoading && this.$refs.list.offsetHeight + this.$refs.list.scrollTop == this.$refs.list.scrollHeight) {
                    this.isLoadMoreLoading = true;
                    this.$emit('triggerScroll', this.finishInfiniteScrollLoading);
                }
            },
            finishInfiniteScrollLoading() {
                this.isLoadMoreLoading = false;
            },
        }
    }
</script>

<style lang="scss" scoped>

    $offset: 187;
    $duration: 1.4s;
    $lineColor: #01579B;
    $speed: 1s;

    @mixin animate($property:all, $duration: .35s, $effect: linear, $delay: 0s) {
        transition-property: $property;
        transition-duration: $duration;
        transition-timing-function: $effect;
        transition-delay: $delay;
    }

    .pull__container {
        position: relative;
        overflow: hidden;
        height: 100%;

        .pull__list {
            overflow: scroll;
            height: 100%;

            .loadMore {
                text-align: center;
                .loadMore__spinner {
                    height: 30px;
                    animation: rotator $duration linear infinite;
                    margin-top: 10px;

                    .path {
                        stroke-dasharray: $offset;
                        stroke-dashoffset: 0;
                        transform-origin: center;
                        stroke: $lineColor;
                        animation: dash $duration ease-in-out infinite;
                    }
                }
            }
        }

        .pull__spinner_container {
            text-align: center;
            position: absolute;
            width: 100%;
            left: 0;
            top: -40px;

            .pull__spinner {
                background-color: #FFFFFF;
                display: inline-block;
                border-radius: 50%;
                height: 34px;
                width: 34px;
                box-shadow: 0px 0px 6px 0px #b1b1b1;

                &.pull__spinner--animate {
                    @include animate(0.01s);
                }

                .circle__idle {
                    //background-color: $lineColor;
                    margin-top: 9px;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    display: inline-block;
                    border: 8px $lineColor;
                    border-top: 0;
                    border-right: 0;
                    border-style: solid;
                    position: relative;

                    &:before {
                        content: " ";
                        height: 12px;
                        width: 12px;
                        background-color: #FFFFFF;
                        position: absolute;
                        top: 2px;
                        border-radius: 50%;
                        left: -6px;
                    }

                    &:after {
                        content: " ";
                        background-color: #01579B;
                        position: absolute;
                        top: -2px;
                        left: 0;
                        border: 3px solid #FFF;
                        border-left-color: #01579B;
                    }
                }

                .circle__spinner {
                    animation: rotator $duration linear infinite;
                    margin-top: 9px;
                    height: 16px;
                    display: none;

                    .path {
                        stroke-dasharray: $offset;
                        stroke-dashoffset: 0;
                        transform-origin: center;
                        stroke: $lineColor;
                        animation: dash $duration ease-in-out infinite;
                    }
                }

                &.pull__spinner--active {
                    .circle__spinner {
                        display: inline-block;
                    }

                    .circle__idle {
                        display: none;
                    }
                }
            }
        }
    }

    @keyframes rotator {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: $offset;
        }
        50% {
            stroke-dashoffset: $offset/4;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: $offset;
            transform: rotate(450deg);
        }
    }
</style>