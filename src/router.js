const routers = [{
    path: '/',
    name: 'Index',
    meta: {
        title: '商品管理'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/addGoods',
    name: 'AddGoods',
    meta: {
        title: '添加商品'
    },
    component: (resolve) => require(['./views/addGoods.vue'], resolve)
}, {
    path: '/editGoods',
    name: 'AddGoods',
    meta: {
        title: '修改商品'
    },
    component: (resolve) => require(['./views/addGoods.vue'], resolve)
}];
export default routers;