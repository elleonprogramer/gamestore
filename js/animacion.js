(function(){
    const simbolos = ["✖","▲","●","■"];

    function crearParticulas(btn, e){
        if (!btn.style.position) btn.style.position = 'relative';
        for(let i=0;i<40;i++){
            const particula = document.createElement('span');
            particula.classList.add('particula');
            particula.innerText = simbolos[Math.floor(Math.random()*simbolos.length)];

            const rect = btn.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            particula.style.left = offsetX + 'px';
            particula.style.top = offsetY + 'px';

            particula.style.setProperty('--x',(Math.random()-0.5)*400);
            particula.style.setProperty('--y',(Math.random()-0.5)*400);

            const colores = ['#00bfff','#ff4d4d','#00ff99','#ffd700'];
            particula.style.color = colores[Math.floor(Math.random()*colores.length)];

            btn.appendChild(particula);
            setTimeout(()=>particula.remove(),1000);
        }
    }

    document.addEventListener('click', function(e){
        const btn = e.target.closest('.btn_game');
        if (!btn) return;
        crearParticulas(btn, e);
    });
})();
