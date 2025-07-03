import React, {useEffect, useState } from "react"
// import {AdvPlayers, footballPlayers } from "../../data/dataPlayer";
import playerIncong from "../../../public/file/player_incong.png"
import flyer_welcome from "../../../public/file/flyer_welcome.png"
import { BannerRunGame } from "../ui/BannerRunGame";
import { generateRound, type GameRound } from "../../utils/gameService";
import { SearchBarPayer } from "../ui/SearchBarPlayer";
import { ModalStatistics } from "../ui/ModalStatistics";
import { createAdvPlayers, fetchAllPlayers, playerNames, type GameData } from "../../data/dataPlayer";
// import { mockGameData } from "../../data/dataPlayer";

export default function SoccerGame(){

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const [gameStarted, setGameStarted] = useState(false);
    //Es el estado que maneja la condición y refrencia de las opciónes visibles de jugadores.
    const [visibleTeammatesCount, setVisibleTeammatesCount] = useState(1);
    const [mockGameData, setMockGameData] = useState<GameRound>();
    const [guessInput, setGuessInput] = useState("");
    const [gameResult, setGameResult] = useState<"correct" | "incorrect" | null>(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
    const [isOpenStatistics, setIsOpenStatistics] = useState(false);
    const [playerSelect, setPlayerSelect] = useState("");
    // const [currentRound, setCurrentRound] = useState<number>(1);
    // const [roundsCompleted, setRoundCompleted] = useState<number>(0);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

    //Store de jugadores

    // const [players, setPlayers] = useState<FootballPlayer[]>([]);
    const [games, setGames] = useState<GameData[]>([])    
    //Filtrar jugadores repetidos
    const [usedMysteryPlayers, setUsedMysteryPlayers] = useState<string[]>([]);
    
    //Estados para el conteó de las rachas
    const [successStreak, setSuccessStreak] = useState(0); // racha actual
    const [maxSuccessStreak, setMaxSuccessStreak] = useState(0); // racha máxima
    
    //Manejo de renderizado
    const [hasLoadedStreak, setHasLoadedStreak] = useState(false);
    //Manejo de renderizado de Nivel
    const [userLevel, setUserLevel] = useState<number>(1);
    // const [hasLoadedLevel, setHasLoadedLevel] = useState(false);

    //Vamos a crear configuración de localstorage
    useEffect(() =>{
      const stored = localStorage.getItem("mySuccessStreak");
      const parsed = Number(stored)
      if(!isNaN(parsed)){
        setMaxSuccessStreak(Number(parsed))
      }
      setHasLoadedStreak(true);
    },[]);

    useEffect(() =>{
      if(hasLoadedStreak){
        localStorage.setItem("mySuccessStreak", maxSuccessStreak.toString());
      }
    }, [maxSuccessStreak, hasLoadedStreak]);

    //Vamos a crear configuración de localstorage para el nivel
    useEffect(() =>{
      const storedLevel = localStorage.getItem("myUserLevel");
      const parsedLevel = Number(storedLevel)
      if(!isNaN(parsedLevel)){
        setUserLevel(Number(parsedLevel))
      }
      // setHasLoadedLevel(true);
    },[]);

    // useEffect(() =>{
    //   if(hasLoadedLevel){
    //     localStorage.setItem("myUserLevel", userLevel.toString());
    //   }
    // }, [userLevel, hasLoadedLevel]);

    // const MAX_ROUNDS_PER_LEVEL = 2
    //Función que arranca el jeugo y me genera el personaje aelejir y las opciónes
    // const getRandomGameData = () =>{
    //   const randomIndex = Math.floor(Math.random() * AdvPlayers.length);
    //   return AdvPlayers[randomIndex]
    // }
    //Destructuacion del tipo de jugador
    // console.log("ronda:",currentRound);

    useEffect(() =>{
      fetchAllPlayers().then(allPlayers =>{
        setGames(createAdvPlayers(allPlayers));
      })
    },[]);

    // if(usedMysteryPlayers.length >= AdvPlayers.length){
    //   setUsedMysteryPlayers([]);
    // }
   
      const handleStartGame = () => {      
      if (games.length === 0) return; // por si todavía no se cargaron los juegos

      const allMysteryNames = games.map(game => game.mysteryPlayer.name);

      // Si ya usamos todos los jugadores, reiniciamos
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
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const value = e.target.value;
      setGuessInput(value);
      
        if(value === ""){
          setFilteredOptions([]);
          return
        }
        //centrar cuando se escriba
        if (value){
         e.target.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        const normalize = (str: string) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const filtered = playerNames
          .filter((player) => normalize(player).includes(normalize(value)))
          .map((player) => player);

        setFilteredOptions(filtered);
        
    }


    const handleSkip = () =>{
        //Hago la verificación para que lo visibles siempre sean menores que el 
        if (!mockGameData) return ; // o un loading, fallback, etc.

        const newIndex = visibleTeammatesCount;
        setVisibleTeammatesCount(prev => prev + 1 );

        setFlippedCards(prev => [...prev,newIndex]);

    if(mockGameData && visibleTeammatesCount === mockGameData.teammates.length - 1){
            setGameResult("incorrect");
            setGameEnded(true);
            setVisibleTeammatesCount(mockGameData.teammates.length);
            setFlippedCards(Array.from({length: mockGameData.teammates.length}, (_,i) => i));
        }
    };

    const handleClick = () =>{
      setIsOpenStatistics(prev => !prev)
    }

    //Comprobación de contenido del buscador (input)
    const handleGuess = () =>{
        //En estas 2 lineas tomamos lo nombre de los jugadores, uno desde el bsucador y otro desde la data guardada en la que bsucamos adaptar el texto para que sea tranquilamente legible y guardamos en variable separada
        if (!mockGameData) return null; // o un loading, fallback, etc.
        //Descencriptaciòn de texto
        const normalize = (str: string) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const normalizedGuess = normalize(guessInput.trim());
        const normalizedAnswer = normalize(mockGameData.mysteryPlayer.name);

        //Comparamos los 2 texto por separado que están guardados por  variable.
        if(normalizedGuess === normalizedAnswer){
            //Si coincide enviamos al estado la opción
            // const newRoundCompleted = roundsCompleted + 1;
            const newStreak = successStreak + 1;

            setGameResult("correct");
            setFlippedCards(Array.from({length: visibleTeammatesCount}, (_, i) => i));
            setShowIncorrectMessage(false);
            ///////////////////////////////
            // setRoundCompleted(newRoundCompleted);
            setSuccessStreak(newStreak);
            setMaxSuccessStreak(max => newStreak > max ? newStreak : max);


            // if(roundsCompleted + 1 >= MAX_ROUNDS_PER_LEVEL){
            //   setUserLevel(prev => {
            //     const newLevel = prev + 1;
            //     alert(`¡Nivel ${newLevel} desbloqueado!`)
            //     return newLevel
            //   });
            //   setRoundCompleted(0);
            // }
            // setCurrentRound(prev => prev + 1);
        }else{
            //Si no coincide enviamos eso
            setGameResult("incorrect");
            setShowIncorrectMessage(true);
            setPlayerSelect(guessInput)
            setGuessInput("")

            setSuccessStreak(0);
            //Aca a dentro enviamos otra condición viendo de que si el estado de la cantidad de opciónes mostradas toda via no se completa seguimos con el flujo.
            if(gameEnded){
                setVisibleTeammatesCount(mockGameData.teammates.length);

            }else{
                //Si toda via el estado de opciónes max alcanzada, ejecutamos la función para que se muestren otras opciónes.
                handleSkip();
            }
        }
    };
    //En esta variable guardamos el numero de ociónes de datos completos que queremos que se muestren el cual este se  maneja por el estado que tiene el indice de las opciones pendientes que quedan por mostrar, osea no se muestran todas al mismo tiempo sino una por vez, si toda via no se adivina al jugador.
    // const visibleTeammates = mockGameData?.teammates.slice(0, visibleTeammatesCount);
    const visibleTeammates = mockGameData?.teammates || [];
    const isFlipped = gameResult === "correct" || gameEnded;


    let lastNameMistery = "";


    if (mockGameData?.mysteryPlayer?.name) {
      const nameMistery = mockGameData.mysteryPlayer.name
        .split(" ")
        .filter(Boolean); // elimina espacios vacíos

      if (nameMistery.length >= 3) {
        lastNameMistery = `${nameMistery[nameMistery.length - 2]} ${nameMistery[nameMistery.length - 1]}`;
      } else if (nameMistery.length === 2) {
        lastNameMistery = nameMistery[1];
      } else {
        lastNameMistery = nameMistery[0];
      }
    }

    //Función de selección
    const handleOptionClick= (option:string) =>{
      setGuessInput(option);
      setFilteredOptions([]);
    };


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