// 简易版
el.addEventListener('click', (e) => {
  if (e.target.value.toLowerCase() === 'li') {
    console.log(1);
  }
});

// 完整
function on(element, event, selector, fn) {
  element.addEventlistener(event, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (element === el) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e);
  });
  return element;
}
