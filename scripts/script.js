const loadLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";+

    fetch(url)
    .then(response => response.json())
    .then(data => displayLevel(data.data))
}

const displayLevel = (lessons) => {
    const level_container = document.getElementById('level_container')
    level_container.innerHTML = '';

    lessons.forEach(lesson => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
          </button>`;
        level_container.appendChild(div);
    })
}

loadLevels()