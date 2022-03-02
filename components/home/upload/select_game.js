import { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";

import styles from "styles/components/upload/SelectGame.module.css";

const GAME_ICON_SIZE = 30;

const SelectGame = ({ game, setGame, disable, setError }) => {
  const [searchText, setSearchText] = useState("");
  const [games, setGames] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      if (searchText === "") return;
      setFetching(true);
      try {
        const response = await axios.post("/api/profile/games/search/", {
          search: searchText,
        });
        const games = response.data?.payload?.games;
        setGames(games);
      } catch (e) {
      } finally {
        setFetching(false);
      }
    };
    if (!fetching) fetchGames();
  }, [searchText]);

  const handleSearchChange = (event) => {
    if (event.target.value === "") {
      setSearchText("");
      setGames([]);
      return;
    }
    setSearchText(event.target.value);
    setError("");
  };

  const selectGame = (game) => {
    setGame(game);
    setSearchText("");
    setGames([]);
    setShowGames(false);
  };

  return (
    <div className={styles.container}>
      {game ? (
        <div>
          <Image
            src={game.logo_url}
            height={GAME_ICON_SIZE}
            width={GAME_ICON_SIZE}
            alt={game.name}
          />
          <span style={{ marginLeft: 10 }}>{game.name}</span>
          <span
            onClick={() => {
              if (!disable) {
                setGame(null);
              }
            }}
          >
            <IoCloseCircle />
          </span>
        </div>
      ) : (
        <div onFocus={() => setShowGames(true)}>
          <input
            className={styles.inputField}
            value={searchText}
            onChange={handleSearchChange}
            type="search"
            placeholder="Choose Game"
            required
            disabled={disable}
          />
          {showGames && games.length > 0 && (
            <div>
              {games.map((game) => (
                <Game key={game.id} game={game} selectGame={selectGame} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Game = ({ game, selectGame }) => {
  return (
    <span
      onClick={() => {
        selectGame(game);
      }}
    >
      <Image
        src={game.logo_url}
        height={GAME_ICON_SIZE}
        width={GAME_ICON_SIZE}
        alt={game.name}
      />
      <span>{game.name}</span>
    </span>
  );
};

export default SelectGame;
