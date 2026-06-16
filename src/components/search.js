import{
jobListSearchEl,
searchInputEl,
searchFormEl,
spinnerSearchEl,
numberEl
}from '../common.js';



// SEARCH COMPONENT
const submitHandler = event => {
    event.preventDefault();

    jobListSearchEl.innerHTML = '';
    //get input search text
    const searchText = searchInputEl.value;

    //Validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorTextEl.textContent = "your search may not contain number";
        errorEl.classList.add('error--visible');
        setTimeout(() => {
            errorEl.classList.remove('error--visible');
        }, 3000);
    }

    searchInputEl.blur();

    spinnerSearchEl.classList.add('spinner--visible');
    // fetch('data.json');
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log('something went wrong');
            }

            return response.json();
        })
        .then(data => {
            // job items           
            const { jobItems } = data;
            numberEl.textContent = jobItems.length;


            spinnerSearchEl.classList.remove('spinner--visible');
            spinnerSearchEl.classList.add('spinner--hidden');
            jobItems.slice(0, 7).forEach(jobItem => {
                const jobItemHtml = `
            <li class="job-item">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;
                jobListSearchEl.insertAdjacentHTML('beforeend', jobItemHtml);
            });

        })
        .catch(error => console.log(error));
};
searchFormEl.addEventListener('submit', submitHandler);