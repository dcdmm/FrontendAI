class Person {
    public name: string;  // A public member can be accessed anywhere(默认)
    private age: number; // protected members are only visible to subclasses of the class they’re declared in.
    protected id: string; // private is like protected, but doesn’t allow access to the member even from subclasses:

    constructor(name: string, age: number, id: string) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public getAge(): number {
        return this.age;
    }

    private secretMethod(): void {
        console.log("这是私有方法");
    }
}

const person = new Person("张三", 25, "001");
console.log(person.name);
console.log(person.getAge());
// Property age is private and only accessible within class Person
// console.log(person.age);
// Property id is protected and only accessible within class Person and its subclasses.
// console.log(person.id);


class Employee extends Person {
    department: string;

    constructor(name: string, age: number, id: string, department: string) {
        super(name, age, id);
        this.department = department;
    }

    showId(): void {
        console.log(`员工ID: ${this.id}`);
    }
}

