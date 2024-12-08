// document.addEventListener('DOMContentLoaded', () => {
    const preCodes = document.querySelectorAll('pre.chroma');
    preCodes.forEach((pre) => {
        const text = pre.querySelector('code').textContent;
        const copyButton = pre.querySelector('.copy');
        const checkButton = pre.querySelector('.check');

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(text);
            copyButton.style.display = 'none';
            checkButton.style.display = 'block';
            setTimeout(() => {
                checkButton.style.display = 'none';
                copyButton.style.display = 'block';
            }, 1000);
        });
    });
// });