import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import './toast.scss';

const toastConfig = {
    time: 2000,
    animation: 500,
};

const style = {
    'WebkitAnimation': `fadein ${toastConfig.animation}ms, fadeout ${toastConfig.animation}ms ${toastConfig.time}ms`,
    'animation': `fadein ${toastConfig.animation}ms, fadeout ${toastConfig.animation}ms ${toastConfig.time}ms`,
}

interface IProps {
    text: string,
    status: string,
};

const Toast: FunctionComponent<IProps> = (props) => (
    <div 
        className={'toast toast-' + props.status}
        style={style}
        onClick={(t) => t.currentTarget.remove()}
    >
        <h4>{props.text}</h4>
    </div>
);

const showToast = {
    info: (text: string) => displayToast(text, 'info'),
    error: (text: string) => displayToast(text, 'error'),
}

const displayToast = (text: string, info: string) => {
    let toastElement = <Toast text={text} status={info} />;
    let containerDomNode = document.createElement('div');
    containerDomNode.style.textAlign = 'center';

    document.body.appendChild(containerDomNode);
    ReactDOM.render(toastElement, containerDomNode);
    hideToast(containerDomNode);
}

const hideToast = (el: HTMLDivElement) => {
    setTimeout(() => deleteToast(el), toastConfig.animation*0.9);
}

const deleteToast = (el: HTMLDivElement) => {
    setTimeout(() => el.remove(), toastConfig.time);
}

export default showToast;