<template>
    <div class="slider">
        <canvas ref="originElem" class="slider-image-origin" width="300px" height="150px"></canvas>
        <canvas ref="sliceElem" class="slider-image-clip" width="60px" height="150px"></canvas>
        <div class="slider-bar-container">
            <div ref="sliderElem" class="slider-bar-block"></div>
        </div>
    </div>
</template>

<script>
    import originPic from '@/assets/image/slider-1.png';

    const PI = Math.PI;
    const len = 42;
    const width = 300;
    const swidth = 60;
    const height = 150;
    const radius = 10;

    const getImage = (imageSrc) => {
        const image = new Image();
        return new Promise((resolve, reject) => {
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                reject('加载错误!!!');
            };
            image.src = imageSrc;
        });
    };


    const drawImage = (ctx, operation, x, y) => {
        ctx.moveTo(x, y);
        ctx.lineTo(x + len / 2, y);
        ctx.arc(x + len / 2, y - radius + 2, radius, 0, 2 * PI);
        ctx.lineTo(x + len / 2, y);
        ctx.lineTo(x + len, y);
        ctx.lineTo(x + len, y + len / 2);
        ctx.arc(x + len + radius - 2, y + len / 2, radius, 0, 2 * PI);
        ctx.lineTo(x + len, y + len / 2);
        ctx.lineTo(x + len, y + len);
        ctx.lineTo(x, y + len);
        ctx.lineTo(x, y);
        ctx[operation]();
    };


    export default {
        name: "hello",
        data(){
            return {
                position: [0, 0],
                isMouseDown: false,
                origin: [0, 0]
            };
        },
        mounted() {
            this.position = this.getRandomPosition();
            this.initEvent();
            this.draw();
        },
        updated() {
            this.position = this.getRandomPosition();
            const originCtx = this.$refs.originElem.getContext('2d');
            const clipCtx = this.$refs.sliceElem.getContext('2d');
            this.clear(originCtx,width,height);
            this.clear(clipCtx,swidth,height);
            this.draw();
        },
        destroyed(){
            const sliderElem = this.$refs.sliderElem;
            sliderElem.removeEventListener('mousedown', this.mousedown);
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mouseup', this.mouseup);
        },
        methods: {
            draw() {
                const startPosition = this.position;
                const originCtx = this.$refs.originElem.getContext('2d');
                const clipCtx = this.$refs.sliceElem.getContext('2d');
                getImage(originPic).then((data) => {
                    originCtx.save();
                    originCtx.moveTo(0, 0);
                    originCtx.drawImage(data, 0, 0, width, height, 0 , 0, width, height);
                    originCtx.fillStyle = '#fff';
                    drawImage(originCtx, 'fill', startPosition[0], startPosition[1]);
                    originCtx.restore();

                    clipCtx.save();
                    drawImage(clipCtx, 'clip', 0, startPosition[1]);
                    clipCtx.drawImage(data, startPosition[0], 0, swidth, height, 0 , 0, swidth, height);
                    clipCtx.restore();
                });
            },
            getRandomPosition(){
                const w = width - len -radius - radius * 2;
                const h = height - len - radius - radius *2;
                return [Math.floor(w * Math.random()),
                    Math.floor(h * Math.random())];
            },
            mousedown(e) {
                this.origin = [e.x + radius, e.y + radius];
                this.isMouseDown = true;
            },
            mousemove(e) {
                if (!this.isMouseDown) return false;
                const origin = this.origin;
                const moveX = e.x - origin[0];
                const sliceElem = this.$refs.sliceElem;
                const sliderElem = this.$refs.sliderElem;
                // 左右超出
                if (moveX < 0 || moveX + 40 >= width) return false;
                sliderElem.style.left = `${moveX}px`;
                sliceElem.style.left = `${moveX}px`;
            },
            mouseup(e) {
                if (!this.isMouseDown) return false;
                this.isMouseDown = false;
                const origin = this.origin;
                const target = this.position;
                const sliderElem = this.$refs.sliderElem;
                // debugger;
                if (Math.abs(e.x - origin[0] - target[0]) < 5) {
                    sliderElem.style.backgroundColor='green';
                } else {
                    sliderElem.style.backgroundColor = 'red';
                }
            },
            initEvent() {
                const target = this.position;
                const sliderElem = this.$refs.sliderElem;
                sliderElem.onselectstart = () => false;
                sliderElem.addEventListener('mousedown', this.mousedown);
                document.addEventListener('mousemove', this.mousemove);
                document.addEventListener('mouseup', this.mouseup);
            },
            clear (ctx , w, h) {
                ctx.clearRect(0, 0, w, h);
            }
        }
    };
</script>

<style scoped lang="scss">
    .slider{
        position: relative;
        width: 300px;
        height: 216px;
        box-sizing: border-box;
        &-image{
            &-clip {
                position: absolute;
                left: 0;
                top: 0;
                margin: 0;
                padding: 0;
            }
            &-origin{
                margin: 0;
                padding: 0;
            }
        }
        &-bar{
            &-container{
                position: relative;
                width: 100%;
                height: 40px;
                margin-top: 10px;
                background-color: #f7f9fa;
                border: 1px solid #e4e7eb;
            }
            &-block{
                position: absolute;
                height: 100%;
                background: #fff;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: background .2s linear;
                width: 40px;
                &:hover{
                    background-color: #1991FA;
                }
            }
        }
    }
</style>
