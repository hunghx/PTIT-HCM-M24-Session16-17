// Mảng 

let arr1: number[] = [1, 2, 3, 4, 5];

let arr2: Array<number> = [1, 2, 3, 4, 5];  // generic array

let arr3: Array<number> = new Array(1, 2, 3, 4, 5); // generic array


// function in ra tham số truyền vào chưa xác định kiểu dữ liệu 

const printf = (word: any): void => { // ko chặt chẽ
    console.log(word);
}
const printGeneric = <T>(word: T): void => { // tạo ra 1 tham số cho kiểu dữ liệu của biến word
    console.log(word);
}

printGeneric("tâm anh");
printGeneric(100);
printGeneric(null)

// khởi tạo 1 tuple từ 2 tham số truyền vào
const getTuple = <U, V>(a: U, b: V): [U, V] => {
    return [a, b];
}

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
const baitap = <U, V>(a: U, b: V): any => {
    //nếu 2 đối số đều là number thì trả về tổng của 2 số đó 
    if (typeof a == 'number' && typeof b == 'number') {
        return Number(a) + Number(b)
    } else if (typeof a == 'string' && typeof b == 'string') {
        // nếu cả 2 là chuỗi thì nối chuỗi
        return String(a) + String(b);
    } else {
        //  nếu ko thì in ra thông báo lỗi "ko thể xác định kiểu"
        console.error("khong thể xác định kiểu")
    }
}

console.log(baitap(1, 2));
console.log(baitap("tâm ", "anh"));
baitap(null, undefined);


// cú pháp phương thức, hàm generic 
// function [tên hàm] <Tên kí hiệu của các tham số>(các danh sách tham số) : [kiểu trả về] { ...}

interface Person {
    weight :number,
    height :number
}
class Student implements Person {
    weight: number;
    height: number;
    name :string;
    constructor(weight: number, height: number, name: string) {
        this.weight = weight;
        this.height = height;
        this.name = name;
    }
}

// tạo hàm hiển thị thông tin của person 
const printInfoPerson = <T extends Person>(human : T) =>{ 
    // bất cứ kiểu dữ liệu nào kế Person đều thỏa mãn T (extends)
    console.log(human.height, human.weight);
}

let st : Student = new Student(60,1.6,"tâm anh");
 // ép kiểu ngầm định : quan hệ kế thừa - ép kiểu từ con lên cha 
 //  ép kiểu tường minh : từ cha về con  - <type children>
 let str : Student = <Student> st;



printInfoPerson(st);

// tham số T phải thỏa mãn là kiểu cha của lớp Student

// const printInfoStudent = <T extends Student>(human : T) =>{ 
//     // bất cứ kiểu dữ liệu nào kế Person đều thỏa mãn T (extends)
//     console.log(human.height, human.weight, human.name);
// }

// printInfoStudent(st);
console.log(st.toString());

const assignObject = <T extends Object>(o1 : T,o2 :T)=>{
    // return {...o1, ...o2}
    return Object.assign(o1,o2);
}


// bt9 - làm phẳng mảng
const lamPhangMang = <T>(arr : Array<T>): Array<T> =>{
    // logic :
    // duyệt qua lần lượt từng phần tử 
    // kiểm tra xem có phải 1 mảng hay ko thì lại tiếp tục duyệt 

    let newArr : Array<T> = [];
    arr.forEach(e=>{
        if(Array.isArray(e)){
           // phần tử là 1 mang 
           // thì gọi hàm lamPhangMang lại để làm phẳng mảng đó 
           newArr = [...newArr,...lamPhangMang(e)]; // đệ quy
        } else{
            newArr = [...newArr, e];
        }
    })
    return newArr;
}


let arr = [1,[2,[3,4],5],6]

console.log(lamPhangMang(arr));


// Lớp / interface generic

interface ArrayFake <T>{
    data : T[];
    push(item : T): void; // thêm vào cuối mảng
    pop(): T; // xóa cuối và trả về thằng vừa xóa
}

class ArrayFakeImpl<T>  implements ArrayFake<T>{
    data : T[] = [];
    push(item : T): void {
        this.data.push(item);
    }
    pop(): T {
        return this.data.pop() as T;
    }
    toString(){
        return this.data.toString();
    } 
}
// khởi tạo đói tượng 
let arrFake  = new ArrayFakeImpl<number>();

arrFake.push(1);
arrFake.push(2);
arrFake.push(3);
console.log(arrFake);

console.log([1,2,3,4,5,6]);

// generic với phương thức đặc biệt :  static 
class Numbers {
    static so :number = 0; // chứa có vùng nhớ
    constructor(_so : number){
        Numbers.so = _so;
    }
    static calX2(){ // có vùng nhớ
        return  Numbers.so* 2;
    }
    static sum<T>(a:T,b:T){
        return Number(a)+Number(b);
    }
} 

// ko cần khởi tạo đối tượng vẫn có thể truy xuất các thành phần tĩnh 
// nếu như khởi tạo đối tượng 

console.log(Numbers.so);


// Quản lí bán  
interface ICrud<T,E> {
    create(item : T) : boolean;
    findAll() : T[];
    findById(id : string) : T;
    update(item : T) : boolean;
    delete(id : E) : boolean;
}

// quản lí sản phẩm 
class Product{
    id : string;
    name : string;
    price : number;
    constructor(id : string, name : string, price : number){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

interface IProduct extends ICrud<Product,string>{
    // các phương thức bổ sung
    getTotalProductQuantity() : number;
    getTop5ProductBestSeller(): Product[];
}

class ProductManager implements IProduct{
    products : Product[] = [];
    create(item: Product): boolean {
        
    }
    findAll(): Product[] {
        
    }
    findById(id: string): Product {
        
    }
    update(item: Product): boolean {
        
    }
    delete(id: string): boolean {
        
    }
    getTotalProductQuantity(): number {
        
    }
    getTop5ProductBestSeller(): Product[] {
        
    }
}
// Bài tập 
// cấu trúc 1 node 
class Nodes <T> {
    data : T;
    next : Nodes<T>|null;
    constructor(data : T){
        this.data = data;
        this.next = null;
    }
}

// Cấu trúc danh sách liên kết
class LinkedList <T> {
    head : Nodes<T>|null;
    tail : Nodes<T>|null;
    constructor(){
        this.head = null;
        this.tail = null;
    }
    append(item : T) :void{

    }
    prepend(item : T) :void{
        
    }
    delete(item : T) :void{

    }
    toArray(): T[]{

    }
}