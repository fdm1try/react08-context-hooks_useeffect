import React, { useState } from 'react';

export interface IListItem {
  id: number;
  name: string;
}

export interface IList {
  items: Array<IListItem>
  onClick: (item: IListItem) => void;
}

export const List : React.FC<IList> = ({items, onClick}) => {
  const [selected, setSelected] = useState<IListItem|null>(null);

  function handleClick(e: React.SyntheticEvent<HTMLLIElement>) {
    if (!(e.target instanceof HTMLLIElement)) return;
    const itemId: number = Number(e.target.dataset.id);
    if (!itemId) return;
    const item = items.find(({id}) => itemId === id);
    if (!item) return;
    setSelected(item);
    onClick(item);
  }

  return (
    <div className="list">
      <ul className="list-group">
        { 
          items.map(({id, name}) => (
            <li key={id} onClick={handleClick} 
              className={`list-group-item ${selected && selected.id == id ? 'active' : ''}`} 
              data-id={id}
            >
              {name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
