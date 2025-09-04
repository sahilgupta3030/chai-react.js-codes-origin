function customRender(reactElement, target) {
    // Earlier version (manual way):
    // const domElement = document.createElement(reactElement.type);
    // domElement.innerHTML = reactElement.children;
    // domElement.setAttribute('href', reactElement.props.href);
    // domElement.setAttribute('target', reactElement.props.target);
    // target.appendChild(domElement);
    // 👉 This was hardcoded only for 'a' tag and specific props.

    const domElement = document.createElement(reactElement.type);
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop]);
    }
    domElement.textContent = reactElement.children;
    target.appendChild(domElement);
}

const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank',
    },
    children: 'Click me to visit google...'
};

const mainContainer = document.querySelector('#root');

//here it executes
customRender(reactElement, mainContainer);
