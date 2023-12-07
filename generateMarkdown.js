import fs from 'fs';
import path from 'path';

const lessonsData = [
  {
    lessonId: 'ch39idk',
    slides: [
      {
        slideTitle: 'Slide 1 Title',
        cards: [
          { imageUrl: 'https://microcontrollerslab.com/wp-content/uploads/2015/09/mechatronics-engineering-projects-ideas.jpg', title: 'Heading 1', paragraph: 'Text paragraph for Image 1.' },
          { imageUrl: 'https://img.freepik.com/premium-photo/circuit-board-real-is-vital-optimal-function-electronics_892776-16285.jpg', title: 'Heading 2', paragraph: 'Text paragraph for Image 2.' },
          { imageUrl: 'https://ae01.alicdn.com/kf/S1a52499da1d94a71b1dfe199fd2357efI/Breadboard-400-830-Solderless-Breadboards-65Pcs-M-M.jpg', title: 'Heading 3', paragraph: 'Text paragraph for Image 3.Text paragraph for Image 3.Text paragraph for Image 3.' },
        ],
      },
      {
        slideTitle: 'Slide 2 Title',
        cards: [
          { imageUrl: 'https://ae01.alicdn.com/kf/S1a52499da1d94a71b1dfe199fd2357efI/Breadboard-400-830-Solderless-Breadboards-65Pcs-M-M.jpg', title: 'Heading 1', paragraph: 'Text paragraph for Image 1.' },
          { imageUrl: 'https://img.freepik.com/premium-photo/circuit-board-real-is-vital-optimal-function-electronics_892776-16285.jpg', title: 'Heading 2', paragraph: 'Text paragraph for Image 2.' },
          { imageUrl: 'https://ae01.alicdn.com/kf/S1a52499da1d94a71b1dfe199fd2357efI/Breadboard-400-830-Solderless-Breadboards-65Pcs-M-M.jpg', title: 'Heading 3', paragraph: 'Text paragraph for Image 3.Text paragraph for Image 3.Text paragraph for Image 3.' },
        ],
      },
    ],
  },
];

const colors = ['#FFD700', '#F41804', '#FCA820', '#007bff'];

const generateCardContent = (cards) => {
  return cards.map((card, index) => {
    const color = colors[index % colors.length];
    const cardWidth = cards.length === 4 ? 'w-[12rem]' : 'w-[16rem]';
    const cardHeight = cards.length === 4 ? 'h-[10rem]' : 'h-[10rem]';

    return `
      <div class="slidev-div">
        <img src="${card.imageUrl}" class='${cardWidth} ${cardHeight} border-3 rounded-2xl border-${color}' alt="Image" />
        <div class="mt-4 ${cardWidth}">
          <h3 class='text-[22px] text-${color}'>${card.title}</h3>
          <p>${card.paragraph}</p>
        </div>
      </div>`;
  }).join('');
};

lessonsData.forEach((lesson) => {
  const lessonId = lesson.lessonId || 'defaultLessonId';
  const finalContentArray = [];

  lesson.slides.forEach((slide, index) => {
    const slideTitle = slide.slideTitle || `Slide ${index + 1} Title`;
    const cardContent = generateCardContent(slide.cards);

    finalContentArray.push(`
---
layout: center
style:
  backgroundColor: '#13143c'
  color: '#fff'
--- 
# ${slideTitle}

<div class="flex justify-between gap-8">${cardContent}</div>`);
  });

  const finalContent = finalContentArray.join('\n').trim();
  const markdownDirectory = 'Markdown';  // New directory for storing markdown files
  const fileName = `${lessonId}.md`;
  const filePath = path.join(markdownDirectory, fileName);

  // Ensure the directory exists before writing the file
  if (!fs.existsSync(markdownDirectory)) {
    fs.mkdirSync(markdownDirectory);
  }

  fs.writeFileSync(filePath, finalContent, 'utf-8');
  console.log(`Markdown generation complete for Lesson ${lessonId}. File saved as ${filePath}`);
});
