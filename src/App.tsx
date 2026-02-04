
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouteRenderer from './components/router/RouteRenderer';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <RouteRenderer />
            </div>
        </BrowserRouter>
    );
}

export default App;
