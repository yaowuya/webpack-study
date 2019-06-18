import _ from 'lodash';

import "./style.css"
import "./test.scss"

function createDomElement() {
    var dom = document.createElement('div');
    dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
    dom.className="hello";
    return dom;
}

document.body.appendChild(createDomElement());
