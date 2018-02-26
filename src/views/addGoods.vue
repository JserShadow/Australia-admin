<template>
    <Form label-position="left" :label-width="100" style="padding: 15px 20%;">
        <FormItem label="商品名称">
            <i-input v-model="goodsName" placeholder="请输入商品名称" style="width: 30%"></i-input>
        </FormItem>
        <FormItem label="商品价格">
            <i-input v-model="goodsPrice" placeholder="接受到小数点后两位" style="width: 160px">
              <span slot="prepend">￥</span>
            </i-input>
        </FormItem>
        <FormItem label="选择商品类别">
            <Select v-model="selector.value">
                <Option :value="selector.value1">化妆品</Option>
                <Option :value="selector.value2">服装</Option>
            </Select>
        </FormItem>
        <FormItem label="商品介绍">
            <i-input v-model="goodsInfomation"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="只接受文本信息"></i-input>
        </FormItem>
        <FormItem label="选择商品图片">
            <Upload
                type="drag"
                action="http://localhost:7001/upload"
                :format="['jpg','jpeg','png']"
                :max-size="5120"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :on-error="handleError">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
        </FormItem>
        <div style="display: flex;justify-content: space-around;">
          <Button type="primary" :loading="loading" @click="toLoading">
              <span v-if="!loading">提交</span>
              <span v-else>Loading...</span>
          </Button>
          <Button @click="cancel">取消</Button>
        </div>
    </Form>
</template>
<style>
</style>

<script>
import util from '../libs/util.js';
export default {
  data() {
    return {
      goodsName: '',
      goodsPrice: '',
      selector: {
        value: '',
        value1: '化妆品',
        value2: '服装',
      },
      goodsInfomation: '',
      loading: false,
      imgs: []
    }
  },
  methods: {
    async toLoading() {
      this.loading = true;
      const goodsName = this.goodsName;
      const goodsPrice = this.goodsPrice;
      const catagory = this.selector.value;
      const goodsInfomation = this.goodsInfomation;
      const goodsImgs = this.imgs;
      const objToTrans = {
        name: goodsName,
        price: goodsPrice,
        catagory: catagory,
        imgs: goodsImgs,
        introduction: goodsInfomation
      };
      console.log(objToTrans);
      const response = await util.ajax.post('/saveGoods', objToTrans);
      if (response.status !== 200) {
        this.loading = false;
        this.$Notice.error({
          title: '上传失败',
          desc: '请检查网络，如网络无问题请联系管理员'
        })
        return;
      }
      this.loading = false;
      this.$router.push('/');
    },
    cancel() {
      this.$router.push('/')
    },
    getResponseOfFileList(fileList) {
      let imgArr = [];
      fileList.forEach(val => {
        imgArr.push(val.response.img);
      })
      return imgArr;
    },
    handleSuccess(response, file, fileList) {
      this.imgs = this.getResponseOfFileList(fileList);
      this.$Notice.success({
        title: '文件上传成功',
        desc: '文件' + file.name + '已上传至服务器'
      })
    },
    handleRemove(file, fileList) {
      this.imgs = this.getResponseOfFileList(fileList);
    },
    handleFormatError(file) {
      this.$Notice.warning({
          title: '文件格式不支持',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
          title: '文件过大',
          desc: 'File  ' + file.name + ' is too large, no more than 5M.'
      });
    },
    handleError(error, file, fileList) {
      this.$Notice.error({
        title: '文件上传失败',
        desc: 'File upload error: ' + error
      })
    }
  }
}
</script>

