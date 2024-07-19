import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import* as serviceWorkerRegristration from './serviceWorkerRegistration'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<App/>);


serviceWorkerRegristration.register();

