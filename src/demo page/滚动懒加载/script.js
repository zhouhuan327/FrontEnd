const postsContainer = document.getElementById('posts-container')
const loader = document.querySelector('.loader')
const filter = document.getElementById('filter')
let page = 1
let limit = 5


// fetch posts from http://jsonplaceholder.typicode.com/
async function getPosts(limit, page) {
    const res = await
        fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    console.log(data)
    return data
}
showPosts()
async function showPosts() {
    const posts = await getPosts(limit, page)
    posts.forEach(post => {
        const postEl = `<article class="post">
        <div class="number">${post.id}</div>
        <section class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </section>
      </article>`
        postsContainer.appendChild(parseDom(postEl))
    })
    loader.classList.remove("show")

}

function parseDom(arg) {
    const div = document.createElement('div')
    div.innerHTML = arg;
    console.log(typeof div.childNodes)
    return div.childNodes[0]
}
function filterPosts(e) {
    const term = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
}



// 监听滚动
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement
    if (Math.floor(scrollTop) + 1 + clientHeight >= scrollHeight) {

        loader.classList.add('show')
        setTimeout(() => {
            page++
            showPosts()
        }, 1000)
    }
})

filter.addEventListener('input', filterPosts)

