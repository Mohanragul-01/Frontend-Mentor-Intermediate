let jobs;
var mainContainer = document.querySelector('.container');

fetch("data.json")
    .then((res) => res.json())
    .then((data) => initialize(data))
    .catch((err) => console.log('Error: ' + err));

function initialize(data) {
    jobs = data;

    for (let i = 0; i < jobs.length; i++) {
        createItem(jobs[i]);
    }
}

function createItem(job) {
    let languages = [];
    let tools = [];

    var jobContainer = createDivTag(job.id, 'main__job-container', mainContainer);

    jobContainer.dataset.role = job.role;
    jobContainer.dataset.level = job.level;

    var wrapper = createDivTag('', 'job-container__wrapper', jobContainer);

    var imgContainer = createDivTag('', 'job-container__image', wrapper);
    createImgTag(job.logo, `${job.company} logo`, imgContainer);

    var infoContainer = createDivTag('', 'job-container__info', wrapper);

    var companyContainer = createDivTag('', 'info__company', infoContainer);
    createPTag(job.company, 'company', companyContainer);
    if (job.new) {
        createSpanTag('company__new', 'new!', companyContainer);
    }
    if (job.featured) {
        createSpanTag('company__featured', 'featured', companyContainer);
    }

    createPTag(job.position, 'position', infoContainer);

    var detailsContainer = createDivTag('', 'info__details', infoContainer);
    createPTag(job.postedAt, '', detailsContainer);
    createPTag('•', '', detailsContainer);
    createPTag(job.contract, '', detailsContainer);
    createPTag('•', '', detailsContainer);
    createPTag(job.location, '', detailsContainer);

    var tagsContainer = createDivTag('', 'job-container__tags', jobContainer);
    createSpanTag('tags__item', job.role, tagsContainer, 1, job.role, 'role');
    createSpanTag('tags__item', job.level, tagsContainer, 1, job.level, 'level');

    for (let i = 0; i < job.languages.length; i++) {
        createSpanTag('tags__item', job.languages[i], tagsContainer, 1, job.languages[i], 'languages');
        languages.push(job.languages[i]);
        jobContainer.dataset.languages = languages.join();
    }

    if (job.tools.length != 0) {
        for (let i = 0; i < job.tools.length; i++) {
            createSpanTag('tags__item', job.tools[i], tagsContainer, 1, job.tools[i], 'tools');
            tools.push(job.tools[i]);
            jobContainer.dataset.tools = tools.join();
        }
    } 
    else {
        jobContainer.dataset.tools = 'empty';
    }
}

function createDivTag(id, className, parent) {
    var container = document.createElement('div');

    if (id != '')
        container.setAttribute('id', id);

    container.classList = className;
    parent.appendChild(container);

    return container;
}

function createPTag(content, className, parent) {
    var element = document.createElement('p');
    element.classList = className;
    element.innerHTML = content;
    parent.appendChild(element);

    return element;
}

function createSpanTag(className, content, parent, click = 0, filterValue = '', filterType = '') {
    var element = document.createElement('span');
    element.classList = className;
    element.innerHTML = content;

    if (click == 1) {
        element.setAttribute('onclick', 'openFilter(this.dataset.value, this.dataset.type)');
    } 
    else if (click == 2) {
        element.setAttribute('onclick', 'deleteTag(this)');
    }

    if (filterValue != '')
        element.dataset.value = filterValue;

    if (filterType != '') 
        element.dataset.type = filterType;

    parent.appendChild(element);
    return element;
}

function createImgTag(src, alt, parent) {
    var element = document.createElement('img');
    element.setAttribute('src', src);
    element.setAttribute('alt', alt);
    parent.appendChild(element);

    return element;
}

var paramContainer = document.querySelector('.filter-container__params'),
    filterContainer = document.querySelector('.main__filter-container');

function openFilter(filterParam, filterType) {
    if (filterContainer.classList.contains('hidden')) {
        filterContainer.classList.toggle('hidden');
        filterContainer.classList.toggle('show');
    }

    let tagExists = false;
    
    if (paramContainer.childNodes.length == 0) {
        createSpanTag('params__item', filterParam, paramContainer, 2, filterParam, filterType);
    } 
    else {
        for (let i = 0; i < paramContainer.childNodes.length; i++) {
            if (paramContainer.children[i].dataset.value == filterParam)
                tagExists = true;
        }

        if (!tagExists)
            createSpanTag('params__item', filterParam, paramContainer, 2, filterParam, filterType);
    }

    filterJobs(jobs);
}

function filterJobs(job) {
    for (let i = 0; i < mainContainer.childNodes.length; i++) {
        let filtersSelected = 0;
        
        if (paramContainer.childNodes == 0) 
            mainContainer.children[i].classList.remove('hidden');

        for (let y = 0; y < paramContainer.childNodes.length; y++) {
            if ((mainContainer.children[i].dataset[paramContainer.children[y].dataset.type].includes(paramContainer.children[y].dataset.value)))
                filtersSelected++
        }

        if (filtersSelected == paramContainer.childNodes.length) {
            mainContainer.children[i].classList.remove('hidden');
        } 
        else {
            mainContainer.children[i].classList.add('hidden');
        }
    }
}

function closeFilter() {
    filterContainer.classList.toggle('animateDisplay');
    filterContainer.classList.toggle('animateClose');

    setTimeout(() => {
        filterContainer.classList.toggle('show');
        filterContainer.classList.toggle('hidden');
        filterContainer.classList.toggle('animateDisplay');
        filterContainer.classList.toggle('animateClose');
    }, 500);

    paramContainer.innerHTML = "";
    mainContainer.innerHTML = "";

    fetch("data.json")
        .then((res) => res.json())
        .then((data) => initialize(data))
        .catch((err) => console.log('Error: ' + err));
}

function deleteTag(tag) {
    let promise = new Promise(function (resolve, reject) {
        paramContainer.removeChild(tag);
    });

    promise.then(paramContainer.childNodes.length == 0 ? closeFilter() : false)
        .then(filterJobs(jobs))
        .catch((error) => console.log(error));
}
