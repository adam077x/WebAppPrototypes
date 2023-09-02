import Element from './element';
import Position from './interfaces/position';

class Life {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public elementsA: Element[];
  public elementsB: Element[];
  public elementsC: Element[];
  public elementsD: Element[];

  public elementAtoA: HTMLInputElement;
  public elementAtoB: HTMLInputElement;
  public elementAtoC: HTMLInputElement;
  public elementBtoB: HTMLInputElement;
  public elementBtoA: HTMLInputElement;
  public elementCtoC: HTMLInputElement;
  public elementCtoB: HTMLInputElement;

  public speed: HTMLInputElement;

  constructor() {
    this.canvas = document.getElementById("lifeGame") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.elementsA = [];
    this.elementsB = [];
    this.elementsC = [];
    this.elementsD = [];

    this.elementsA = this.spawn(50, "yellow");
    this.elementsB = this.spawn(50, "red");
    this.elementsC = this.spawn(50, "blue");
    this.elementsD = this.spawn(50, "white");

    this.elementAtoA = document.querySelector("#elementAtoA");
    this.elementAtoB = document.querySelector("#elementAtoB");
    this.elementAtoC = document.querySelector("#elementAtoC");
    this.elementBtoB = document.querySelector("#elementBtoB");
    this.elementBtoA = document.querySelector("#elementBtoA");
    this.elementCtoC = document.querySelector("#elementCtoC");
    this.elementCtoB = document.querySelector("#elementCtoB");
    
    this.speed = document.querySelector("#speed");
  }

  update() {
    this.applyRelation(this.elementsA, this.elementsA, parseInt(this.elementAtoA.value));
    this.applyRelation(this.elementsA, this.elementsB, parseInt(this.elementAtoB.value));
    this.applyRelation(this.elementsB, this.elementsA, parseInt(this.elementAtoC.value));
    this.applyRelation(this.elementsB, this.elementsC, parseInt(this.elementBtoB.value));
    this.applyRelation(this.elementsA, this.elementsC, parseInt(this.elementCtoC.value));
    this.applyRelation(this.elementsC, this.elementsA, parseInt(this.elementCtoB.value));

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const context = this.ctx;

    this.elementsA.forEach(element => {
      element.update(context);
    })

    this.elementsB.forEach(element => {
      element.update(context);
    })

    this.elementsC.forEach(element => {
      element.update(context);
    })

    this.elementsD.forEach(element => {
      element.update(context);
    })
  }

  applyRelation(elementsA: Element[], elementsB: Element[], g: number) {
    const speed = parseInt(this.speed.value);

    for(let i = 0; i < elementsA.length; i++) {
      var fx = 0;
      var fy = 0;

      for(let j = 0; j < elementsB.length; j++) {
        var a = elementsA[i];
        var b = elementsB[j];

        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var d = Math.sqrt(dx * dx + dy * dy);

        if(d > 0 && d < 80) {
          var F = g * 1/d;
          fx += (F * dx);
          fy += (F * dy);
        }
      }

      a.velX = (a.velX + fx) * (speed / 1000);
      a.velY = (a.velY + fy) * (speed / 1000);

      a.x += a.velX;
      a.y += a.velY;

      if(a.x <= 0 || a.x >= this.canvas.width) {
        a.velX *= -1;
      } 
      if(a.y <= 0 || a.y >= this.canvas.height) {
        a.velY *= -1;
      } 
    }
  }

  spawn(count: number, color: string) {
    var elements = [];

    for(let i = 0; i < count; i++) {
      const position: Position = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height
      };
    
      elements.push(new Element(color, position));
    }

    return elements;
  }
}

export default Life;