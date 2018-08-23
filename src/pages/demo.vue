<template>
    <div>
        <div style="padding-left: 40px;">
            <slider-verify></slider-verify>
        </div>
        <div style="padding-left: 40px;">
            <pic-verify ></pic-verify>
        </div>
        <div>{{a | getKey('b') | getKey('c') | getKey('d')}}</div>
    </div>
</template>

<script>
    import SliderVerify from '@/components/sliderVerify';
    import PicVerify from '@/components/picVerify';

    export default {
        name: "demo",
        components: {
            SliderVerify,
            PicVerify,
        },
        data() {
            return {
                a: {
                    b: {
                        c: {
                            d: 123
                        }
                    },
                }
            };
        }
    };
</script>

<style scoped>

</style>
