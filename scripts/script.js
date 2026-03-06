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

/* Word Details Modal */
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data);

     // Open the modal
     const modal = document.getElementById('my_modal_1');
     if (modal) {
         modal.showModal();
     }
}

const displayWordDetail = (word) => {
    const dialog_container = document.getElementById('dialog_container');
    dialog_container.innerHTML = "";

    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="my_modal_1" class="modal">
        <div class="modal-box p-6">
          <div class="border border-[#EDF7FF] rounded-xl p-6 space-y-8">
            <h1 class="text-4xl text-[#000000] font-semibold leading-10 font_bangla">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h1>
            <div class="space-y-2.5">
              <h3 class="text-2xl text-[#000000] font-semibold leading-10">Meaning</h3>
              <p class="text-2xl text-[#000000] font-medium leading-10">${word.meaning}</p>
            </div>
            <div class="space-y-2.5">
              <h3 class="text-2xl text-[#000000] font-semibold leading-10">Example</h3>
              <p class="text-2xl text-[#000000] font-medium leading-10">${word.sentence}</p>
            </div>
            <div class="space-y-2.5">
              <h3 class="text-2xl text-[#000000] font-semibold leading-10 font_bangla">সমার্থক শব্দ গুলো</h3>
              <div class="flex flex-wrap gap-5">

                <button
                  class="btn btn-soft btn-primary text-[#000000] hover:text-white"
                >
                  ${word.synonyms[0] ? word.synonyms[0] : 'সমার্থক শব্দ পাওয়া যায়নি'}
                </button>
                <button
                  class="btn btn-soft btn-primary text-[#000000] hover:text-white"
                >
                    ${word.synonyms[1] ? word.synonyms[1] : 'সমার্থক শব্দ পাওয়া যায়নি'} 
                </button>
                <button
                  class="btn btn-soft btn-primary text-[#000000] hover:text-white"
                >
                    ${word.synonyms[2] ? word.synonyms[2] : 'সমার্থক শব্দ পাওয়া যায়নি'}
                </button>
              </div>
            </div>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-primary rounded-3xl">
                Complete Learning
              </button>
            </form>
          </div>
        </div>
      </dialog>
    `;
    dialog_container.appendChild(div);
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
            <button onclick="loadWordDetail(${word.id})" 
                    class="p-4 text-[#374957] text-lg bg-[#1A91FF]/10 hover:bg[#1A91FF]/20 rounded-lg">
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