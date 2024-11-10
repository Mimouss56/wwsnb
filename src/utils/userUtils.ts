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
 * Generate initials from a user's name
 * @param {string} name The user's full name
 * @returns {string} The user's initials in uppercase
 */
function generateInitials(name: string): string {
    return name.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

/**
 * Generate a consistent color for a user based on their name
 * @param {string} name The user's name
 * @returns {string} HSL color string
 */
function generateUserColor(name:string):string {
    return `hsl(${name.length * 137.508 % 360}, 70%, 80%)`;
}

/**
 * Capitalize the first letter of a string
 * @param {string} val The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirstLetter(val:string):string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
 * Clean a username by removing status indicators and extra spaces
 * @param {string} name The raw username to clean
 * @returns {string} The cleaned username
 */
function cleanUsername(name:string):string {
    return name
        .replace(/\s+Verrouillé($|\s)/g, '')    // Remove "Verrouillé" status
        .replace(/\s+Webcam($|\s)/g, '')        // Remove "Webcam" status
        .replace(/\s+Mobile($|\s)/g, '')        // Remove "Mobile" status
        .replace(/\s*\|\s*/g, '')               // Remove separators
        .trim();                                // Remove extra spaces
}