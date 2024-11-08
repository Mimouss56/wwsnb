/**
 * Initialize all WWSNB modules
 */
function launchWWSNB() {
    console.log('WWSNB by Théo Vilain successfully loaded');

    // Create observer for new messages
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                checkNewMessages();
            }
        });
    });

    // Configure observer settings
    const config = {
        childList: true,
        subtree: true
    };

    // Start observing document for changes
    observer.observe(document.body, config);

    /**
     * Check new messages for questions and mentions
     */
    function checkNewMessages() {
        const messages = document.querySelectorAll('[data-test="chatUserMessageText"]');
        const actualUserName = getActualUserName();

        messages.forEach(message => {
            // Check for questions
            if (message.textContent.includes('@question')) {
                const messageContainer = message.closest('.sc-leYdVB');
                if (messageContainer && !messageContainer.classList.contains('question-highlight')) {
                    messageContainer.classList.add('question-highlight');
                }
            }
            // Check for mentions of current user
            else if (message.textContent.includes('@' + actualUserName)) {
                const messageContainer = message.closest('.sc-leYdVB');
                if (messageContainer && !messageContainer.classList.contains('mention-highlight')) {
                    messageContainer.classList.add('mention-highlight');
                }
            }
        });
    }

    // Initialize all modules with a slight delay to ensure DOM is ready
    setTimeout(() => {
        console.log('[WWSNB] Starting modules initialization');
        checkNewMessages();
        setupMentions();
        setupReactions();
        setupQuestions();
        setupModerator();
        console.log('[WWSNB] Modules initialized successfully');
    }, 1000);
}

// Launch the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', launchWWSNB);
} else {
    launchWWSNB();
}