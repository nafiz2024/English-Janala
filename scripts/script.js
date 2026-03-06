/* Learn Section Function */
const loadLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"; +

        fetch(url)
            .then(response => response.json())
            .then(json => displayLevel(json.data))
}

const displayLevel = (lessons) => {
    const level_container = document.getElementById('button_container')
    level_container.innerHTML = '';

    lessons.forEach(lesson => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
          </button>`;
        level_container.appendChild(div);
    })
}

/* Word Section Function */
const loadLevelWord = (level_no) => {
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;

    fetch(url)
        .then(response => response.json())
        .then(json => displayLevelWord(json.data))
};


const displayLevelWord = (words) => {
    const level_container = document.getElementById('level_container')

    words.forEach(word => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="md:w-[547px] p-10 md:p-14 bg-white rounded-lg mx-auto text-center">
          <div class="space-y-6 font_inter mt-6">
            <h1 class="text-[32px] text-[#000000] font-bold leading-6">${word.word}</h1>
            <p class="text-xl text[#000000] font-medium leading-6">
              Meaning / Pronunciation
            </p>
          </div>
          <h1 class="text-[32px] text-[#18181B] font-semibold font_bangla mt-6">
            "${word.meaning} / ${word.pronunciation}"
          </h1>
          <div class="flex justify-between md:mt-14">
            <button class="p-4 text-[#374957] text-lg bg-[#1A91FF]/10 rounded-lg">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="p-4 text-[#374957] text-lg bg-[#1A91FF]/10 rounded-lg">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
            `;
        level_container.appendChild(div);
    });
}
loadLevels()