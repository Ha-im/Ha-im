const fs = require('fs');
const path = require('path');
const { makeBadge, ValidationError } = require('badge-maker');
const { si } = require('simple-icons');

const folder = path.join(__dirname, 'badges');

// badges 폴더 없으면 생성
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

// SVG 미리 읽기
const swiperSvg = fs.readFileSync(path.join(__dirname, 'icons', 'swiper.svg'));
const tistorySvg = fs.readFileSync(path.join(__dirname, 'icons', 'tistory.svg'));

// 기술 스택 정의
const techStack = [
  // Frontend
  { name: 'React', color: 'blue', icon: si.react },
  { name: 'Next.js', color: 'black', icon: si.nextdotjs },
  { name: 'JavaScript', color: 'yellow', icon: si.javascript },
  { name: 'TypeScript', color: '#007ACC', icon: si.typescript },
  { name: 'Vue', color: 'brightgreen', icon: si.vue },
  { name: 'HTML5', color: 'orange', icon: si.html5 },
  { name: 'CSS3', color: 'blue', icon: si.css3 },
  { name: 'jQuery', color: 'lightblue', icon: si.jquery },
  { name: 'Bootstrap', color: 'purple', icon: si.bootstrap },
  { name: 'Swiper.js', color: 'blue', logoBase64: Buffer.from(swiperSvg).toString('base64') },
  { name: 'Full.js', color: 'orange', icon: si.fullcalendar },

  // Backend / DB
  { name: 'Node.js', color: 'green', icon: si.nodejs },
  { name: 'PHP', color: 'purple', icon: si.php },
  { name: 'MySQL', color: 'blue', icon: si.mysql },
  { name: 'JSON', color: 'black', icon: si.json },
  { name: 'Supabase', color: 'blue', icon: si.supabase },
  { name: 'Firebase', color: 'orange', icon: si.firebase },
  { name: 'Kakao Login', color: '#FFCD00' }, // 로고 없음

  // Tools & Design
  { name: 'Git', color: 'red', icon: si.git },
  { name: 'GitHub', color: 'black', icon: si.github },
  { name: 'Figma', color: 'red', icon: si.figma },
  { name: 'Tistory', color: 'black', logoBase64: Buffer.from(tistorySvg).toString('base64') },
  { name: 'Vercel', color: 'black', icon: si.vercel }
];

// 배지 생성
techStack.forEach(tech => {
  const format = {
    label: tech.name,
    message: '100%',
    color: tech.color,
    style: 'flat-square',
    logoBase64: tech.logoBase64 || (tech.icon ? Buffer.from(tech.icon.svg).toString('base64') : undefined)
  };

  try {
    const svg = makeBadge(format);
    const fileName = tech.name.replace(/\s/g, '-').replace(/\./g, '') + '.svg';
    fs.writeFileSync(path.join(folder, fileName), svg);
    console.log(`✅ ${tech.name} badge created!`);
  } catch (e) {
    if (e instanceof ValidationError) console.error(` ${tech.name}: ${e.message}`);
    else throw e;
  }
});