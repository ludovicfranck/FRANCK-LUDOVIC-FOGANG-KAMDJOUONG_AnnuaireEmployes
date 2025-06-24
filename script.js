// Sélection des éléments du DOM
var nom = document.querySelector('#nom');
var prenom = document.querySelector('#prenom');
var email = document.querySelector('#email');
var fonction = document.querySelector('#fonction');
var tbody = document.querySelector('#tbody');
console.log(tbody);
var inputs = document.querySelectorAll('.input');

// ce bloc de code permet d'actualiser les valeurs des variables en lorsqu'ils sont instannement modifies dans les inputs...
inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        input.value = e.target.value.trim();
        console.log(input.value);
    });
});


/**
 * * @description Fonction pour valider le formulaire
 * cette fonction permet de valider le formulaire en persistant les valeurs des inputs contenus dans le LocalStorage
 * @return <tr></tr> une ligne de tableau contenant les valeurs des inputs
 * @example <tr><td>nom et prenom</td><td>Email</td><td>fonction</td><td>supprimer</td></tr>
 * @author Franck Ludovic Fogang Kamdjouong
 */
// Fonction pour afficher les employés dans le tableau
function ajouterEmployee() {
    tbody.innerHTML = ''; // Vider le tableau avant de réafficher
    // Recuperation des employees stockes dans le LocalStorage ... 
    var tab_employee = JSON.parse(localStorage.getItem('employees')) || [];

    tab_employee.forEach((employee, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${employee.nom_emp} - ${employee.prenom_emp}</th>
            <td>${employee.email_emp}</td>
            <td>${employee.fonction_emp}</td>
            <td>
                <button class="btn-delete" onclick="deleteEmployee(${index})">Supprimer</button>
            </td>
        `;
        // Ajouter la ligne de tableau dans l'element tbody ....
        tbody.appendChild(tr);
    });
}

// Fonction pour supprimer un employé
function deleteEmployee(index) {
    let tab_employee = JSON.parse(localStorage.getItem('employees')) || [];
    tab_employee.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(tab_employee));
    ajouterEmployee();
}



// Fonction pour lire les paramètres de l'URL 
/**
 * cette fonction permet de lire les parametres de L'URL pour les ajouter dans le tableau .
 */
function getParamsFromURL() {
    const url = new URL(window.location.href);
    return {
        nom: url.searchParams.get("nom"),
        prenom: url.searchParams.get("prenom"),
        email: url.searchParams.get("email"),
        fonction: url.searchParams.get("fonction")
    };
}

// Ajout automatique dans localStorage si des paramètres existent dans l'URL
function ajouterDepuisURL() { 
    const { nom, prenom, email, fonction } = getParamsFromURL();

    // Vérifier que toutes les données sont présentes
    if (nom && prenom && email && fonction) {
        const employe = {
            nom_emp: nom,
            prenom_emp: prenom,
            email_emp: email,
            fonction_emp: fonction
        };

        let tab_employee = JSON.parse(localStorage.getItem("employees")) || [];

        // Évite les doublons exacts (optionnel)
        const existeDeja = tab_employee.some(emp =>
            emp.nom_emp === nom &&
            emp.prenom_emp === prenom &&
            emp.email_emp === email &&
            emp.fonction_emp === fonction
        );

        if (!existeDeja) {
            tab_employee.push(employe);
            localStorage.setItem("employees", JSON.stringify(tab_employee));
        }
    }

    // Ensuite on affiche la liste
    ajouterEmployee();
}

// Appelle la fonction au chargement de la page
window.onload = ajouterDepuisURL;



