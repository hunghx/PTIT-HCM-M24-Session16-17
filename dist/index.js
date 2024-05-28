"use strict";
// Mảng 
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 3, 4, 5]; // generic array
let arr3 = new Array(1, 2, 3, 4, 5); // generic array
// function in ra tham số truyền vào chưa xác định kiểu dữ liệu 
const printf = (word) => {
    console.log(word);
};
const printGeneric = (word) => {
    console.log(word);
};
printGeneric("tâm anh");
printGeneric(100);
printGeneric(null);
// khởi tạo 1 tuple từ 2 tham số truyền vào
const getTuple = (a, b) => {
    return [a, b];
};
console.log(getTuple(1, "nam"));
console.log(getTuple(undefined, "nữ"));
console.log(getTuple(true, null));
// các qui tắc cơ bản về đặt tên :
// T : Type 
// E : Element
// K : Key 
// V : Value
// N : Number
// Bài tập : tạo 1 hàm truyền vào 2 đối số : 
const baitap = (a, b) => {
    //nếu 2 đối số đều là number thì trả về tổng của 2 số đó 
    if (typeof a == 'number' && typeof b == 'number') {
        return Number(a) + Number(b);
    }
    else if (typeof a == 'string' && typeof b == 'string') {
        // nếu cả 2 là chuỗi thì nối chuỗi
        return String(a) + String(b);
    }
    else {
        //  nếu ko thì in ra thông báo lỗi "ko thể xác định kiểu"
        console.error("khong thể xác định kiểu");
    }
};
console.log(baitap(1, 2));
console.log(baitap("tâm ", "anh"));
baitap(null, undefined);
class Student {
    constructor(weight, height, name) {
        this.weight = weight;
        this.height = height;
        this.name = name;
    }
}
// tạo hàm hiển thị thông tin của person 
const printInfoPerson = (human) => {
    // bất cứ kiểu dữ liệu nào kế Person đều thỏa mãn T (extends)
    console.log(human.height, human.weight);
};
let st = new Student(60, 1.6, "tâm anh");
// ép kiểu ngầm định : quan hệ kế thừa - ép kiểu từ con lên cha 
//  ép kiểu tường minh : từ cha về con  - <type children>
let str = st;
printInfoPerson(st);
// tham số T phải thỏa mãn là kiểu cha của lớp Student
// const printInfoStudent = <T extends Student>(human : T) =>{ 
//     // bất cứ kiểu dữ liệu nào kế Person đều thỏa mãn T (extends)
//     console.log(human.height, human.weight, human.name);
// }
// printInfoStudent(st);
console.log(st.toString());
const assignObject = (o1, o2) => {
    // return {...o1, ...o2}
    return Object.assign(o1, o2);
};
// bt9 - làm phẳng mảng
const lamPhangMang = (arr) => {
    // logic :
    // duyệt qua lần lượt từng phần tử 
    // kiểm tra xem có phải 1 mảng hay ko thì lại tiếp tục duyệt 
    let newArr = [];
    arr.forEach(e => {
        if (Array.isArray(e)) {
            // phần tử là 1 mang 
            // thì gọi hàm lamPhangMang lại để làm phẳng mảng đó 
            newArr = [...newArr, ...lamPhangMang(e)]; // đệ quy
        }
        else {
            newArr = [...newArr, e];
        }
    });
    return newArr;
};
let arr = [1, [2, [3, 4], 5], 6];
console.log(lamPhangMang(arr));
class ArrayFakeImpl {
    constructor() {
        this.data = [];
    }
    push(item) {
        this.data.push(item);
    }
    pop() {
        return this.data.pop();
    }
    toString() {
        return this.data.toString();
    }
}
// khởi tạo đói tượng 
let arrFake = new ArrayFakeImpl();
arrFake.push(1);
arrFake.push(2);
arrFake.push(3);
console.log(arrFake);
console.log([1, 2, 3, 4, 5, 6]);
// generic với phương thức đặc biệt :  static 
class Numbers {
    constructor(_so) {
        Numbers.so = _so;
    }
    static calX2() {
        return Numbers.so * 2;
    }
    static sum(a, b) {
        return Number(a) + Number(b);
    }
}
Numbers.so = 0; // chứa có vùng nhớ
// ko cần khởi tạo đối tượng vẫn có thể truy xuất các thành phần tĩnh 
// nếu như khởi tạo đối tượng 
console.log(Numbers.so);
// quản lí sản phẩm 
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class ProductManager {
    constructor() {
        this.products = [];
    }
    create(item) {
    }
    findAll() {
    }
    findById(id) {
    }
    update(item) {
    }
    delete(id) {
    }
    getTotalProductQuantity() {
    }
    getTop5ProductBestSeller() {
    }
}
// Bài tập 
// cấu trúc 1 node 
class Nodes {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
// Cấu trúc danh sách liên kết
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(item) {
    }
    prepend(item) {
    }
    delete(item) {
    }
    toArray() {
    }
}
