let addmessage = document.querySelector('.message'); //input
let addbutton = document.querySelector('.newtodo'); //button
let todos = document.querySelector('.todos'); //ul

let todolist = []; //массив со всеми задачами

if (localStorage.getItem('todos')) {
	todolist = JSON.parse(localStorage.getItem('todos'));
	displaymessages();
} //подтягивает значение из локала

addbutton.addEventListener('click', function(){ //слушать кнопку добавить

	let newtodo = {
		todo: addmessage.value,
		checked: false,
		important: false 
	} //создать объект нового дела

	todolist.push(newtodo); //добавить его в основной массив

	displaymessages(); 

	localStorage.setItem('todos', JSON.stringify(todolist));//сохранаить в локал

});

function displaymessages(){

	let displaymessage = ''; // переменная с хтмл кодом который надо вставить в ул

	if (todolist.length === 0) {
		todos.innerHTML = ''
	}; //чистим ул если все удалилось

	todolist.forEach(function(item, i){
		displaymessage += `
		<li style = "margin-top: 15px;">
		<input type="checkbox" id='item_${i}' ${item.checked ? 'checked' : ''}>
		<label for="item_${i}" class = "${item.important ? 'important' : ''}">${item.todo}</label>
		</li>
		`; //добавляем в ул все объекты из основного масива конкатенацией

		todos.innerHTML = displaymessage;//всовываем созданный код в ул
	})
};

todos.addEventListener('change', function(event){
	let valuelabel = todos.querySelector('[for =' + event.target.getAttribute('id') + ']').innerHTML; //находим значение ли на которую жмали

	todolist.forEach(function(item){
		if (item.todo === valuelabel){
			item.checked = !item.checked;
			localStorage.setItem('todos', JSON.stringify(todolist));
		}//еслии это значение есть в основном массиве тоглим чекед и сохраняем в локал
	});
});


todos.addEventListener('contextmenu', function(event, i){
	event.preventDefault();
	todolist.forEach(function(item){
		if (item.todo === event.target.innerHTML) {
			if (event.ctrlKey) {
				todolist.splice(i,1);
			}
		
		else{
			item.important = !item.important;
		}
			displaymessages();
			localStorage.setItem('todos', JSON.stringify(todolist));
		}
	})
})