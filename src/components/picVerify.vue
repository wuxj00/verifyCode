<template>
    <div class="pic" v-on:click="refreshCode">
        <canvas ref="picCode" :width="width+'px'" :height="height+'px'"></canvas>
    </div>
</template>

<script>
    const RANDOM_NUM = '0123456789'.split('');
    const RANDOM_LETTER ='abcdefghijklmnopqrstuvwxyz'.split('');

    const numRandom = (min, max) =>
        Math.floor(Math.random() * (max - min) + min);

    export default {
        name: "picVerify",
        props: {
            type: {
                type: String,
                default: 'blend' // blend letter number
            },
            width: {
                type: Number,
                default: 200
            },
            height: {
                type: Number,
                default:50
            }
        },
        mounted() {
            this.refreshCode();
        },
        methods: {
            getCodes() {
                return this.picCode;
            },
            refreshCode() {
                const picElem = this.$refs.picCode;
                const ctx = picElem.getContext('2d');

                ctx.save();
                ctx.fillStyle = this.getRandomColor(180, 240);
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.restore();

                const picCode = this.getRandomCode(4);
                this.picCode = picCode;

                ctx.moveTo(0, 0);
                ctx.textBaseline = "middle";
                picCode.forEach((code, index) => {
                    const x = this.width / 5 * (index + 1);
                    const y = this.height / 2;
                    const deg = numRandom(-30, 30);
                    this.drawCode(ctx, code, x, y, deg);
                });
                this.drawRandomLine(ctx);
                this.drawRandomDot(ctx);
            },
            getRandomColor(min, max) {
                const r = numRandom(min, max);
                const g = numRandom(min, max);
                const b = numRandom(min, max);
                return `rgb(${r},${g},${b})`;
            },
            drawCode(ctx, code, x, y, deg) {
                ctx.font = numRandom(this.height/2, this.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = numRandom(50, 160); //随机生成字体颜色
                ctx.shadowOffsetX = numRandom(-3, 3);
                ctx.shadowOffsetY = numRandom(-3, 3);
                ctx.shadowBlur = numRandom(-3, 3);
                ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(code, 0, 0);
                ctx.restore();
            },
            getRandomCode(len=4) {
                const type = this.type;
                let fullOpts = [];
                if(type === 'blend') {
                    fullOpts = RANDOM_LETTER.concat(RANDOM_NUM);
                } else if(type === 'number') {
                    fullOpts = RANDOM_NUM;
                } else {
                    fullOpts = RANDOM_LETTER;
                }
                const randomCode = [];
                for(let i = 1; i <= len; i++) {
                    randomCode.push(fullOpts[numRandom(0, fullOpts.length)]);
                }
                return randomCode;
            },
            drawRandomLine(ctx) {
                for(let i = 0; i < 4; i++) {
                    ctx.strokeStyle = this.getRandomColor(40, 180);
                    ctx.beginPath();
                    ctx.moveTo(numRandom(0, this.width), numRandom(0, this.height));
                    ctx.lineTo(numRandom(0, this.width), numRandom(0, this.height));
                    ctx.stroke();
                }
            },
            drawRandomDot(ctx) {
                for(let i = 0; i < this.width/4; i++) {
                    ctx.fillStyle = this.getRandomColor(0, 255);
                    ctx.beginPath();
                    ctx.arc(numRandom(0, this.width), numRandom(0, this.height), 1, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.pic{
    width: 200px;
    height: 50px;
    cursor: pointer;
}
</style>
