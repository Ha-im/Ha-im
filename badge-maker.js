const { makeBadge, ValidationError } = require('badge-maker');
const fs = require('fs');

// 배지 저장 폴더
const folder = 'badges';
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

// 경선님 맞춤 기술 스택
const techStack = [
  // Frontend
  { name: 'React', color: 'blue', percent: 70 },
  { name: 'Next.js', color: 'black', percent: 60 },
  { name: 'JavaScript', color: 'yellow', percent: 75 },
  { name: 'HTML5', color: 'orange', percent: 85 },
  { name: 'CSS3', color: 'blue', percent: 85 },

  // Backend / DB
  { name: 'Supabase', color: 'blue', percent: 50 },
  { name: 'Firebase', color: 'orange', percent: 40 },

  // Tools & Others
  { name: 'Git', color: 'red', percent: 90 },
  { name: 'GitHub', color: 'black', percent: 90 },
  { name: 'Figma', color: 'red', percent: 65 },
  { name: 'Notion', color: 'black', percent: 70 },
  { name: 'Vercel', color: 'black', percent: 60 }
];

// 배지 생성
techStack.forEach(tech => {
  const format = {
    label: tech.name,
    message: `${tech.percent}%`,
    color: tech.color,
    style: 'flat-square'
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