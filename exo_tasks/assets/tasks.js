const inputTask = document.getElementById('inputTask');
const submit = document.getElementById('submit');
const error = document.getElementById('errorMessage');
const toDoList = document.getElementById('toDoList');
const doneList = document.getElementById('doneList');
const savedTasks = [];


// Penser à rajouter un message d'erreur sous l'input si on essaye de 
// créer une tâche qui existe déjà

submit.addEventListener('click', function() {
    
    if (inputTask.value === '') {
        error.textContent ='Veuillez saisir une donnée valide';
    } else if (taskExists(inputTask.value)) {
        error.textContent = 'La tâche est déjà présente en base';
    } else {

        //Affichage de la tâche 
        const toDoTasks = document.createElement('li');
        const taskText = document.createElement('input');
        taskText.value = inputTask.value;
        //Permet de push la valeur de taskText into savedTasks pour créer un tableau
        savedTasks.push(taskText.value);
        // Save dans localStorage
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        taskText.classList.add('taskInput');
        taskText.readOnly = true;
        taskText.style.border = 'none';

        //Bouton modifier
        const modifyBtn = document.createElement('button');
        modifyBtn.textContent = 'Modifier';
        modifyBtn.classList.add('modify');

        // Création d'un input pour modifier la tâche
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.style.display = 'none'
        editInput.classList.add('editInput');

        //Bouton valider la modification
        const validBtn = document.createElement('button');
        validBtn.textContent = 'Valider';
        validBtn.classList.add('valid');
        validBtn.style.display = 'none';

        //Bouton En cours
        const inProgressBtn = document.createElement('button');
        inProgressBtn.textContent = 'En cours';
        inProgressBtn.classList.add('progress');
        inProgressBtn.style.display = 'none';

        //Bouton terminé 
        const finishedBtn = document.createElement('button');
        finishedBtn.textContent = 'Terminé';
        finishedBtn.classList.add('finished')

        //Bouton supprimer
        const suppressBtn = document.createElement('button');
        suppressBtn.textContent = 'Supprimer';
        suppressBtn.classList.add('delete');

        
        // Ajout des éléments au li 
        toDoTasks.appendChild(taskText);
        toDoTasks.appendChild(editInput);
        toDoTasks.appendChild(validBtn);
        toDoTasks.appendChild(modifyBtn);
        toDoTasks.appendChild(inProgressBtn);
        toDoTasks.appendChild(finishedBtn);
        toDoTasks.appendChild(suppressBtn);

        //Ajout de l'élément 'li' complet avec le span en child de la liste
        toDoList.appendChild(toDoTasks)
        
        //vide champ de saisie après ajout
        inputTask.value = '';
        
        //Event au click du bouton modifier 
        modifyBtn.addEventListener('click', function () {
            taskText.readOnly = false;
            taskText.style.border = '1px solid black';
            taskText.focus();
            modifyBtn.style.display ='none';
            validBtn.style.display = '';
            finishedBtn.disabled = true;
            suppressBtn.disabled = true;
        })

        //Event au click du bouton valider après la modification de editInput
        validBtn.addEventListener('click', function() {
            // Vérifie si la tâche modifiée existe déjà dans la liste
            if (taskText.value === '') {
                error.textContent ='Veuillez saisir une donnée valide';
            } else if (taskExists(taskText.value)) {
                error.textContent = 'Cette tâche est déjà présente en base';
            }   else {
                taskText.readOnly = true;
                taskText.style.border = 'none';
                modifyBtn.style.display = '';
                validBtn.style.display = 'none';
                error.textContent = '';
                finishedBtn.disabled = false;
                suppressBtn.disabled = false;
            }
        });

        // Event au click du bouton terminé 
        finishedBtn.addEventListener('click', function() {
            doneList.appendChild(toDoTasks);
            finishedBtn.style.display = 'none';
            inProgressBtn.style.display = '';
            modifyBtn.style.display = 'none'
        });

        // Event au click bouton En cours pour replacer dans tâches en cours
        inProgressBtn.addEventListener('click', function() {
            toDoList.appendChild(toDoTasks);
            inProgressBtn.style.display = 'none';
            finishedBtn.style.display = '';
            modifyBtn.style.display = '';
        })

        // Event au click du bouton supprimé pour retirer la tâche
        suppressBtn.addEventListener('click', function() {
            toDoTasks.remove();
        })

    }
})

// Réinitialise le message d'erreur quand on va taper dans l'inputTask
inputTask.addEventListener('focus', function() {
    error.textContent = '';
})

// Tentative de fonction pour voir si élément déjà présent en base 
// Voir plus tard 
// problème pour validBtn c'est que task devient .taskInput donc forcément retourne vrai tout le temps. 
// Je dois contourner ou alors tant pis je fais une nouvelle fonction et je verrai plus tard pour faire du code propre. 

    // stack overflow 
    function taskExists(task) {
        for (const item of toDoList.children) {
            if (item.querySelector('.taskInput').value.toLowerCase() === task.toLowerCase()) {
                return true;
            }
        }
    
        for (const item of doneList.children) {
            if (item.querySelector('.taskInput').value.toLowerCase() === task.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
   
 
    