/**
 * Initialize the question highlighting system
 */
function setupQuestions() {
    console.log('[WWSNB] Initializing question highlighting module');

    // Create observer for new messages
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                checkNewMessages();
            }
        }
    });

    // Start observing document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/**
 * Check new messages for question tag and highlight them
 */
function checkNewMessages() {
    console.log('[WWSNB] Start checking new messages for questions');
    // Get all messages using data-test attribute
    const messages = document.querySelectorAll('[data-test="chatUserMessageText"]') as unknown as HTMLElement[];

    for (const message of messages) {
        // Check for @question tag
        if (message.textContent?.includes('@question')) {
            const messageContainer = message.closest('.sc-leYdVB');
            // Add highlight class if not already present
            messageContainer && !messageContainer.classList.contains('question-highlight') && messageContainer.classList.add('question-highlight')             ;
            
        }
    }
    console.log('[WWSNB] New messages checked');
}

// Initialize module
setupQuestions();