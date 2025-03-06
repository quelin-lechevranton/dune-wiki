// document.addEventListener('DOMContentLoaded', () => {
    const codeDivs = document.querySelectorAll('div.highlight');
    codeDivs.forEach((div) => {
        const pre = div.querySelector('pre.chroma');
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


        const windowButtons = div.querySelectorAll('.window-button');
        if (windowButtons.length) {
            windowButtons[0].addEventListener('click', () => {
                div.style.display = 'none';
            });
            windowButtons[1].addEventListener('click', () => {
                pre.style.height = '0px';
                copyButton.style.display = 'none';
                checkButton.style.display = 'none';
            });
            windowButtons[2].addEventListener('click', () => {
                pre.style.height = 'auto';
                copyButton.style.display = 'block';
            });
        }
    });
// });