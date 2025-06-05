import React, { useState } from "react"
import { AdvPlayers, footballPlayers, type GameData } from "../../data/dataPlayer";
import playerIncong from "../../../public/file/player_incong.png"
// import { mockGameData } from "../../data/dataPlayer";

export default function SoccerGame(){

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const [gameStarted, setGameStarted] = useState(false);
    //Es el estado que maneja la condición y refrencia de las opciónes visibles de jugadores.
    const [visibleTeammatesCount, setVisibleTeammatesCount] = useState(1);
    
    const [mockGameData, setMockGameData] = useState<GameData>();

    const [guessInput, setGuessInput] = useState("");
    const [gameResult, setGameResult] = useState<"correct" | "incorrect" | null>(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);

    //Logica para el input
    // const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);


    const getRandomGameData = () =>{
      const randomIndex = Math.floor(Math.random() * AdvPlayers.length);
      return AdvPlayers[randomIndex]
    }
 
    const handleStartGame = () =>{      
        const randomPlayer = getRandomGameData();
        setMockGameData(randomPlayer);
        setGameStarted(true);
        setVisibleTeammatesCount(1);
        setGuessInput("");
        setGameResult(null);
        setGameEnded(false);

        setFlippedCards([0]);
    }

    //Función para dar reversa la card
    // const handleReveal = (index: number) => {
    //   if (!flippedCards.includes(index)) {
    //     setFlippedCards([...flippedCards, index]);
    //   }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const value = e.target.value;
      setGuessInput(value);

      
        if(value === ""){
          setFilteredOptions([]);
          return
        }

        const filtered = footballPlayers
        .filter((player) => player.name.toLowerCase().includes(value.toLowerCase()))
        .map((player) => player.name);
        
        setFilteredOptions(filtered)

    }


    const handleSkip = () =>{
        //Hago la verificación para que lo visibles siempre sean menores que el 
        if (!mockGameData) return ; // o un loading, fallback, etc.

        const newIndex = visibleTeammatesCount;
        setVisibleTeammatesCount(prev => prev + 1 );
        // if(visibleTeammatesCount < mockGameData.teammates.length){
        //     setVisibleTeammatesCount(visibleTeammatesCount + 1)
        // }
        setFlippedCards(prev => [...prev,newIndex]);
        //Condiciónal para cuando ya las opciónes de cards mostradas sea la misma de las opciónes el juego se corte.
        // if(newCount === mockGameData.teammates.length){
        //   setGameEnded(true);
        // }

      //   if (visibleTeammatesCount + 1 === mockGameData.teammates.length) {
      //     setGameEnded(true);
      // }
        if(visibleTeammatesCount === mockGameData.teammates.length - 1){
            setGameResult("incorrect");
            setGameEnded(true);
            setVisibleTeammatesCount(mockGameData.teammates.length);
            setFlippedCards(Array.from({length: mockGameData.teammates.length}, (_,i) => i));
        }
    };

    //Comprobación de contenido del buscador (input)
    const handleGuess = () =>{
        //En estas 2 lineas tomamos lo nombre de los jugadores, uno desde el bsucador y otro desde la data guardada en la que bsucamos adaptar el texto para que sea tranquilamente legible y guardamos en variable separada
        if (!mockGameData) return null; // o un loading, fallback, etc.

        const normalizedGuess = guessInput.trim().toLowerCase();
        const normalizedAnswer = mockGameData.mysteryPlayer.name.toLowerCase();

        //Comparamos los 2 texto por separado que están guardados por  variable.
        if(normalizedGuess === normalizedAnswer){
            //Si coincide enviamos al estado la opción
            setGameResult("correct");
            setFlippedCards(Array.from({length: visibleTeammatesCount}, (_, i) => i));
            setShowIncorrectMessage(false);
        }else{
            //Si no coincide enviamos eso
            setGameResult("incorrect");
            setShowIncorrectMessage(true);
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
    const visibleTeammates = mockGameData?.teammates;
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
            <div className="max-w-3xl mx-auto bg-[#081828] border border-gray-800 rounded-md p-4 md:p-8 mt-8">
              <h1 className="gameTitlee">
                <span className="spanFutbol">FUTBOL</span>
                <span className="span11">11</span> LINK
              </h1>

              <div className="gameInfoInside">
                <div className="">
                  <p className="gameInfoText">
                    Futbol Link challenges you to guess the mysterious player who has played with all five teammates shown.
                    <br /><br />
                    The game starts by revealing one player, and you can guess or skip to see more teammates. If your guess is correct, you win!
                    <br /><br />
                    Once all five teammates are revealed, you'll have one final chance to guess.
                    <br /><br />
                    
                    {/* al presionar este boton, vamos activar la función para que este nos cambie el estado y este bloque de codigo no se muestre */}
                    <button
                        className="searchButton startGame"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                  </p>
                </div>
              </div>

            </div>

        ) : (
            <div className="max-w-2xl md:max-w-4xl mx-auto p-4 md:p-8">
               {/* <h1 className="gameTitlee">
                <span className="spanFutbol">FUTBOL</span>
                <span className="span11">11</span> LINK
              </h1> */}
    <div className="mb-8">
      <div className="flex flex-col justify-center items-center py-4 ">
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
                     
                     {/* <div className="aspect-square overflow-hidden rounded-md bg-[#0F344B] border-[#0DD0F7] border mb-2 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32">

                      <img
                       src={player.imageUrl}
                       alt={lastName}
                       className="h-full w-full object-cover" />  
                     </div>
                     <h3 className="text-white text-center text-base font-medium">{lastName}</h3> */}
                    </div>
                )})}


              </div>
             
             {/* Aca hacemos otra verificación por bloques, en la cual el estado de este se guia según cada ejecutción por el buscador que se hace,de losnombre si no es correcto se muestran estas respuestas. */}
              {gameResult === "correct" ? (
                //Esta opción ya is la pega de una ya va colocar el banner verde pro encima y no va a mostrar el buscador.
                <div className="bg-green-900/30 border border-green-700 p-4 rounded-md mb-4">
                  <p className="text-green-400 text-center">Correct! The mystery player is {mockGameData?.mysteryPlayer.name}.</p>
                  <div className="flex justify-center mt-4">
                    <button
                      className="searchButton startGame"
                      onClick={handleStartGame}
                    >
                      Play Again
                    </button>
                  </div>
                </div>
                // esta es una condición que se activa cuando se envia por el buscador una respuesta incorrecta y ya se quedo sin opciónes
              ) : gameResult === "incorrect" && gameEnded ? (
                //Aparte del tecto este va a mostrar on mini banner rojo y no va a mostar el buscador ya.
                <div className="bg-red-900/30 border border-red-700 p-4 rounded-md mb-4">
                  <p className="text-red-400 text-center">
                    Incorrect! The mystery player was {mockGameData?.mysteryPlayer.name}.
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      className="searchButton startGame"
                      //cuando ya se queda sin opciones se puede reiniciar el juego. Ejecutando la misma función que usamos para arrancar el juego.
                      onClick={handleStartGame}
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              ) : (
                //Si toda via no se queda sin opciónes y no adivina sigue la opción para colocar las opciónes
                <div className="flex items-center max-w-lg mx-auto gap-2">
                  {/* <input
                    type="text"
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder="Enter player name..."
                    className="flex-1 px-4 py-2 rounded-md bg-[#0d2137] border border-gray-700 text-white"
                  />
                  <button
                    className="searchButton"
                    onClick={handleGuess}
                  >
                    Guess
                  </button> */}

                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        {/* <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                        </svg> */}
                        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="w-6 h-6 text-gray-500  hover:text-gray-900 "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" /><path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" /></svg>
                    </div>
                    <input 
                    type="text" 
                    value={guessInput}
                    onChange={(e) => handleChange(e)}
                    onFocus={(e) => {
                    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  }}
                    onKeyDown={(e) =>{
                      if(e.key === "Enter") handleGuess();
                    }}
                    placeholder="Escribi el nombre del jugador..."
                    className="bg-[#babecf] border-2 border-white text-[#010b13] text-base rounded-md  block w-full ps-10 p-2.5 placeholder:text-base placeholder:text-gray-500 focus:outline-none" 
                     required />
                    {filteredOptions.length >0 && (
                       <ul className="absolute mt-1 w-full bg-[#babecf] border-2 text-black border-white rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                        {filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 text-base hover:bg-gray-100 cursor-pointer border-b border-white"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* <button 
                    type="button" 
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                    onClick={handleGuess}>
 
                    </button> */}
                </div>

                  {!gameEnded && (
                    // <button
                    //   className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
                    //   onClick={handleSkip}
                      
                    // >
                    //   Skip
                    // </button>
                    <button 
                    className="inline-flex items-center py-2.5 px-3 text-base font-medium rounded-md bg-[#F2B705] text-black border-2 border-[#F2B705]"
                     onClick={handleSkip}>
                        {/* <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className=""><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg> */}
                        <svg  xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"  fill="currentColor"  className="w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z" /><path d="M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" /></svg>
                    </button>
                  )}
                </div>

              )}
              {/* esta es la verifiación de si la respues es incorrecta pero toda via quedan opciónes pendientes. */}
                {showIncorrectMessage && gameResult === "incorrect" && !gameEnded &&(
                <p className={`text-red-400 text-center mt-4 ${guessInput === "" ? "hidden": "block"}`}>
                  Incorrecto! El jugador no es {guessInput == "" ? "ese" : guessInput }.
                </p>
              )}

             </div>
            </div>
        )}

      </div>
     </div>
    )
}