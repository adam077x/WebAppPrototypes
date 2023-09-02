import Position from "./interfaces/position";
import Velocity from "./interfaces/velocity";

class Element {
  public color: string;
  public x: number;
  public y: number;
  public velX: number;
  public velY: number;

  constructor(color: string, position: Position) {
    this.color = color;
    this.x = position.x;
    this.y = position.y;
    this.velX = 0;
    this.velY = 0;
  }

  update(ctx: CanvasRenderingContext2D) {
    //this.x += this.velX;
    //this.y += this.velY;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}

export default Element;