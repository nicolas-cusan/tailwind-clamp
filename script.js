const tables = document.querySelectorAll('table');

tables.forEach((table) => {
  const wrapper = document.createElement('div');

  wrapper.className =
    'w-screen max-w-4xl overflow-x-auto clamp-[mx,-5,-10] clamp-[px,5,10]';

  table.parentNode.insertBefore(wrapper, table);

  wrapper.appendChild(table);
});
