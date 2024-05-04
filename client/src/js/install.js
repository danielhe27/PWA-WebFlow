const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    console.log("Event received: ", event);
    event.preventDefault();  // Prevent the mini-infobar from appearing on mobile
    window.deferredPrompt = event;  // Stash the event so it can be triggered later.

    // Show the install button
    butInstall.classList.toggle('hidden', false);
});

// Handle the install button click event
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        console.log('No deferred prompt available.');
        return;  // Do nothing if the install prompt isn't stored
    }

    // Show the install prompt
    promptEvent.prompt();
    window.deferredPrompt = null;  // Clear the deferred prompt

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    console.log('App successfully installed');
    window.deferredPrompt = null;  // Clear the prompt to prevent reuse
});
