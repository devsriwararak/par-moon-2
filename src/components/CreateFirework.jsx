document.getElementById('end-auction-btn').addEventListener('click', function() {
    // สร้างเอฟเฟกต์พลุ
    CreateFirework();
  });

function CreateFirework() {
// สร้าง element สำหรับเอฟเฟกต์พลุ
var firework = document.createElement('div');
firework.classList.add('firework');

// กำหนดตำแหน่งของเอฟเฟกต์พลุ
var container = document.querySelector('.firework-container');
var containerRect = container.getBoundingClientRect();
var randomX = Math.random() * containerRect.width;
var randomY = Math.random() * containerRect.height;
firework.style.left = randomX + 'px';
firework.style.top = randomY + 'px';

// เพิ่มเอฟเฟกต์พลุลงในคอนเทนเนอร์
container.appendChild(firework);

// ลบเอฟเฟกต์พลุหลังจากที่สิ้นสุดการเล่น
firework.addEventListener('animationend', function() {
  container.removeChild(firework);
});
}

export default CreateFirework