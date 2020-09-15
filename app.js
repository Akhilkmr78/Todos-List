const addForm = document.querySelector('.add');
const list = document.querySelector('.list-group');
const search = document.querySelector('.search input');

const generateTemplate = todo => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
};

//adding event listener to form to add user input to list(ul) on enter. callback function of event listener calls a function(generateTemplate) to add html to list.
addForm.addEventListener( 'submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();//trim whitespace
    if(todo.length > 0){
        generateTemplate(todo);
        addForm.reset();//reset the input to blank after addition of list
    }
})

list.addEventListener('click', e=> {
    
        if(e.target.classList.contains('delete')){     //check with contain method that the event target element contains a class of delete
            e.target.parentElement.remove();  //parentelement of target is that list element which gets removed(using .remove() method) on click of icon. Common pattern to navigate to parent element
        }
    
})

//adding a function which is called in search ev listener which takes in parameter of search term values typed by user.that function is going to filter the list based on terms keyword.
const filterTodos = searchTerm => {
     Array.from(list.children)
            .filter(todo =>  !todo.textContent.toLowerCase().includes(searchTerm))
            .forEach(todo => todo.classList.add('filtered'))
     //Converting html collection to array and applying two array methods chained to first filter out all the list elements in which the text content does includes the search terms and applying on each element a class filtered, this process is reversed down here when again search term starts matching to remove the class from element. Whenever user types something(in the search.addEventlistener). The function first add the class filtered(which we can apply css rule to hide) once it is not matching. And remove the class once the searchterm matches elment text content.
      
     Array.from(list.children)
            .filter(todo =>  todo.textContent.toLowerCase().includes(searchTerm))
            .forEach(todo => todo.classList.remove('filtered'))       
}

search.addEventListener('keyup', (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();
      filterTodos(searchTerm)
})