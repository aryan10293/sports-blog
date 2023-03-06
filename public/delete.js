const deleteArt = [...document.querySelectorAll('.delete')]

deleteArt.forEach(x => {
    x.addEventListener('click', deleteBtn)
})
async function deleteBtn(){
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const readTitle = this.parentNode.childNodes[3].innerText
    console.log(title === true)
    if(title){
        try{
            const response = await fetch('deleteArt', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  'titleS': title,
                })
              })
            const data = await response.json()
            console.log(data)
            location.reload()
    
        }catch(err){
            console.log(err)
        }
    } else {
        try{
            const response = await fetch('deleteArt', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  'titleS': readTitle,
                })
              })
            const data = await response.json()
            console.log(data)
            //location.reload()
        
        }catch(err){
            
            console.log(err)
        }
    }
 }