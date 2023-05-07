import All from "../../asset/icon/All";
import Laptop from "../icon/Laptop";
import PC from "../icon/PC";
import Phone from "../icon/Phone";
import Audio from "../icon/Audio";
import Accessory from "../icon/Accessory";

// const listMenu = [
//   {
//     id: 0,
//     name: "Caramel Frappucino",
//     desc: "Sweet chocalate with coffee,milk,sugar and love <3",
//     price: 3.95,
//     listOptions: [
//       {
//         title: "mood",
//         options: [
//           {
//             display: "<Fire />",
//             value: 'hot',
//           },
//           {
//             display: "<Cold />",
//             value: 'cold',
//           },
//         ],
//       },
//       {
//         title: "size",
//         options: [
//           {
//             display: "S",
//             value: 'small',
//           },
//           {
//             display: "M",
//             value: 'medium',
//           },
//           {
//             display: "L",
//             value: 'large',
//           },
//         ],
//       },
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: '30%',
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "http://starboxcoffee.weebly.com/uploads/2/3/7/4/23748829/s908146353969437727_p6_i1_w305.jpeg",
//     type: "coffee",
//   },
//   {
//     id: 1,
//     name: "Chocolate Frappcino",
//     desc: "Sweet chocalate with coffee,milk,sugar and love <3",
//     price: 4,
//     listOptions: [
//       {
//         title: "mood",
//         options: [
//           {
//             display: "<Fire />",
//             value: 'hot',
//           },
//           {
//             display: "<Cold />",
//             value: 'cold',
//           },
//         ],
//       },
//       {
//         title: "size",
//         options: [
//           {
//             display: "S",
//             value: 'small',
//           },
//           {
//             display: "M",
//             value: 'medium',
//           },
//           {
//             display: "L",
//             value: 'large',
//           },
//         ],
//       },
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://chickenmega.com.au/wp-content/uploads/2021/07/Cappuccino-Frappe.jpg",
//     type: "coffee",
//   },
//   {
//     id: 2,
//     name: "Caramel Frappucino",
//     desc: "Sweet chocalate with coffee,milk,sugar and love <3",
//     price: 3.25,
//     listOptions: [
//       {
//         title: "mood",
//         options: [
//           {
//             display: "<Fire />",
//             value: 'hot',
//           },
//           {
//             display: "<Cold />",
//             value: 'cold',
//           },
//         ],
//       },
//       {
//         title: "size",
//         options: [
//           {
//             display: "S",
//             value: 'small',
//           },
//           {
//             display: "M",
//             value: 'medium',
//           },
//           {
//             display: "L",
//             value: 'large',
//           },
//         ],
//       },
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://globalassets.starbucks.com/assets/8fd5aa3d9633472c98cc8a016c330a4f.jpg?impolicy=1by1_wide_topcrop_630",
//     type: "coffee",
//   },
//   {
//     id: 3,
//     name: "Milk",
//     desc: "Sweet chocalate with coffee,milk,sugar and love <3",
//     price: 2,
//     listOptions: [
//       {
//         title: "mood",
//         options: [
//           {
//             display: "<Fire />",
//             value: 'hot',
//           },
//           {
//             display: "<Cold />",
//             value: 'cold',
//           },
//         ],
//       },
//       {
//         title: "size",
//         options: [
//           {
//             display: "S",
//             value: 'small',
//           },
//           {
//             display: "M",
//             value: 'medium',
//           },
//           {
//             display: "L",
//             value: 'large',
//           },
//         ],
//       },
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://hips.hearstapps.com/hmg-prod/images/it-oat-milk-good-for-you-1612398027.jpg",
//     type: "milk",
//   },
//   {
//     id: 5,
//     name: "Juice",
//     desc: "Juiceeeeeeee",
//     price: 2.65,
//     listOptions: [
//       {
//         title: "mood",
//         options: [
//           {
//             display: "<Fire />",
//             value: 'hot',
//           },
//           {
//             display: "<Cold />",
//             value: 'cold',
//           },
//         ],
//       },
//       {
//         title: "size",
//         options: [
//           {
//             display: "S",
//             value: 'small',
//           },
//           {
//             display: "M",
//             value: 'medium',
//           },
//           {
//             display: "L",
//             value: 'large',
//           },
//         ],
//       },
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://www.laurafuentes.com/wp-content/uploads/2014/02/berry-juice-RC.jpg",
//     type: "juice",
//   },
//   {
//     id: 6,
//     name: "Snack",
//     desc: "Snackkkkkkkk",
//     price: 2.5,
//     listOptions: [
//       {
//         title: "spicy",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "phomat",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://cdn.tgdd.vn/Files/2020/03/02/1239549/2-cong-thuc-lam-banh-hotdog-xuc-xich-hotdog-pho-mai-han-quoc-gay-nghien-14-760x367.png",
//     type: "snack",
//   },
//   {
//     id: 7,
//     name: "Rice",
//     desc: "Riceeeeeeeeeee",
//     price: 4,
//     listOptions: [
//       {
//         title: "spicy",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "rice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://www.mydiasporakitchen.com/wp-content/uploads/2017/08/img_8989.jpg",
//     type: "rice",
//   },
//   {
//     id: 8,
//     name: "Dessert",
//     desc: "Dessertttttttttttttttt",
//     price: 2.4,
//     listOptions: [
//       {
//         title: "sugar",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//       {
//         title: "ice",
//         options: [
//           {
//             display: "30%",
//             value: "30%",
//           },
//           {
//             display: "50%",
//             value: "50%",
//           },
//           {
//             display: "70%",
//             value: "70%",
//           },
//         ],
//       },
//     ],
//     img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg",
//     type: "dessert",
//   },
// ];
export const listTabs = [
  {
    display : 'All',
    icon: <All />,
    type : 'all'
  },
  {
    display : 'Laptop',
    icon: <Laptop />,
    type : 'laptop'
  },
  {
    display : 'PC',
    icon: <PC />,
    type : 'pc'
  },
  {
    display : 'Phone',
    icon: <Phone />,
    type : 'phone'
  },
  {
    display : 'Audio',
    icon: <Audio />,
    type : 'audio'
  },
  {
    display : 'Accessory',
    icon: <Accessory />,
    type : 'accessory'
  }
]

// export default listMenu;
