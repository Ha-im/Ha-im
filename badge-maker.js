const { makeBadge, ValidationError } = require('badge-maker');
const fs = require('fs');
const path = require('path');

// SVG → Base64 변환
const svgToBase64 = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  const svg = fs.readFileSync(filePath, 'utf8');
  return Buffer.from(svg).toString('base64');
};

// 배지 저장 폴더
const folder = 'badges';
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

// 최종 기술 스택
const techStack = [
  // Frontend
  { name: 'React', color: 'blue', percent: 70, logoFile: 'logos/react.svg' },
  { name: 'Next.js', color: 'black', percent: 60, logoFile: 'logos/nextjs.svg' },
  { name: 'JavaScript', color: 'yellow', percent: 75, logoFile: 'logos/javascript.svg' },
  { name: 'TypeScript', color: '007ACC', percent: 50, logoFile: 'logos/typescript.svg' },
  { name: 'Vue', color: 'brightgreen', percent: 50, logoFile: 'logos/vue.svg' },
  { name: 'HTML5', color: 'orange', percent: 85, logoFile: 'logos/html5.svg' },
  { name: 'CSS3', color: 'blue', percent: 85, logoFile: 'logos/css3.svg' },
  { name: 'jQuery', color: 'lightblue', percent: 50, logoFile: 'logos/jquery.svg' },
  { name: 'Bootstrap', color: 'purple', percent: 60, logoFile: 'logos/bootstrap.svg' },
  { name: 'Swiper.js', color: 'blue', percent: 50, logoFile: 'logos/swiper.svg' },
  { name: 'Full.js', color: 'orange', percent: 50, logoFile: 'logos/fullcalendar.svg' },

  // Backend / DB
  { name: 'Node.js', color: 'green', percent: 60, logoFile: 'logos/nodejs.svg' },
  { name: 'PHP', color: 'purple', percent: 50, logoFile: 'logos/php.svg' },
  { name: 'MySQL', color: 'blue', percent: 60, logoFile: 'logos/mysql.svg' },
  { name: 'JSON', color: 'black', percent: 70, logoFile: 'logos/json.svg' },
  { name: 'Supabase', color: 'blue', percent: 50, logoFile: 'logos/supabase.svg' },
  { name: 'Firebase', color: 'orange', percent: 50, logoFile: 'logos/firebase.svg' },
  { name: 'Kakao Login', color: 'FFCD00', percent: 60 }, // 아이콘 없음

  // Tools & Design
  { name: 'Git', color: 'red', percent: 90, logoFile: 'logos/git.svg' },
  { name: 'GitHub', color: 'black', percent: 90, logoFile: 'logos/github.svg' },
  { name: 'Figma', color: 'red', percent: 65, logoFile: 'logos/figma.svg' },
  { name: 'Notion', color: 'black', percent: 70, logoFile: 'logos/tistory.svg' }, // 티스토리로 변경
  { name: 'Vercel', color: 'black', percent: 60, logoFile: 'logos/vercel.svg' }
];

// 배지 생성
techStack.forEach(tech => {
  try {
    const format = {
      label: tech.name,
      message: `${tech.percent}%`,
      color: tech.color,
      style: 'flat-square',
      ...(tech.logoFile && svgToBase64(path.join(__dirname, tech.logoFile)) ? {
        logoBase64: svgToBase64(path.join(__dirname, tech.logoFile))
      } : {})
    };

    // 파일명 공백 -> 하이픈 처리
    const fileName = tech.name.replace(/\s/g, '-').replace(/\./g, '') + '.svg';
    const svg = makeBadge(format);
    fs.writeFileSync(`${folder}/${fileName}`, svg);

    console.log(`✅ ${tech.name} badge created!`);
  } catch (e) {
    if (e instanceof ValidationError) console.error(e.message);
    else throw e;
  }
});