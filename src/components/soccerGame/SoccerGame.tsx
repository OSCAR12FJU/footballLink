import React, { useEffect, useState } from "react";
import playerIncong from "../../../public/file/player_incong.png";
import flyer_welcome from "../../../public/file/flyer_welcome.png";
import { BannerRunGame } from "../ui/BannerRunGame";
import { generateRound, type GameRound } from "../../utils/gameService";
import { SearchBarPayer } from "../ui/SearchBarPlayer";
import { ModalStatistics } from "../ui/ModalStatistics";
// import { FootballService, type GameData } from "../../data/footballService";
import { FootballService, type GameData } from "../../data/dataPlayer";

export default function SoccerGame() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [visibleTeammatesCount, setVisibleTeammatesCount] = useState(1);
  const [mockGameData, setMockGameData] = useState<GameRound>();
  const [guessInput, setGuessInput] = useState("");
  const [gameResult, setGameResult] = useState<"correct" | "incorrect" | null>(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [isOpenStatistics, setIsOpenStatistics] = useState(false);
  const [playerSelect, setPlayerSelect] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [games, setGames] = useState<GameData[]>([]);
  const [usedMysteryPlayers, setUsedMysteryPlayers] = useState<string[]>([]);
  const [successStreak, setSuccessStreak] = useState(0);
  const [maxSuccessStreak, setMaxSuccessStreak] = useState(0);
  const [hasLoadedStreak, setHasLoadedStreak] = useState(false);
  const [userLevel, setUserLevel] = useState<number>(1);

  const service = FootballService.getInstance();

  useEffect(() => {
    const stored = localStorage.getItem("mySuccessStreak");
    const parsed = Number(stored);
    if (!isNaN(parsed)) setMaxSuccessStreak(parsed);
    setHasLoadedStreak(true);
  }, []);

  useEffect(() => {
    if (hasLoadedStreak) {
      localStorage.setItem("mySuccessStreak", maxSuccessStreak.toString());
    }
  }, [maxSuccessStreak, hasLoadedStreak]);

  useEffect(() => {
    const storedLevel = localStorage.getItem("myUserLevel");
    const parsedLevel = Number(storedLevel);
    if (!isNaN(parsedLevel)) setUserLevel(parsedLevel);
  }, []);

  useEffect(() => {
    service.fetchAllPlayersCached().then(allPlayers => {
      // console.log("jugadores desde el soccerGame",allPlayers)
      try {
        const data = service.createGameData(allPlayers);
        setGames(data);
      } catch (error) {
        console.error("Error creando game data:", error);
      }
    });
  }, []);

  const handleStartGame = () => {
    if (games.length === 0) return;

    const allMysteryNames = games.map(game => game.mysteryPlayer.name);
    let excluded = usedMysteryPlayers;

    if (usedMysteryPlayers.length >= allMysteryNames.length) {
      excluded = [];
      setUsedMysteryPlayers([]);
    }

    let round;
    try {
      round = generateRound(excluded, games);
    } catch (error) {
      console.error("Error generando ronda:", error);
      return;
    }

    setUsedMysteryPlayers(prev => [...prev, round.mysteryPlayer.name]);
    setMockGameData(round);
    setGameStarted(true);
    setVisibleTeammatesCount(1);
    setGuessInput("");
    setGameResult(null);
    setGameEnded(false);
    setFlippedCards([0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGuessInput(value);

    if (value === "") {
      setFilteredOptions([]);
      return;
    }

    const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const filtered = service["playerNames"].filter(player =>
      normalize(player).includes(normalize(value))
    );

    setFilteredOptions(filtered);
  };

  const handleSkip = () => {
    if (!mockGameData) return;
    const newIndex = visibleTeammatesCount;
    setVisibleTeammatesCount(prev => prev + 1);
    setFlippedCards(prev => [...prev, newIndex]);

    if (visibleTeammatesCount === mockGameData.teammates.length - 1) {
      setGameResult("incorrect");
      setGameEnded(true);
      setVisibleTeammatesCount(mockGameData.teammates.length);
      setFlippedCards(Array.from({ length: mockGameData.teammates.length }, (_, i) => i));
    }
  };

  const handleGuess = () => {
    if (!mockGameData) return;

    const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedGuess = normalize(guessInput.trim());
    const normalizedAnswer = normalize(mockGameData.mysteryPlayer.name);

    if (normalizedGuess === normalizedAnswer) {
      const newStreak = successStreak + 1;
      setGameResult("correct");
      setFlippedCards(Array.from({ length: visibleTeammatesCount }, (_, i) => i));
      setShowIncorrectMessage(false);
      setSuccessStreak(newStreak);
      setMaxSuccessStreak(max => (newStreak > max ? newStreak : max));
    } else {
      setGameResult("incorrect");
      setShowIncorrectMessage(true);
      setPlayerSelect(guessInput);
      setGuessInput("");
      setSuccessStreak(0);

      if (gameEnded) {
        setVisibleTeammatesCount(mockGameData.teammates.length);
      } else {
        handleSkip();
      }
    }
  };

  const handleOptionClick = (option: string) => {
    setGuessInput(option);
    setFilteredOptions([]);
  };

  const handleClick = () => {
    setIsOpenStatistics(prev => !prev);
  };

  // const visibleTeammates = mockGameData?.teammates.slice(0, visibleTeammatesCount) || [];
  const visibleTeammates = mockGameData?.teammates ?? [];
  const isFlipped = gameResult === "correct" || (gameResult === "incorrect" && gameEnded);


  let lastNameMistery = "";
  if (mockGameData?.mysteryPlayer?.name) {
    const nameParts = mockGameData.mysteryPlayer.name.split(" ").filter(Boolean);
    if (nameParts.length >= 3) {
      lastNameMistery = `${nameParts[nameParts.length - 2]} ${nameParts[nameParts.length - 1]}`;
    } else if (nameParts.length === 2) {
      lastNameMistery = nameParts[1];
    } else {
      lastNameMistery = nameParts[0];
    }
  }
    return(
    
     <div className="pb-4">
      <div className="container-futbol">
        {/* Esto es la opción principla que se va a mostrar por que esl estado es falso, que esto indica que toda via no se dió comienzo al juego. */}
        {!gameStarted ? (
          <BannerRunGame flyer_welcome={flyer_welcome} handleStartGame={handleStartGame}/>

        ) : (
    <div className="max-w-2xl md:max-w-4xl mx-auto p-4 md:p-8 ">

    <div className="mb-8">
      <div className="flex flex-col justify-center items-center py-4 relative">
      
      {/* Menu de estadisticas */}
     <div className="absolute top-0 right-0 cursor-pointer" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 text-white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M4 20h14" />
      </svg>
    </div>

          <div className="w-20 h-20 md:w-[7rem] md:h-[7rem] lg:w-32 lg:h-32 [perspective:600px]">
              <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front side */}
                <div className="absolute aspect-square overflow-hidden rounded-md bg-[#0F344B] border-[#0DD0F7] border [backface-visibility:hidden]">
                  <img
                  src={playerIncong}
                  className="h-full w-full object-cover" />  
                </div>

                {/* Back side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className={`aspect-square overflow-hidden rounded-md ${ gameResult === "incorrect" && gameEnded ? "bg-[#f100002b] border-[#ff3939] shadow-[0_0_15px_#ff3939]" : "bg-[#0f4b42] border-[#00ff89] shadow-[0_0_15px_#00ff89]"}  border`}>
                  <img
                    src={mockGameData?.mysteryPlayer.imageUrl}
                    alt={mockGameData?.mysteryPlayer.name}
                    className="h-full w-full object-cover" />
                  </div>
                  </div>

                  {/* </div> */}
              </div>
           </div>
              <h3 className="text-white text-center font-normal text-base mt-2">
             {
             gameResult === "correct"
             ? (`Adivinaste. Soy ${lastNameMistery}`)
             : gameEnded && gameResult === "incorrect"
              ? (`Perdiste. Soy ${lastNameMistery}`)
              :  "Jugué con estos cinco jugadores. ¿Quién soy yo?" 
              }
              </h3>  
       </div>

    <div className="flex flex-wrap justify-center gap-x-6 mb-5">

                {/* //La destructuración se va hacer siempre apuntando a la varaible que guarda lo jugadores segun la cantidad de opciónes que permitimos que se muestre por los intentos ya hechos */}
                {visibleTeammates?.map((player, index) =>{ 
                    const names = player.name.split(" ").filter(Boolean); // Elimina espacios vacíos
                    let lastName;
                  
                    if (names.length >= 3) {
                      // Caso para 3+ palabras: toma las últimas 2 (ej: "Carlos Henrique Casimiro" -> "Henrique Casimiro")
                      lastName = `${names[names.length - 2]} ${names[names.length - 1]}`;
                    } else if (names.length === 2) {
                      // Caso para 2 palabras: toma la segunda (ej: "Neymar Jr" -> "Jr")
                      lastName = names[1];
                    } else {
                      // Caso para 1 palabra: toma la única (ej: "Marcelo" -> "Marcelo")
                      lastName = names[0];
                    }

                return(
                    <div key={player.id} className="flex flex-col justify-center items-center py-4">
                     {/* ////////////////////// */}
                     <div className="w-[70px] h-[70px] md:w-24 md:h-24 lg:w-28 lg:h-28 [perspective:600px]">
                        <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
                          flippedCards.includes(index) ? '[transform:rotateY(180deg)]' : ''
                        }`}>

                          {/* Frente - Número */}
                          <div className="absolute w-full h-full [backface-visibility:hidden]  flex items-center justify-center border-[#0DD0F7] border rounded-md">
                            <span className="text-5xl font-bold text-[#0DD0F7]">{index + 1}</span>
                          </div>


                          {/* Reverso - Jugador */}
                          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <div className={`aspect-square overflow-hidden rounded-md bg-[#0F344B] border-[#0DD0F7]  border`}>
                              <img
                                src={player.imageUrl}
                                alt={lastName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                           <h3 className="text-white text-center font-normal text-base pt-1">{lastName}</h3> 
                          </div>


                          {/* /////////////// */}
                        </div>
                      </div>
                    
                    </div>
                )})}


              </div>
             
             {/* Aca hacemos otra verificación por bloques, en la cual el estado de este se guia según cada ejecutción por el buscador que se hace,de losnombre si no es correcto se muestran estas respuestas. */}
               {gameResult === "correct" ? (
                //Esta opción ya is la pega de una ya va colocar el banner verde pro encima y no va a mostrar el buscador.
                <div className="bg-green-900/30 border border-green-700 p-4 rounded-md mb-4">
                  <p className="text-green-400 text-center">Correcto! El jugador misterioso es {mockGameData?.mysteryPlayer.name}.</p>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-[#F2B705] text-black rounded-md border-2 border-[#F2B705] font-medium text-base p-2"
                      onClick={handleStartGame}
                    >
                      Seguir Jugando
                    </button>
                  </div>
                </div>
                // esta es una condición que se activa cuando se envia por el buscador una respuesta incorrecta y ya se quedo sin opciónes
              ) : gameResult === "incorrect" && gameEnded ? (
                //Aparte del tecto este va a mostrar on mini banner rojo y no va a mostar el buscador ya.
                <div className="bg-red-900/30 border border-red-700 p-4 rounded-md mb-4">
                  <p className="text-red-400 text-center">
                    Incorrecto! El jugador misterioso es {mockGameData?.mysteryPlayer.name}.
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-[#F2B705] text-black rounded-md border-2 border-[#F2B705] font-semibold text-base p-2"
                      onClick={handleStartGame}
                    >
                      Volver a Jugar
                    </button>
                  </div>
                </div>
              ) : (
                //Si toda via no se queda sin opciónes y no adivina sigue la opción para colocar las opciónes
                <div className="flex items-center max-w-lg mx-auto gap-2">
                <SearchBarPayer
                 handleChange={handleChange}
                 handleOptionClick={handleOptionClick}
                 filteredOptions={filteredOptions}
                 handleGuess={handleGuess}
                 guessInput={guessInput}/>

                  {!gameEnded && (
                    <button 
                    className="inline-flex items-center py-2.5 px-3 text-base font-medium rounded-md bg-[#F2B705] text-black border-2 border-[#F2B705]"
                     onClick={handleGuess}>
                        <svg  xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"  fill="currentColor"  className="w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z" /><path d="M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" /></svg>
                    </button>
                  )}
                </div>

              )}
              {/* esta es la verifiación de si la respues es incorrecta pero toda via quedan opciónes pendientes. */}
                {showIncorrectMessage && gameResult === "incorrect" && !gameEnded &&(
                <p className={`text-red-400 text-center mt-4 `}>
                  Incorrecto! El jugador no es {playerSelect == "" ? "ese" : playerSelect }.
                </p>
              )}

             </div>
            </div>
        )}

      </div>
      <ModalStatistics 
      handleClick={handleClick}
      userLevel={userLevel} 
      maxSuccessStreack={maxSuccessStreak} 
      successStreak= {successStreak}
      isOpenStatistics = {isOpenStatistics}
      />
     </div>
    )
}