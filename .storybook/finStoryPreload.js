window.addEventListener('DOMContentLoaded', () => {
  Array.from(document.getElementsByTagName('iframe')).forEach(el => {
    // Add fin to iframes
    el.contentWindow.fin = window.fin;
  });
});
