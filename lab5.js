let arrPerson =[];
const create = (name,age)=>{
    let Person = new Object();
    Person.name = name;
    Person.age = age;
    return Person;
}
const show =(person)=>{
    console.log(person.name,"-",person.age);
}
arrPerson.push(create("a",12));
arrPerson.push(create("b",23));
arrPerson.push(create("c",34));

arrPerson.map(item=>{
    show(item);
})