let listRepo = []
const form = document.querySelector('.form');
const link = 'https://api.github.com/search/repositories?q=';

const createElem = (parent, elemName, txt, objProperties) => {
    const elem = document.createElement(elemName);
    if (txt == null) {
        elem.innerHTML = 'данные отутствует';
    } else {
        elem.innerHTML = txt;
    }
    if (objProperties) {
        Object.keys(objProperties).map(key => {
            elem.setAttribute(key, objProperties[key]);
        })
    }
    parent.append(elem);
    return elem;
}

const createRepo = (response) => {

    const rr = 'repositories-repo';

    const wrp = document.querySelector('.repositories');
    const repo = createElem(wrp, 'div', '', { class: `${rr}` });
    const title = createElem(repo, 'h2', response.name, { class: `${rr}_title` });
    const avatar = createElem(repo, 'img', '', { class: `${rr}_useravatar`, src: response.owner.avatar_url, alt: 'avatar' });
    const info = createElem(repo, 'div', '', { class: `${rr}_info` });
    const username = createElem(info, 'div', '', { class: `${rr}_info_block ${rr}_info_username` });
    const usernameTitle = createElem(username, 'span', 'Владелец: ', { class: `${rr}_info_block_title` });
    const usernameTxt = createElem(username, 'span', response.owner.login, { class: `${rr}_info_username_txt` });
    const repoName = createElem(info, 'div', '', { class: `${rr}_info_block ${rr}_info_reponame` });
    const repoNameTitle = createElem(repoName, 'span', 'Ссылка: ', { class: `${rr}_info_block_title` });
    const repoNameLink = createElem(repoName, 'a', response.name, { class: `${rr}_info_reponame_link`, href: response.html_url, target: '_blank' });
    const langName = createElem(info, 'div', '', { class: `${rr}_info_block ${rr}_info_lang` });
    const langNameTitle = createElem(langName, 'span', 'Язык: ', { class: `${rr}_info_block_title` });
    const langNameTxt = createElem(langName, 'span', response.language, { class: `${rr}_info_lang_txt` });
    const description = createElem(info, 'div', '', { class: `${rr}_info_block ${rr}_info_description` });
    const descriptionTitle = createElem(description, 'span', 'Описание: ', { class: `${rr}_info_block_title` });
    const descriptionTxt = createElem(description, 'span', response.description, { class: `${rr}_info_description_txt` });

    wrp.append(repo);
}

const createLoading = () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    const img = createElem(loading, 'img', '', { class: 'loading-img', src: './assests/img/loading.svg', alt: 'loading' })
    document.body.append(loading);
}

const deleteLoading = () => {
    const loading = document.querySelector('.loading');
    document.body.removeChild(loading)

}

form.onsubmit = async (event) => {
    event.preventDefault();

    const formTxt = document.querySelector('#form-name');
    const error = document.querySelector('.form-error');

    if(formTxt.value.length < 3) {
        const errorBody = document.querySelector('.form-error_txt');
        errorBody.innerHTML = 'Мин. длина 3 символа'
        error.classList.add('form-error_show');
        formTxt.classList.add('form-name_error');
        throw 'ошибка в поле поиска'
    }

    createLoading();
    document.querySelector('.form-btn').disabled = 'true';

    const response = await fetch(link + formTxt.value);

    if (response.ok) {
        const wrp = document.querySelector('.repositories');
        const data = await response.json();
        wrp.innerHTML = '';
        

        if (data.items.length == 0) {
            localStorage.setItem('findRepo', JSON.stringify([]));
            const empty = createElem(wrp, 'p', 'Ничего не найдено', { class: `repositories_empty` });
        } else {
            localStorage.setItem('findRepo', JSON.stringify(data.items.slice(0, 12)));
            listRepo = [...JSON.parse(localStorage.getItem('findRepo'))];
            listRepo.map(item => {
                createRepo(item)
            })
        }
    } else {
        throw 'не найдено';
    }

    // formTxt.value = '';

    deleteLoading();
    document.querySelector('.form-btn').removeAttribute('disabled');
}

document.querySelector('#form-name').oninput = () => {
    const inputElem = document.querySelector('#form-name');
    const blockWithError = document.querySelector('.form-error');
    if (blockWithError.classList.contains('form-error_show')) {
        blockWithError.classList.remove('form-error_show');
        inputElem.classList.remove('form-name_error');
    }
}

const initialized = () => {
    createLoading();

    const wrp = document.querySelector('.repositories');
    listRepo = [...JSON.parse(localStorage.getItem('findRepo'))];
    if (listRepo.length == 0) {
        const empty = createElem(wrp, 'p', 'Ничего не найдено', { class: `repositories_empty` });
    } else {
        listRepo.map(item => {
            createRepo(item)
        })
    }

    deleteLoading();
}

initialized();