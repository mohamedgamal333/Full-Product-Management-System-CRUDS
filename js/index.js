let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let dataPro;

// change between create and update
let mood ='create'

// to make variable out of his function (i)
let tem;

if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)


}else{
     dataPro =[];
}

//  create function
// make function 
// make object
// make an array and push object to array 
// make loctalstorage and setitems in it usign JSON.stringify
// after that we make sure that after every reload the array have value or not 
// using if condition or not

submit.onclick=function(){

    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    if(title.value!= '' && price.value!= '' && category.value!= '' && count.value< 100 ){
        if(mood==='create'){
            if(newPro.count>1){
                for(let i=0;i<newPro.count;i++){
                    dataPro.push(newPro)
                }
            
            }    else{
                dataPro.push(newPro)
              
                      }
        }else{
            dataPro[tem]=newPro;
            mood='create';
            submit.innerHTML='create';
            count.classList.remove('d-none')
    
    
        }
        clear()
       
  
            document.getElementById('Message').classList.remove('d-none');
               setTimeout(function(){
                   document.getElementById('Message').classList.add('d-none');
       
               }, 2000)
       
 
    }
    else{
        // document.getElementById('Message').classList.remove('d-none');
        // setTimeout(function(){
        //     document.getElementById('Message').classList.add('d-none');

        // }, 2000)
    }
    
   
    localStorage.setItem('product' ,JSON.stringify(dataPro))
    console.log(dataPro)
    

  


    displayData()


}
displayData()

// Clear function
function clear(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    count.value ='';
    category.value ='';
    total.value ='';
}

// display data
function displayData(){
    getTotal()
let table='';
for(let i =0;i<dataPro.length;i++){
    table += `
    
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="UpdateData(${i})" class="btn btn-secondary mt-4" id="submit">update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn btn-danger mt-4" id="submit">delete</button></td>
                
                </tr>
    
    
    `;

}
document.getElementById('tbody').innerHTML=table
let btnDeleteAll=document.getElementById('deleteALL')
// test if displayData include data or no
if(dataPro.length > 0){
    btnDeleteAll.classList.remove('d-none')
    btnDeleteAll.innerHTML=`Delete All (${dataPro.length})`
}else{
    btnDeleteAll.classList.add('d-none')
}



}
// delete item in table
function deleteData(i){
    
    dataPro.splice(i,1)
   localStorage.product=JSON.stringify(dataPro)
   displayData()
    

}

// delete all data
function deleteAllData(){
    localStorage.clear( )
    dataPro.splice(0)
    displayData()
}

// count



  function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != '' ){

    
        let result =(+price.value + +taxes.value + +ads.value )- +discount.value
   total.innerHTML= result
   total.style.background='green'}
   else{
    total.innerHTML='';
    total.style.background='red'
}
}

// update date

function UpdateData(i){
    title.value = dataPro[i].title
    price.value= dataPro[i].price
    taxes.value= dataPro[i].taxes
    ads.value= dataPro[i].ads
    discount.value= dataPro[i].discount
    count.classList.add('d-none')
    submit.innerHTML='Update';
    
    category.value= dataPro[i].category
    getTotal()
 mood ='Update';
tem=i;
scroll({
    top:0,
    behavior:"smooth"
})


}

// search
let searchMood ='title';
function getSearchMood(id){
    let search  =document.getElementById('search');
    if(id =='searchByTitle'){
        searchMood ='title'
       
    }else{
        searchMood ='category'
        


    }
search.placeholder='Seach By ' +searchMood;
    search.focus()
    search.value='';
    displayData()
   
}


function searchData(value){
    let table='';
    for(let i = 0; i<dataPro.length; i++){
    if(searchMood=='title'){

        
            if(dataPro[i].title.includes(value.toLowerCase())){
               
                table += `
    
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="UpdateData(${i})" class="btn btn-secondary mt-4" id="submit">update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn btn-danger mt-4" id="submit">delete</button></td>
                
                </tr>
    
    
    `;

            }
        

    }
    else{

        
            if(dataPro[i].category.includes(value.toLowerCase())){
               
                table += `
    
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="UpdateData(${i})" class="btn btn-secondary mt-4" id="submit">update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn btn-danger mt-4" id="submit">delete</button></td>
                
                </tr>
    
    
    `;

            }
        }

    }
    document.getElementById('tbody').innerHTML=table

}


