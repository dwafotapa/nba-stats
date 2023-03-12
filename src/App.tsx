import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import Spacer from './components/Spacer';

function App() {
  return (
    <Layout>
      <main>
        <Spacer size="2rem" />
        <SearchForm />
      </main>
    </Layout>
  );
}

export default App;
