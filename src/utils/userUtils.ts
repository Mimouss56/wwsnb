import { cleanUsername, generateInitials, generateUserColor } from "@/modules/users/user.module";

/**
 * Get the current user's full name from the UI
 * @returns {string|undefined} The current user's full name or undefined if not found
 */
function getActualUserName() {
    const userElement = document.querySelector('[aria-label*="Vous"]');
    if (!userElement) {
        return;
    }

    const ariaLabel = userElement.getAttribute('aria-label');
    if (!ariaLabel) {
        return;
    }

    // Extrait tout ce qui se trouve avant " Vous"
    const fullNameMatch = ariaLabel.match(/(.+?)\s*Vous/);
    if (!fullNameMatch) {
        return;
    }

    // Retourne le nom complet trouvé
    return fullNameMatch[1].trim();
}

/**
 * Get all users from the user list and chat messages
 * @returns {Array} Array of user objects with name, initials, and background color
 */
function getAllUsers() {
    const users = new Set();

    // Get users from the user list
    const userListItemElem = document.querySelectorAll('[data-test="userListItem"]') as unknown as HTMLElement[];
    for (const item of userListItemElem) {
        const userNameElement = item.querySelector('[aria-label*="Statut"]');
        if (userNameElement?.textContent) {
            const rawName = userNameElement.textContent.trim();
            const name = cleanUsername(rawName);
            users.add(JSON.stringify({
                name,
                initials: generateInitials(name),
                bgColor: generateUserColor(name)
            }));
        }
    }
    const dataMessageID =document.querySelectorAll('[data-message-id]') as unknown as HTMLElement[];
    // Get users from chat messages
    for (const message of dataMessageID) {
        const userNameElement = message.querySelector('.sc-gFkHhu span');
        if (userNameElement?.textContent) {
            const rawName = userNameElement.textContent.trim();
            const name = cleanUsername(rawName);
            if (name && name !== 'System Message') {
                users.add(JSON.stringify({
                    name,
                    initials: generateInitials(name),
                    bgColor: generateUserColor(name)
                }));
            }
        }
    }

    return Array.from(users).map(user => JSON.parse(user));
}

/**
 * Capitalize the first letter of a string
 * @param {string} val The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirstLetter(val:string):string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


