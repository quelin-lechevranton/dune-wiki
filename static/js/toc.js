document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.toc li');
    const headings = document.querySelectorAll('h2, h3');

    let positions = [];
    function computePositions() {
        let p = Array.from(headings , (h) => h.getBoundingClientRect().top + window.scrollY);
        p.push(document.documentElement.scrollHeight);
        for (let i=0; i<items.length; i++) {
            if (p[i+1] - p[i] < 100) {
                p[i+1] += 100;
            }
        }
        positions = p;
    }

    function whichCurrentItem() {
        const scroll = window.scrollY + window.innerHeight / 3;
        if (window.scrollY < 50) return 0;
        for (let i=0; i<items.length; i++) {
            if (positions[i] < scroll && scroll <= positions[i+1]) return i;
        }
        return null;
    }
    let currentItem = null;
    function activateItem(item) {
        if (currentItem == item) return;
        if (currentItem != null) currentItem.classList.remove('active');
        item.classList.add('active');
        currentItem = item;
    }

    function getList(i) {
        const item = items[i];
        if (item.lastElementChild.tagName == 'OL') {
            return item.lastElementChild;
        } else if (item.parentElement.parentElement.tagName != 'NAV') {
            return item.parentElement;
        }
        return null;
    }

    let currentList = null;
    function listExpansion(list) {
        if (list === currentList) return;
        if (list != null) {
            list.style.maxHeight = list.scrollHeight + 'px';
            list.classList.add('expanded');
        } 
        if (currentList != null) {
            currentList.style.maxHeight = null;
            currentList.classList.remove('expanded');
        }
        currentList = list;
    }

    computePositions();
    document.addEventListener('resize', computePositions);

    function updateToc() {
        const i = whichCurrentItem();
        if (i == null) return;
        activateItem(items[i]);
        listExpansion(getList(i));
    }
    
    updateToc();
    window.addEventListener('scroll', updateToc);


    function scrollTime(distance) {
        return 2.5 * Math.sqrt(distance) + 350;
    } // Empirical formula for smooth scrolling time (based on Firefox's behavior)

    // When item is clicked, scroll so that it appears at ~ the first third of the screen
    const toc = document.querySelector('.toc');
    const links = Array.from(items, (item) => item.querySelector('a'));
    function scrollToward(e) {
        const i = links.indexOf(e.target);
        if (i == -1) return;
        e.preventDefault();
        const position = positions[i] - window.innerHeight / 3 + 20;
        const scrollDistance = Math.abs(window.scrollY - position);
        window.removeEventListener('scroll', updateToc);
        window.scrollTo({top: position, behavior: 'smooth'});
        setTimeout(() => {
            window.addEventListener('scroll', updateToc);
            updateToc();
        }, scrollTime(scrollDistance));
    }

    toc.addEventListener('click', scrollToward);

});
