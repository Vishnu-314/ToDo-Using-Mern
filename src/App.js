
import './App.css';
import ShowTodo from './components/ShowTodo';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body-tertiary rounded .bg-dark-subtle" style={{"width":"50%"}}>
      <Todo/>
      <ShowTodo/>
    </div>
  );
}

export default App;
