import './tailwind.css'
import './main.css';
import ReactDOM from 'react-dom/client';
import App from "@src/test/App.tsx";

const element = document.getElementById('root');

if (element) {
    const root = ReactDOM.createRoot(element);
    root.render(<App/>);
}