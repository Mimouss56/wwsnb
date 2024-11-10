/**
 * Initialize all WWSNB modules
 */
const app = {
    // Configure observer settings
    config : {
        childList: true,
        subtree: true
    },
    // Create observer for new messages
    observer : new MutationObserver(
        (mutations) => {
            for (const mutation of mutations) {
                mutation.addedNodes.length && checkNewMessages() 
            }
        }
    ),

    /**
     * Check new messages for questions and mentions
     */
    checkNewMessages: () => {

        const messages = document.querySelectorAll('[data-test="chatUserMessageText"]') as unknown as HTMLDivElement[];
        const actualUserName = getActualUserName();

        for (const message of messages) {
            const textContent = message.textContent;
            if (textContent?.includes('@question')) {
                const messageContainer = message.closest('.sc-leYdVB');
                messageContainer && !messageContainer.classList.contains('question-highlight') && messageContainer.classList.add('question-highlight')
            } 
            if (textContent?.includes(`@${actualUserName}`)) {
                const messageContainer = message.closest('.sc-leYdVB');
                messageContainer && !messageContainer.classList.contains('mention-highlight') && messageContainer.classList.add('mention-highlight')
            }
        }
    },

    init: ()=> {
    console.log('WWSNB by Théo Vilain successfully loaded');


    // Start observing document for changes
    app.observer.observe(document.body, app.config);
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
}
// Launch the application when DOM is ready
document.readyState === 'loading'? document.addEventListener('DOMContentLoaded', app.init) : app.init();