import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button } from './Button';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreStateProps {
  genres: GenreResponseProps[],
  setGenres: React.Dispatch<React.SetStateAction<GenreResponseProps[]>>,
  selectedGenreId: number,
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>,
}

export function SideBar({ genres, setGenres, selectedGenreId, setSelectedGenreId }: GenreStateProps) {
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres?.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}