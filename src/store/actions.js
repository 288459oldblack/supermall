const actions = {

}
export default actions
// export default {
//     ChangeCart(context, payload) {
//         return new Promise((reslove, reject) => {
//             let oldCart = null;
//             for (const i of context.state.cartList) {
//                 if (i.iid == payload.iid) {
//                     oldCart = i;
//                     break;
//                 }
//             }
//             if (oldCart) {
//                 context.commit(addCart, oldCart);
//                 reject();
//             } else {
//                 payload.checked = true;
//                 payload.count = 1;
//                 context.commit(addCart, payload);
//                 reslove();
//             }
//         });
//     }
// };