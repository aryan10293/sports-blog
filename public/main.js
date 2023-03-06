const edit = [...document.querySelectorAll('.submit')]
const titleC = document.querySelector('#title').value
const desC = document.querySelector('#des').value
const markdownC = document.querySelector('#markdown').value
edit.forEach(x => {
    x.addEventListener('click', editArt)
})
async function editArt(){
  const input = this.parentNode.childNodes[3].childNodes[4]
  console.log(input)
  const title = document.getElementById('title').value
  const des = document.getElementById('des').value
  const markdown = document.getElementById('markdown').value
  try{
      const response = await fetch('/edit/editArticle', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "titleC": titleC,
            "desC": desC,
            "markdownC": markdownC,
            "title": title,
            "des": des,
            "markdown": markdown,
          })
        })
      const data = await response.json()
      console.log(data)
      //location.reload()

  }catch(err){
      console.log(err)
  }
}