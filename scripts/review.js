const STORAGE_KEY = "reviewCount";

function getReviewCount() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : 0;
}

function setReviewCount(value) {
    localStorage.setItem(STORAGE_KEY, String(value));
}


let count = getReviewCount();
count += 1;
setReviewCount(count);


const countSpan = document.getElementById("reviewCount");
if (countSpan) {
    countSpan.textContent = count;
}
