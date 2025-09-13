const { makeBadge, ValidationError } = require('badge-maker');
const fs = require('fs');

// 배지 저장 폴더
const folder = 'badges';
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

// 전체 기술 스택
const techStack = [
  // Frontend
  { name: 'React', color: 'blue', percent: 70, logo: 'react' },
  { name: 'Next.js', color: 'black', percent: 60, logo: 'next.js' },
  { name: 'JavaScript', color: 'yellow', percent: 75, logo: 'javascript' },
  { name: 'TypeScript', color: '007ACC', percent: 50, logo: 'typescript' },
  { name: 'Vue', color: 'brightgreen', percent: 50, logo: 'vue.js' },
  { name: 'HTML5', color: 'orange', percent: 85, logo: 'html5' },
  { name: 'CSS3', color: 'blue', percent: 85, logo: 'css3' },
  { name: 'jQuery', color: 'lightblue', percent: 50, logo: 'jquery' },
  { name: 'Bootstrap', color: 'purple', percent: 60, logo: 'bootstrap' },
  { name: 'Swiper.js', color: 'blue', percent: 50, logo: 'swiper' },
  { name: 'Full.js', color: 'orange', percent: 50, logo: 'fullcalendar' },

  // Backend / DB
  { name: 'Node.js', color: 'green', percent: 60, logo: 'node.js' },
  { name: 'PHP', color: 'purple', percent: 50, logo: 'php' },
  { name: 'MySQL', color: 'blue', percent: 60, logo: 'mysql' },
  { name: 'JSON', color: 'black', percent: 70, logo: 'json' },
  { name: 'Supabase', color: 'blue', percent: 50, logo: 'supabase' },
  { name: 'Firebase', color: 'orange', percent: 50, logo: 'firebase' },
  { name: 'Kakao Login', color: 'FFCD00', percent: 60, logo: 'kakao' },

  // Tools & Design
  { name: 'Git', color: 'red', percent: 90, logo: 'git' },
  { name: 'GitHub', color: 'black', percent: 90, logo: 'github' },
  { name: 'Figma', color: 'red', percent: 65, logo: 'figma' },
  { name: 'Notion', color: 'black', percent: 70, logo: 'notion' },
  { name: 'Vercel', color: 'black', percent: 60, logo: 'vercel' }
];

// 배지 생성
techStack.forEach(tech => {
  const format = {
    label: tech.name,
    message: `${tech.percent}%`,
    color: tech.color,
    style: 'flat-square',
    logo: tech.logo
  };

  try {
    const svg = makeBadge(format);
    fs.writeFileSync(`${folder}/${tech.name}.svg`, svg);
    console.log(` ${tech.name} badge created!`);
  } catch (e) {
    if (e instanceof ValidationError) console.error(e.message);
    else throw e;
  }
});