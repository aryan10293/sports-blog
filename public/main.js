// const more = [...document.querySelectorAll('.more')]

// more.forEach(x => {
//     x.addEventListener('click', imLost)
// })
// async function imLost(){
//     const title = this.parentNode.parentNode.childNodes[1].innerText
//     const date = this.parentNode.parentNode.childNodes[3].innerText
//     const des = this.parentNode.parentNode.childNodes[5].innerText
//    //const input = this.parentNode.childNodes[5].value
//     // console.log(title)
//     // console.log(date)
//     // console.log(des)
//     try{
//         const response = await fetch('/read', {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'titleS': title,
//               'dateS': date,
//               'desS': des,
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
//  }
