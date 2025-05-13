import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Ensure this matches the server URL
    cache: new InMemoryCache(),
    credentials: 'include', // Include cookies and credentials in requests
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Navbar />
                <Outlet />
            </div>
        </ApolloProvider>
    );
}

export default App;
