const routers = [{
    path: '/',
    meta: {
        title: '商品管理'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/addGoods',
    meta: {
        title: '添加商品'
    },
    component: (resolve) => require(['./views/addGoods.vue'], resolve)
}];
export default routers;