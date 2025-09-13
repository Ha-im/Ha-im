const { makeBadge, ValidationError } = require('badge-maker');
const fs = require('fs');

// 기술 스택 데이터
const techStack = [
  { name: 'React', color: 'blue', percent: 70 },
  { name: 'JavaScript', color: 'yellow', percent: 60 },
  { name: 'Vue', color: 'brightgreen', percent: 50 },
  { name: 'Next.js', color: 'black', percent: 40 },
  { name: 'Node.js', color: 'green', percent: 60 },
  { name: 'PHP', color: 'purple', percent: 50 },
  { name: 'MySQL', color: 'blue', percent: 60 },
  { name: 'JSON', color: 'black', percent: 70 },
  { name: 'Figma', color: 'red', percent: 50 },
  { name: 'Kakao Login', color: 'FFCD00', percent: 60 }
];

// 배지 생성
techStack.forEach(tech => {
  const format = {
    label: tech.name,
    message: `${tech.percent}%`,
    color: tech.color,
    style: 'flat-square' // 배지 스타일: flat, flat-square, plastic 등
  };

  try {
    const svg = makeBadge(format);
    fs.writeFileSync(`badges/${tech.name}.svg`, svg);
    console.log(`✅ ${tech.name} badge created!`);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.error(e.message);
    } else {
      throw e;
    }
  }
});