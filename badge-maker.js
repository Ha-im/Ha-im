
const techStack = [
  // Frontend
  { name: 'React', color: 'blue', icon: si.react },
  { name: 'Next.js', color: 'black', icon: si.nextdotjs },
  { name: 'JavaScript', color: 'yellow', icon: si.javascript },
  { name: 'TypeScript', color: '007ACC', icon: si.typescript },
  { name: 'Vue', color: 'brightgreen', icon: si.vue },
  { name: 'HTML5', color: 'orange', icon: si.html5 },
  { name: 'CSS3', color: 'blue', icon: si.css3 },
  { name: 'jQuery', color: 'lightblue', icon: si.jquery },
  { name: 'Bootstrap', color: 'purple', icon: si.bootstrap },
  { name: 'Swiper.js', color: 'blue' }, // 로고x
  { name: 'Full.js', color: 'orange', icon: si.fullcalendar },

  // Backend / DB
  { name: 'Node.js', color: 'green', icon: si.nodejs },
  { name: 'PHP', color: 'purple', icon: si.php },
  { name: 'MySQL', color: 'blue', icon: si.mysql },
  { name: 'JSON', color: 'black', icon: si.json },
  { name: 'Supabase', color: 'blue', icon: si.supabase },
  { name: 'Firebase', color: 'orange', icon: si.firebase },
  { name: 'Kakao Login', color: 'FFCD00' }, // 로고x

  // Tools & Design
  { name: 'Git', color: 'red', icon: si.git },
  { name: 'GitHub', color: 'black', icon: si.github },
  { name: 'Figma', color: 'red', icon: si.figma },
  { name: 'Tistory', color: 'black' }, // 로고x
  { name: 'Vercel', color: 'black', icon: si.vercel }
];

// 배지 생성
techStack.forEach(tech => {
  const format = {
    label: tech.name,
    message: '100%',
    color: tech.color,
    style: 'flat-square',
    logoBase64: tech.icon ? Buffer.from(tech.icon.svg).toString('base64') : undefined
  };

  try {
    const svg = makeBadge(format);
    const fileName = tech.name.replace(/\s/g, '-').replace(/\./g, '') + '.svg';
    fs.writeFileSync(`${folder}/${fileName}`, svg);
    console.log(`✅ ${tech.name} badge created!`);
  } catch (e) {
    if (e instanceof ValidationError) console.error(e.message);
    else throw e;
  }
});