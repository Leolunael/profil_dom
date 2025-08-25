    
        // Descriptions disponibles
        const descriptions = [
            "Vivement les vacances",
            "A ne pas déranger en vacances", 
            "De retour de vacances",
            "Full work"
        ];

        // État de l'application
        let currentDescriptionIndex = -1;
        let selectedAvatar = null;
        let isValidPseudo = false;

        
        const elements = {
            // Formulaire
            descriptionElement: document.getElementById('description'),
            changeDescriptionBtn: document.getElementById('change-description'),
            pseudoInput: document.getElementById('pseudo'),
            pseudoError: document.getElementById('pseudo-error'),
            avatarOptions: document.querySelectorAll('.avatar-option'),
            nextButton: document.getElementById('next-button'),
            formContainer: document.getElementById('form-container'),
            
            // Carte profil
            profileCard: document.getElementById('profile-card'),
            finalAvatar: document.getElementById('final-avatar'),
            finalPseudo: document.getElementById('final-pseudo'),
            finalDescription: document.getElementById('final-description'),
            resetButton: document.getElementById('reset-button'),
            
            // Thème
            themeToggle: document.getElementById('theme-toggle'),
            body: document.body
        };

         // Génère un index aléatoire différent du précédent

        function getRandomIndexExcept(previousIndex, maxIndex) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * maxIndex);
            } while (newIndex === previousIndex && maxIndex > 1);
            return newIndex;
        }

         // Valide le pseudo selon les critères

        function validatePseudo(pseudo) {
            if (pseudo.trim().length === 0) {
                return { isValid: false, message: "" };
            }
            
            if (pseudo.length < 3) {
                return { isValid: false, message: "Le pseudo doit contenir au moins 3 caractères" };
            }
            
            if (!/^[a-zA-Z]+$/.test(pseudo)) {
                return { isValid: false, message: "Le pseudo ne doit contenir que des lettres" };
            }
            
            return { isValid: true, message: "" };
        }


        // MAJ état du bouton "Suivant"

        function updateNextButton() {
            const hasDescription = currentDescriptionIndex !== -1;
            const hasAvatar = selectedAvatar !== null;
            
            if (isValidPseudo && hasDescription && hasAvatar) {
                elements.nextButton.disabled = false;
            } else {
                elements.nextButton.disabled = true;
            }
        }

        // Change la description affichée de manière aléatoire

        function changeDescription() {
            currentDescriptionIndex = getRandomIndexExcept(currentDescriptionIndex, descriptions.length);
            elements.descriptionElement.textContent = descriptions[currentDescriptionIndex];
            updateNextButton();
        }

        // Gère la validation en temps réel du pseudo

        function handlePseudoInput() {
            const pseudo = elements.pseudoInput.value;
            const validation = validatePseudo(pseudo);
            
            // Mise à jour du style et du message d'erreur
            elements.pseudoInput.classList.remove('error', 'valid');
            if (pseudo.length > 0) {
                if (validation.isValid) {
                    elements.pseudoInput.classList.add('valid');
                } else {
                    elements.pseudoInput.classList.add('error');
                }
            }
            
            elements.pseudoError.textContent = validation.message;
            isValidPseudo = validation.isValid;
            updateNextButton();
        }

        // Gère l'avatar

        function handleAvatarSelection(event) {
            // Retirer la sélection de tous les avatars
            elements.avatarOptions.forEach(avatar => {
                avatar.classList.remove('selected');
            });
            
            // Sélectionner le nouvel avatar
            event.target.classList.add('selected');
            selectedAvatar = event.target.getAttribute('name');
            
            updateNextButton();
        }

        // thèmes clair et sombre

        function toggleTheme() {
            const currentTheme = elements.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            elements.body.setAttribute('data-theme', newTheme);
        }

        // validation

        function showProfileCard() {
            // Récupérer les données du formulaire
            const pseudo = elements.pseudoInput.value;
            const description = descriptions[currentDescriptionIndex];
            const avatarSrc = document.querySelector(`.avatar-option[name="${selectedAvatar}"]`).src;
            
            // Remplir la carte profil
            elements.finalPseudo.textContent = pseudo;
            elements.finalDescription.textContent = description;
            elements.finalAvatar.src = avatarSrc;
            
            // Masquer le formulaire et afficher la carte
            elements.formContainer.classList.add('hidden');
            elements.profileCard.classList.add('show');
        }

        // Réinitialise l'application

        function resetApplication() {
            // Réinitialiser l'état
            currentDescriptionIndex = -1;
            selectedAvatar = null;
            isValidPseudo = false;
            
            // Réinitialiser l'interface
            elements.pseudoInput.value = '';
            elements.pseudoInput.classList.remove('error', 'valid');
            elements.pseudoError.textContent = '';
            elements.descriptionElement.textContent = '';
            
            elements.avatarOptions.forEach(avatar => {
                avatar.classList.remove('selected');
            });
            
            elements.nextButton.disabled = true;
            
            // Afficher le formulaire et masquer la carte
            elements.formContainer.classList.remove('hidden');
            elements.profileCard.classList.remove('show');
            
            // Générer une nouvelle description
            changeDescription();
        }

        // Initialisation

        function initializeApp() {
            // Générer une description initiale
            changeDescription();
            
            // Ajouter les écouteurs d'événements
            elements.changeDescriptionBtn.addEventListener('click', changeDescription);
            elements.pseudoInput.addEventListener('input', handlePseudoInput);
            elements.nextButton.addEventListener('click', showProfileCard);
            elements.resetButton.addEventListener('click', resetApplication);
            elements.themeToggle.addEventListener('click', toggleTheme);
            
            // Ajouter les écouteurs pour les avatars
            elements.avatarOptions.forEach(avatar => {
                avatar.addEventListener('click', handleAvatarSelection);
            });
            
            console.log('Application initialisée avec succès');
        }

        // Démarrer l'application quand le DOM est chargé
        document.addEventListener('DOMContentLoaded', initializeApp);