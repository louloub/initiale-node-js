class Rectangle {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }
  
    isSquare() {
        return this.a === this.b ? true : false
    }
  
    getArea() {
        return this.a * this.b
    }
  
    getPerimeter() {
        return (this.a * 2) + (this.b * 2)
    }
  }
  
  module.exports = Rectangle;
  