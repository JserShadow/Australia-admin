<style>
.goodsTitle {
    display: flex;
}
</style>
<template>
    <div class="index">
        <Button type="info" @click.native="addGoods">添加商品</Button>
        <Card :bordered="true" v-for="item in allData">
            <div class="goodsTitle" slot="title">
                <p>{{item.name}}</p>
                <Button style="" type="error" icon="close-round" shape="circle">删除</Button>
            </div>
            <p>商品介绍: {{item.introduction}}</p>
        </Card>
    </div>
</template>
<script>
    import axios from '../libs/util'
    export default {
        data() {
            return {
                allData: [],
            }
        },
        methods: {
            addGoods () {
                this.$router.push('/addGoods');
            }
        },
        async mounted() {
            const allData = await axios.ajax.get('/getAllGoods');
            this.allData = allData.data;
        }
    };
</script>