import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState, useEffect, useRef } from 'react';
import { List, IListItem } from './components/List';
import { Details } from './components/Details';

function App() {
  const [listItems, setListItems] = useState<Array<IListItem>>([]);
  const [selectedItem, setSelectedItem] = useState<IListItem|null>(null);
  const [error, setError] = useState<Error|null>(null);
  const listLoadingState = useRef<boolean>(false);
  function handleItemClick(item: IListItem) {
    setSelectedItem(item);
  }

  async function loadListItems() {
    if (listLoadingState.current) return;
    listLoadingState.current = true;
    let response;
    try {
      response = await fetch(' https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
    } catch (err) {
      setError(new Error(`Не удалось загрузить данные, ошибка сети (${err})`));
      return;
    }
    if (response.status < 200 || response.status >= 300) {
      setError(new Error(`Не удалось загрузить данные (HTTP код: ${response.status})`));
      return;
    }
    setError(null);
    const data = await response.json();
    setListItems(data);
  }

  useEffect(() => {
    loadListItems();
  }, []);

  if (error) return (
    <div className="app">
      <p className='error'>{error.message}</p>
    </div>
  );

  return (
    <div className="app">
      {listItems && listItems.length && <List items={listItems} onClick={handleItemClick} /> }
      {selectedItem && <Details info={selectedItem} />}
    </div>
  )
}

export default App
