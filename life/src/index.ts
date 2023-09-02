import Life from './life';

export let tps = 60; 

document.addEventListener("DOMContentLoaded", () => {
  const life = new Life();

  function animate() {
    life.update();
  }

  setInterval(animate, 1000/60);
})