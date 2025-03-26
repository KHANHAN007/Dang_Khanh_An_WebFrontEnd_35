const btnContainer = document.querySelector('.btn-container');
const btn = document.querySelector('#login-btn');
const uname = document.querySelector('#siteName');
const pass = document.querySelector('#siteUrl');
btnContainer.addEventListener('mouseover', () => {
    if (btn.disabled) shiftButton();
});
btn.addEventListener('mouseover', () => {
    if (btn.disabled) shiftButton();
});
btn.addEventListener('touchstart', () => {
    if (btn.disabled) shiftButton();
});

function shiftButton() {
    showMsg();
    const positions = ['shift-right', 'shift-bottom', 'shift-left', 'shift-top'];
    const currentPosition = positions.find(dir => btn.classList.contains(dir));
    if (!currentPosition) {
        btn.classList.add('shift-right');
        return;
    }
    const nextPosition = positions[(positions.indexOf(currentPosition) + 1) % positions.length];
    btn.classList.remove(currentPosition);
    btn.classList.add(nextPosition);
}
function showMsg() {
    const isEmpty = uname.value.trim() === '' || pass.value.trim() === '';

    if (isEmpty) {
        btn.disabled = true;
        btn.classList.remove('no-shift');
    } else {
        btn.disabled = false;
        btn.classList.add('no-shift');
    }
}
btnContainer.addEventListener('mouseover', shiftButton);
btn.addEventListener('mouseover', shiftButton);
btn.addEventListener('touchstart', shiftButton);

