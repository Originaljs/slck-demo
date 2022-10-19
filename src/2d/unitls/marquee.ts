export class MarQuee {
  speed: number;
  dom: HTMLElement | null;
  MyMar!: any;
  box1!: HTMLElement;
  box2!: HTMLElement;
  constructor(el: string | HTMLElement, speed: number) {
    this.speed = speed;
    if (typeof el === "string") {
      this.dom = document.querySelector(el);
    } else {
      this.dom = el;
    }
    (this.dom as any).scrollTop =0;
    (this.dom as any).onwheel = (event: any) =>{
        console.log(event)
      event = event || window.event;
     
     ( this.dom as any).scrollTop =
        event.wheelDeltaY > 0 ? ( this.dom as any).scrollTop - 30 : ( this.dom as any).scrollTop + 30;
      event.preventDefault();
    };
    this.Refresh();
  }
  count() {
    clearTimeout(this.MyMar);
    this.MyMar = setTimeout(() => {
      this.Marquee();
      this.count();
    }, this.speed);
  }
  stopCount() {
    clearTimeout(this.MyMar);
  }
  Refresh() {
    this.box1 = (this.dom as any).getElementsByTagName("*")[0];
    if (this.box1.offsetHeight <= (this.dom as any).offsetHeight) return;
    (this.dom as any).onmouseover =  ()=> {
      this.stopCount();
    }; // 鼠标移动到盒子上停止滚动
    (this.dom as any).onmouseout =  ()=> {
      this.count();
    }; // 鼠标从盒子移开，恢复滚动
    (this.box2 as any) = this.box1.cloneNode(true); // 克隆列表到新节点
    (this.box2 as any).style.top = this.box1.offsetHeight + "px"; // 设置新节点的位置，为列表的高度
    (this.box2 as any).style.position = "absolute";
    (this.dom as any).appendChild(this.box2);
    this.count();
  }
  Marquee() {
    if (this.box2.offsetTop - (this.dom as any).scrollTop < 0) {
      (this.dom as any).scrollTop -= this.box2.offsetHeight;
    } else {
      (this.dom as any).scrollTop += 1;
    }
  }
}
