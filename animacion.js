
const botones = document.getElementsByClassName("btn_game");

const simbolos = ["✖","▲","●","■"];

Array.from(botones).forEach(btn => {
  btn.style.position = "relative";
  
  btn.addEventListener("click",(e)=>{

    for(let i=0;i<40;i++){

        const particula = document.createElement("span");

        particula.classList.add("particula");

        particula.innerText =
            simbolos[Math.floor(Math.random()*simbolos.length)];

        // posición inicial (relativa al botón)
        const rect = btn.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        
        particula.style.left = offsetX + "px";
        particula.style.top = offsetY + "px";

        // dirección aleatoria
        particula.style.setProperty("--x",(Math.random()-0.5)*400);
        particula.style.setProperty("--y",(Math.random()-0.5)*400);

        // colores aleatorios
        const colores = [
            "#00bfff",
            "#ff4d4d",
            "#00ff99",
            "#ffd700"
        ];

        particula.style.color =
            colores[Math.floor(Math.random()*colores.length)];

        btn.appendChild(particula);

        // eliminar después
        setTimeout(()=>{
            particula.remove();
        },1000);
    }

  });
});