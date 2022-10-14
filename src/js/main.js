const body = document.querySelector('body')
const form = document.querySelector('#form')
const formReq = document.querySelectorAll('._req')
const fileImage = document.querySelector('#formFile')
const previewImage = document.querySelector('#previewFile')

const formValidate = (form) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/
    let error = 0

    for (let i = 0; i < formReq.length; i++) {
        let input = formReq[i]
        removeClassError(input)


        if (input.classList.contains('_name')) {
            if (input.value === '') {
                addClassError(input)
                error++
            }
        }
        if (input.classList.contains('_email')) {
            if (!regEx.test(input.value)) {
                addClassError(input)
                error++
            }
        }
        if (input.classList.contains('_checkbox') && input.checked === false) {
            addClassError(input)
            error++
        }
    }

    return error
}

const addClassError = (input) => {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
}

const removeClassError = (input) => {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}

const formSend = (e) => {
    e.preventDefault()

    const error = formValidate(form)
    const formData = new FormData(form)
    formData.append('image', fileImage.files[0])

    if (error !== 0) {
        alert('Заполните все обязательные поля!')
    } else {
        body.classList.add('_sending')
        let response = fetch('sendform.php', {
            method: 'POST',
            body: formData
        })
        if(response.ok) {
            let result = response.json()
            alert(result.message)
            previewImage.innerHTML = ''
            form.reset()
            body.classList.remove('_sending')
        } else {
            alert('Ошибка')
            body.classList.add('_sending')
        }
    }
}

const uploadFile = (file) => {
    if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert("Разрешены только изображения формата 'jpeg', 'png', 'gif' !!!")
        fileImage.value = ''
        return
    }
    if(file.size > 2 * 1024 * 1024) {
        alert("Файл должен быть менее 2мб !!!")
        fileImage.value = ''
        return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        previewImage.innerHTML = `<img src=${e.target.result} alt="image" />`
    }
    reader.onerror = () => {
        alert('Ошибка')
    }
    reader.readAsDataURL(file)
}

form.addEventListener('submit', formSend)
fileImage.addEventListener('change', () => {
    uploadFile(fileImage.files[0])
})