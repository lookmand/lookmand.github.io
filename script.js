// 1. Digital Web Background Animation (HTML5 Canvas)
const canvas = document.getElementById('spiders-web-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const nodes = [];
const maxNodes = 60;
const maxDistance = 120;

// Handle resize dynamically
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Generate Web Nodes
for (let i = 0; i < maxNodes; i++) {
    nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
    });
}

function animateWeb() {
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw nodes
    for (let i = 0; i < maxNodes; i++) {
        let n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        
        // Boundaries bounce
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        
        ctx.fillStyle = 'rgba(255, 0, 60, 0.4)';
        ctx.fillRect(n.x - 1, n.y - 1, 3, 3);
        
        // Draw lines between close nodes (forming the web pattern)
        for (let j = i + 1; j < maxNodes; j++) {
            let n2 = nodes[j];
            let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            
            if (dist < maxDistance) {
                let alpha = (1 - dist / maxDistance) * 0.25;
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateWeb);
}
animateWeb();


// 2. Automated Countdown Timer Framework
// UBAH TANGGAL DI BAWAH INI SESUAI TANGGAL PERNIKAHAN ANDA
const targetDate = new Date('December 20, 2026 09:00:00').getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "<div class='time-block' style='width: 100%; color: #00f0ff;'>ACARA TELAH DIMULAI!</div>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Render numbers with leading zeros if single digits
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}, 1000);
