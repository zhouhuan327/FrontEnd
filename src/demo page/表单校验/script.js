const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


const showError = (input, msg) => {
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector('small')
    small.innerHTML = msg
}
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}
const checkRequire = arr => {
    arr.forEach(item => {
        if (item.value.trim() == '') {
            const label = item.parentElement.querySelector('label').innerHTML;
            console.log(label)
            showError(item, `${label}为必填项`)
        } else {
            showSuccess(item)
        }
    });
}
const checkEmail = (email) => {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(String(email.value.trim()))) {
        showSuccess(email)
    } else {
        showError(email, '邮箱格式错误')
    }
}
const checkpwd = (password, password2) => {
    if (password.value != password2.value && password2.value.trim() != '') {
        showError(password2, '密码不匹配')
    }
}
form.addEventListener('submit', e => {
    e.preventDefault()
    checkRequire([username, email, password, password2])
    checkEmail(email)
    checkpwd(password, password2)
})