/* Learn Section Function */
const loadLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"; +

        fetch(url)
            .then(response => response.json())
            .then(json => displayLevel(json.data))
}

const displayLevel = (lessons) => {
    const level_container = document.getElementById('level_container')
    level_container.innerHTML = '';

    lessons.forEach(lesson => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="level_btn_${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson_btn">
            <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
          </button>`;
        level_container.appendChild(div);
    })
}

const removeActiveClass = () => {
    const allBtn = document.querySelectorAll('.lesson_btn');
    allBtn.forEach(btn => {
        btn.classList.remove('btn-active');
    });
}

/* Word Section Function */
const loadLevelWord = (level_no) => {
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;

    fetch(url)
        .then(response => response.json())
        .then(json => {
            removeActiveClass();
            const clickBtn = document.getElementById(`level_btn_${level_no}`);
            clickBtn.classList.add('btn-active');
            displayLevelWord(json.data)
        })

    const empty_container = document.getElementById('empty_container');
    const word_container = document.getElementById('word_container');

    empty_container.classList.add('hidden');
    word_container.classList.remove('hidden');
};


const displayLevelWord = (words) => {
    const word_container = document.getElementById('word_container');
    word_container.innerHTML = '';

    if (words.length === 0) {
        const empty_container = document.getElementById('empty_container');
        const empty_lesson_container = document.getElementById('empty_lesson_container');
        const word_container = document.getElementById('word_container');

        empty_container.classList.add('hidden');
        word_container.classList.add('hidden');
        empty_lesson_container.classList.remove('hidden');
    } else {
        const empty_lesson_container = document.getElementById('empty_lesson_container');

        empty_lesson_container.classList.add('hidden');
    }

    words.forEach(word => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="md:w-[547px] p-10 md:p-14 bg-white rounded-lg mx-auto text-center">
          <div class="space-y-6 font_inter mt-6">
            <h1 class="text-[32px] text-[#000000] font-bold leading-6">${word.word ? word.word : 'Word not found'}</h1>
            <p class="text-xl text[#000000] font-medium leading-6">
              Meaning / Pronunciation
            </p>
          </div>
          <h1 class="text-[32px] text-[#18181B] font-semibold font_bangla mt-6">
            "${word.meaning ? word.meaning : 'শব্দার্থ পাওয়া যায়নি '} / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায়নি '}"
          </h1>
          <div class="flex justify-between mt-7 md:mt-14">
            <button class="p-4 text-[#374957] text-lg bg-[#1A91FF]/10 hover:bg[#1A91FF]/20 rounded-lg">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="p-4 text-[#374957] text-lg bg-[#1A91FF]/10 rounded-lg">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
            `;
        word_container.appendChild(div);
    });
}
loadLevels()