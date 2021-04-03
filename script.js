function Student(name, grade) {
  this.name = name
  this.grade = grade
}

Student.prototype.sayName = function() {
  return this.name
}

let beka = new Student("beka", 9);
console.log(beka.sayName());