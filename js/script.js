let btn = document.querySelector('#search')
let BooksList = document.querySelector('#list-books')
let arr = []
let ArrBtns = []
let header = {header: '9e874eb6'}
let form = document.querySelector('form')
let pag = document.querySelector('#pagination')
let btn1 = document.querySelector('#a1')
let btn2 = document.querySelector('#a2')
let btn3 = document.querySelector('#a3')
let btn4 = document.querySelector('#a4')
let id = ''
let details = document.querySelector('#divDetails')
form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
})
btn.addEventListener('click', (ev)=>{
    let type = document.querySelector('#type').value
    let title = document.querySelector('#title').value.replaceAll(' ', '_')
    let url9 = `https://www.omdbapi.com?apikey=9e874eb6&type=${type}&s=${title}`
    console.log(url9)
    fetch(url9)
    .then(promise => promise.json())
    .then(data => {
        BooksList.innerHTML = ''
        console.log(data);
        if(data['Response'] === 'True'){
            data.Search.forEach((el)=>{
                let parent = document.createElement('div')
                let BookType = document.createElement('p')
                BookType.textContent = el.Type
                let BookName = document.createElement('b')
                BookName.textContent = el.Title
                let BookYear = document.createElement('p')
                BookYear.textContent = el.Year
                let BookImg = document.createElement('img')
                BookImg.src = el.Poster
                BookImg.style.width = '100px'
                BookImg.style.height = '100px'
                let DivImg = document.createElement('div')
                let DivText = document.createElement('div')
                DivText.style.marginLeft = '30px'
                let BookBtn = document.createElement('button')
                BookBtn.id = 'details'
                BookBtn.textContent = 'Details'
                BookBtn.style.width = '200px'
                BookBtn.style.padding = '7px'

                DivImg.append(BookImg)
                DivText.append(BookType, BookName, BookYear)
                let Div = document.createElement('div')
                Div.style.display = 'flex'
                Div.append(DivImg, DivText)
                parent.append(Div, BookBtn)
                parent.style.display = 'flex'
                parent.style.flexDirection = 'column'
                parent.style.border = '1px solid black'
                parent.style.borderRadius = '15px'
                parent.style.padding = '10px'
                parent.style.width = '300px'
                arr.push(parent)
                ArrBtns.push(parent.childNodes[1])
            })
            BooksList.append(arr[0], arr[1], arr[2])
            btn1.addEventListener('click', (ev) =>{
                BooksList.innerHTML = ''
                BooksList.append(arr[0], arr[1], arr[2])
            })
            btn2.addEventListener('click', (ev) =>{
                BooksList.innerHTML = ''
                BooksList.append(arr[3], arr[4], arr[5])
            })
            btn3.addEventListener('click', (ev) =>{
                BooksList.innerHTML = ''
                BooksList.append(arr[6], arr[7], arr[8])
            })
            btn4.addEventListener('click', (ev) =>{
                BooksList.innerHTML = ''
                BooksList.append(arr[9])
            })
            
            ArrBtns.forEach((button) => {
                button.addEventListener('click', (ev)=>{
                    let i = ev.target.parentNode.childNodes[0].childNodes[1].childNodes[1].textContent
                    data['Search'].forEach((el) =>{
                        if(el['Title'] === i){
                            id = el['imdbID']
                        }
                    })
                    let url_2 = `https://www.omdbapi.com/?i=${id}&apikey=9e874eb6`
                fetch(url_2)
                .then(promise => promise.json())
                .then(data => {
                    
                    details.innerHTML = ''
                    let parentDetails = document.createElement('div')
                    let img = document.createElement('img')
                    img.src = data['Poster']
                    img.style.width = '250px'
                    img.style.height = '400px'
                    let title = document.createElement('p')
                    title.textContent =`Title:  ${data['Title']}`
                    let real = document.createElement('p')
                    real.textContent = `Released:   ${data['Released']}`
                    let genre = document.createElement('p')
                    genre.textContent = `Genre:    ${data['Genre']}`
                    let cou = document.createElement('p')
                    cou.textContent = `Country:    ${data['Country']}`
                    let dir = document.createElement('p')
                    dir.textContent = `Director:    ${data['Director']}`
                    let wr = document.createElement('p')
                    wr.textContent = `Writer:   ${data['Writer']}`
                    let act = document.createElement('p')
                    act.textContent = `Actors:   ${data['Actors']}`
                    let aw = document.createElement('p')
                    aw.textContent = `Awards:   ${data['Awards']}`
                    let div_text = document.createElement('div')
                    div_text.append(title, real, genre, cou, dir, wr, act, aw)
                    parentDetails.append(img, div_text)
                    parentDetails.style.border = '1px solid black'
                    parentDetails.style.borderRadius = '10px'
                    parentDetails.style.padding = '15px'
                    parentDetails.style.display = 'flex'
                    parentDetails.style.flexDirection = 'column'
                    parentDetails.style.alignItems = 'center'
                    parentDetails.style.textAlign = 'center'
                    details.append(parentDetails)

                    })
                })
            })
        }
        else{
            BooksList.innerHTML = ''
            BooksList.textContent = data['Error']
        }
            
        })
})