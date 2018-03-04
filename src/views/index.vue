<style>
.goodsTitle {
    display: flex;
}
.index {
    padding: 10px 20px;
}
</style>
<template>
    <div class="index" style="padding:10px 50px">
        <Modal v-model="deleteConfirm" width="300px">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除后不可恢复</p>
                <p>确定要删除吗</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="deleteLoading" @click="del">确认删除</Button>
            </div>
        </Modal>
        <Card :bordered="true" v-for="item in allData" :key="item._id">
            <div class="goodsTitle" slot="title">
                <p>{{item.name}}</p>
                <Button type="info" icon="compose" shape="circle" @click.native="handleEdit(item)">编辑</Button>
                <Button type="error" icon="close-round" shape="circle" @click.native="handleDelete(item)">删除</Button>
            </div>
            <p>价格: {{item.price}}</p>
            <p>类别: {{item.catagory}}</p>
            <p>商品介绍: {{item.introduction}}</p>
            <p>
                <img style="width: 80px;height: 80px" v-for="img in item.imgs" :src="img" alt="picture" :key="img">
            </p>
        </Card>
        <Button type="info" @click.native="addGoods" style="margin: 15px 40%; padding: 10px 50px">添加商品</Button>
    </div>
</template>
<script>
    import axios from '../libs/util'
    export default {
        data() {
            return {
                allData: [],
                dataToDelete: {},
                deleteConfirm: false,
                deleteLoading: false
            }
        },
        methods: {
            addGoods () {
                this.$router.push('/addGoods');
            },
            handleDelete(item) {
                this.deleteConfirm = true;
                this.dataToDelete.id = item._id;
            },
            async del() {
                this.deleteLoading = true;
                const res = await axios.ajax.post('/deleteGoods', this.dataToDelete);
                console.log(res);
                if (res.status === 200) {
                    this.deleteLoading = false;
                    this.deleteConfirm = false;
                    const allData = await axios.ajax.get('/getAllGoods');
                    this.allData = allData.data;
                }
            },
            handleEdit(item) {
                this.$router.push('/editGoods?id=' + item._id);
            }
        },
        // async mounted() {
        //     const allData = await axios.ajax.get('/getAllGoods');
        //     this.allData = allData.data;
        //     console.log(this.allData);
        // }
    };
</script>