import React, {useState, useEffect} from 'react';
import { IListItem } from '../List';

interface IInfo extends IListItem{
  avatar: string;
  details: {
    city: string;
    company: string;
    position: string;
  }
}

export interface IDetails {
  info: IListItem;
}

export const Details: React.FC<IDetails> = ({info}) => {
  const [userInfo, setUserInfo] = useState<IInfo|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error|null>(null);

  async function loadDetails() {
    if (userInfo && userInfo.id === info.id) return;
    setLoading(true);
    let response;
    try {
      response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`);
    } catch(err) {
      setError(new Error(`Не удалось загрузить данные, ошибка сети (${err})`));
      setLoading(false);
      return;
    }
    if (response.status < 200 || response.status >= 300) {
      setError(new Error(`Не удалось загрузить данные (HTTP код: ${response.status})`));
      setLoading(false);
      return;
    }
    if (error) setError(null);
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDetails();
  }, [info]);

  if (loading) return (
    <div className="details">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="details">
      <p className='error'>{error.message}</p>
    </div>
  );

  return (
    <div className="details">
      <div className="card">
        <img src={userInfo?.avatar} className="card-img-top" alt={userInfo?.name} />
        <div className="card-body">
          <h5 className="card-title">{userInfo?.name}</h5>
          <ul className="list-group">
            <li className="list-group-item">City: {userInfo?.details.city}</li>
            <li className="list-group-item">Company: {userInfo?.details.company}</li>
            <li className="list-group-item">Position: {userInfo?.details.position}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
