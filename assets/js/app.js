// Config
const config = {
  recipient: 'ถึงคุณผู้ที่ฉันรักสุดหัวใจ',
  songTitle: 'happy birthday',
  songArtist: 'wwj',
  audioSrc: 'assets/audio/e5d0827d_wwj_happy_birthday_official_audio_2364801070738679371.mp3',
  message: 'ไม่รู้ว่าเธอจะคิดถึงเราบ้างไหม แต่เรายังรักเธอมากเหมือนเดิม เธอยังเป็นเหตุผลของรอยยิ้มเราเสมอเลย:)',

  // Alternative songs for popup surprise
  surpriseSongs: [
    {
      title: 'happy birthday',
      artist: 'wwj',
      src: 'assets/audio/e5d0827d_wwj_happy_birthday_official_audio_2364801070738679371.mp3'
    },
    {
      title: 'แฮปปี้เบิร์ดเดย์นะ ',
      artist: 'SUNNY-K X SARAN X BlackHeart',
      src: 'https://proxy.savevids.net/downloads/5abfced9-1981-47a2-a710-9b0507d83305/SUNNY%20K%20X%20SARAN%20X%20BlackHeart%20%E2%80%93%20%E0%B9%81%E0%B8%AE%E0%B8%9B%E0%B8%9B%E0%B8%B5%E0%B9%89%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%80%E0%B8%94%E0%B8%A2%E0%B9%8C%E0%B8%99%E0%B8%B0%20OFFICIAL%20MV%20Prod.TVKRIT.mp3'
    }
  ]
};

// Elements
const el = {
  recipient: document.getElementById('recipient'),
  songTitle: document.getElementById('songTitle'),
  songArtist: document.getElementById('songArtist'),
  audio: document.getElementById('audio'),
  btnPlay: document.getElementById('btnPlay'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  progressBar: document.getElementById('progressBar'),
  greet: document.getElementById('greet'),
  countdownBtn: document.getElementById('btnCountdown'),
  countdown: document.getElementById('countdown'),
  surpriseModal: document.getElementById('surpriseModal'),
  closeModal: document.getElementById('closeModal'),
  confetti: document.getElementById('confetti'),
  popupPlayBtn: document.getElementById('popupPlayBtn'),
};

// Global variable สำหรับเก็บ audio ของ popup
let currentPopupAudio = null;

// Init text
el.recipient.textContent = config.recipient;
el.songTitle.textContent = config.songTitle;
el.songArtist.textContent = config.songArtist;
el.audio.src = config.audioSrc;
el.greet.textContent = config.message;

// Random Background Elements - เหลือแค่คอนเฟตติ

function createRandomConfetti() {
  const birthdayBg = document.getElementById('birthdayBg');
  const confettiEmojis = ['✨', '⭐', '🎊', '💫', '🌟', '💖', '💕', '🦋'];
  const wishMessages = ['Happy Birthday!', 'สุขสันต์วันเกิด', 'Love You', 'รักเธอ', 'My Love', 'ขอให้โชคดี', 'Best Wishes', 'Forever'];

  // สร้างคอนเฟตติ 40-60 ชิ้น (เพิ่มจำนวนเยอะขึ้น)
  const numConfetti = Math.floor(Math.random() * 21) + 40;

  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-bg';

    // 85% เป็น emoji, 15% เป็นข้อความ (ลดข้อความให้อ่านง่าย)
    if (Math.random() < 0.5) {
      confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
      confetti.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem'; // ขนาดใหญ่ขึ้น
    } else {
      confetti.textContent = wishMessages[Math.floor(Math.random() * wishMessages.length)];
      confetti.className += ' confetti-text';
      confetti.style.fontSize = (Math.random() * 0.5 + 0.8) + 'rem';
    }

    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 8 + 's'; // เพิ่มช่วงเวลา
    confetti.style.animationDuration = (Math.random() * 4 + 3) + 's'; // ความเร็วหลากหลาย

    birthdayBg.appendChild(confetti);
  }
}

// ฟังก์ชันสร้างคอนเฟตติต่อเนื่อง
function startContinuousConfetti() {
  createRandomConfetti();

  // สร้างคอนเฟตติใหม่ทุก 3-7 วินาที
  setInterval(() => {
    const birthdayBg = document.getElementById('birthdayBg');

    // เพิ่มคอนเฟตติใหม่ 15-25 ชิ้น
    const confettiEmojis = ['✨', '⭐', '🎊', '💫', '🌟', '💖', '💕', '🦋'];
    const wishMessages = ['Happy Birthday!', 'สุขสันต์วันเกิด', 'Love You', 'รักเธอ', 'My Love', 'ขอให้โชคดี'];
    const numNew = Math.floor(Math.random() * 11) + 15;

    for (let i = 0; i < numNew; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-bg';

      if (Math.random() < 0.85) {
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
      } else {
        confetti.textContent = wishMessages[Math.floor(Math.random() * wishMessages.length)];
        confetti.className += ' confetti-text';
        confetti.style.fontSize = (Math.random() * 0.5 + 0.8) + 'rem';
      }

      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = '0s';
      confetti.style.animationDuration = (Math.random() * 4 + 3) + 's';

      birthdayBg.appendChild(confetti);

      // ลบคอนเฟตติเก่าที่ตกจบแล้ว
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 8000);
    }
  }, Math.random() * 4000 + 3000); // 3-7 วินาที
}

// Audio controls
let playing = false, rafId;
function updateProgress() {
  const ratio = (el.audio.currentTime / (el.audio.duration || 1)) * 100;
  el.progressBar.style.width = ratio.toFixed(2) + '%';
  rafId = requestAnimationFrame(updateProgress);
}
function play() {
  el.audio.play().then(() => {
    playing = true;
    el.btnPlay.textContent = '⏸';
    cancelAnimationFrame(rafId);
    updateProgress();
  }).catch(() => { });
}
function pause() {
  el.audio.pause();
  playing = false;
  el.btnPlay.textContent = '▶';
  cancelAnimationFrame(rafId);
}
// Prime audio for autoplay policies
play();
pause();
el.btnPlay.addEventListener('click', () => playing ? pause() : play());
el.audio.addEventListener('ended', () => {
  pause();
  el.progressBar.style.width = '0%';
});

// Countdown and surprise
el.countdownBtn.addEventListener('click', () => {
  let n = 3;
  el.countdown.classList.remove('d-none');
  el.countdown.textContent = n;
  const timer = setInterval(() => {
    n--;
    if (n <= 0) {
      clearInterval(timer);
      el.countdown.classList.add('d-none');
      showSurprise();
    } else {
      el.countdown.textContent = n;
    }
  }, 1000);
});
function showSurprise() {
  // เล่นเพลงสุ่มจากรายการ surprise songs
  playSurpriseSong();
  el.surpriseModal.classList.remove('d-none');
  startConfetti();
  setTimeout(stopConfetti, 1800);
}

// ฟังก์ชันเล่นเพลงล็อคใน popup
function playSurpriseSong() {
  // ล็อคเพลง SUNNY-K X SARAN X BlackHeart
  const lockedSong = {
    title: 'แฮปปี้เบิร์ดเดย์นะ',
    artist: 'SUNNY-K X SARAN X BlackHeart',
    src: 'https://proxy.savevids.net/downloads/5abfced9-1981-47a2-a710-9b0507d83305/SUNNY%20K%20X%20SARAN%20X%20BlackHeart%20%E2%80%93%20%E0%B9%81%E0%B8%AE%E0%B8%9B%E0%B8%9B%E0%B8%B5%E0%B9%89%E0%B9%80%E0%B8%9A%E0%B8%B4%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%80%E0%B8%94%E0%B8%A2%E0%B9%8C%E0%B8%99%E0%B8%B0%20OFFICIAL%20MV%20Prod.TVKRIT.mp3'
  };

  // อัปเดตข้อมูลเพลงใน popup
  const songTitleEl = document.getElementById('currentSongTitle');
  const songArtistEl = document.getElementById('currentSongArtist');

  if (songTitleEl && songArtistEl) {
    songTitleEl.textContent = lockedSong.title;
    songArtistEl.textContent = lockedSong.artist;
  }

  // หยุดเพลงหลักก่อนเล่นเพลงใหม่
  if (el.audio && !el.audio.paused) {
    el.audio.pause();
  }

  // หยุดเพลง popup เก่าถ้ามี
  if (currentPopupAudio) {
    currentPopupAudio.pause();
    currentPopupAudio.currentTime = 0;
  }

  // สร้าง audio element ใหม่สำหรับ popup
  const surpriseAudio = new Audio(lockedSong.src);
  surpriseAudio.volume = 0.7;

  // เก็บ reference ของเพลง popup ปัจจุบัน
  currentPopupAudio = surpriseAudio;

  // เล่นเพลง
  surpriseAudio.play().catch(() => {
    // ถ้าเล่นไม่ได้ ให้เล่นเพลงหลักแทน
    play();
    if (songTitleEl && songArtistEl) {
      songTitleEl.textContent = config.songTitle;
      songArtistEl.textContent = config.songArtist;
    }
  });

  // แสดงข้อมูลเพลงใน console (สำหรับ debug)
  console.log(`🎵 Playing: ${lockedSong.title} by ${lockedSong.artist}`);

  // เพิ่ม event listener สำหรับปุ่ม play/pause ใน popup
  if (el.popupPlayBtn) {
    el.popupPlayBtn.onclick = function () {
      if (currentPopupAudio) {
        if (currentPopupAudio.paused) {
          currentPopupAudio.play();
          el.popupPlayBtn.textContent = '⏸';
        } else {
          currentPopupAudio.pause();
          el.popupPlayBtn.textContent = '▶';
        }
      }
    };

    // อัปเดตปุ่มเมื่อเพลงจบ
    surpriseAudio.addEventListener('ended', () => {
      el.popupPlayBtn.textContent = '▶';
    });
  }

  // หยุดเพลงเมื่อปิด modal และกลับไปเล่นเพลงหลัก
  const originalClose = closeSurpriseModal;
  window.closeSurpriseModal = function () {
    if (currentPopupAudio) {
      currentPopupAudio.pause();
      currentPopupAudio.currentTime = 0;
      currentPopupAudio = null;
    }

    // รีเซ็ตปุ่ม popup
    if (el.popupPlayBtn) {
      el.popupPlayBtn.textContent = '⏸';
      el.popupPlayBtn.onclick = null;
    }

    // กลับไปเล่นเพลงหลักต่อ (ถ้าเล่นอยู่ก่อนหน้า)
    if (el.audio && el.btnPlay.textContent === '⏸') {
      el.audio.play();
    }

    originalClose();
  };
}

// Modal control functions
function closeSurpriseModal() {
  el.surpriseModal.classList.add('d-none');
}

// เพิ่ม event listeners สำหรับ modal
document.addEventListener('DOMContentLoaded', () => {
  startContinuousConfetti(); // เริ่มคอนเฟตติเท่านั้น

  // Event listener สำหรับปิด modal
  if (el.closeModal) {
    el.closeModal.addEventListener('click', closeSurpriseModal);
  }

  // ปิด modal เมื่อคลิกที่ overlay
  if (el.surpriseModal) {
    el.surpriseModal.addEventListener('click', (e) => {
      if (e.target === el.surpriseModal || e.target.classList.contains('surprise-overlay')) {
        closeSurpriseModal();
      }
    });
  }

  // ปิด modal ด้วย Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !el.surpriseModal.classList.contains('d-none')) {
      closeSurpriseModal();
    }
  });
});

// Simple confetti
let confettiCtx, confettiPieces = [], confettiTimer;
function startConfetti() {
  const c = el.confetti;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  c.classList.remove('d-none');
  confettiCtx = c.getContext('2d');
  confettiPieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * c.width,
    y: -20 - Math.random() * c.height,
    r: 4 + Math.random() * 4,
    c: `hsl(${Math.random() * 360},80%,70%)`,
    s: 2 + Math.random() * 3
  }));
  function loop() {
    confettiCtx.clearRect(0, 0, c.width, c.height);
    confettiPieces.forEach(p => {
      p.y += p.s;
      confettiCtx.fillStyle = p.c;
      confettiCtx.beginPath();
      confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      confettiCtx.fill();
    });
    confettiTimer = requestAnimationFrame(loop);
  }
  loop();
}
function stopConfetti() {
  cancelAnimationFrame(confettiTimer);
  el.confetti.classList.add('d-none');
}

// No-op prev/next for single track demo
el.btnPrev.addEventListener('click', () => { });
el.btnNext.addEventListener('click', () => { });
