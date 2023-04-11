import React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App';
import styles from './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// render doesn't exist in the same way in react18 so you should create root
