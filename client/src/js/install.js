const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  // allows the app to check if the application is capable of being installed.
  window.deferredPrompt = event;
  // shows the button for installing
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  // gives functionality to the install button on the top left
  const promptEvent = window.deferredPrompt;
  // if the app is already installed it exits out of the logic
  if (!promptEvent) {
    return;
  }
  // if it isn't installed, it provides a prompt for the user if they want to install.
  promptEvent.prompt();
  // if the user installs, then set the value for whether the app is installed to null so that promptEvent can be false and the install button cant be used again
  window.deferredPrompt = null;
  // hides the option to install.
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
