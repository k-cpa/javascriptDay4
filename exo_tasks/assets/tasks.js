const inputTask = document.getElementById('inputTask');
const submit = document.getElementById('submit');
const error = document.getElementById('errorMessage');
const toDoList = document.getElementById('toDoList');
const doneList = document.getElementById('doneList');

// Penser à rajouter un message d'erreur sous l'input si on essaye de 
// créer une tâche qui existe déjà

submit.addEventListener('click', function() {
    if (toDoList.textContent.toLocaleLowerCase().includes(inputTask.value.toLocaleLowerCase())) {
        error.textContent = 'Cette tâche est déjà présente en base';
    } else {

        const toDoTasks = document.createElement('li');

        //Affichage de la tâche 
        const taskText = document.createElement('span');
        taskText.textContent = inputTask.value;
        toDoTasks.appendChild(taskText);

        //Bouton terminé 
        const finishedBtn = document.createElement('button');
        finishedBtn.textContent = 'Terminé';
        finishedBtn.classList.add('finished')

        //Bouton supprimer
        const suppressBtn = document.createElement('button');
        suppressBtn.textContent = 'Supprimer';
        suppressBtn.classList.add('delete');

        
        // Ajout des boutons au li 
        toDoTasks.appendChild(finishedBtn);
        toDoTasks.appendChild(suppressBtn);

        //Ajout de l'élément 'li' complet avec le span en child de la liste
        toDoList.appendChild(toDoTasks)
        //vide champ de saisie après ajout
        inputTask.value = '';
    }
})



