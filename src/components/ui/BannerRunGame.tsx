interface BannerRunGameProps{
    flyer_welcome:string;
    handleStartGame:() => void;
}

export function BannerRunGame({flyer_welcome, handleStartGame}:BannerRunGameProps){
    return(
    <div className="max-w-3xl mx-auto bg-[#081828] border-2 border-[#F2B705] rounded-md p-4 md:p-8 mt-8 ">
      <h1 className="gameTitlee">
        <span className="font-bold text-[#F2B705]">FUTBOL</span>
        <span className="span11">11</span> LINK
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-x-6 gap-y-4">
        <div className="">
          <img src={flyer_welcome} alt="start game" className="w-full h-full object-contain rounded-md"/>
        </div>
        <div className="">
            <p className="gameInfoText">
            ⚽ <strong>¡Futbol Link te reta!</strong> Adivina quién es el jugador misterioso que ha compartido equipo con los cinco compañeros que se mostrarán.
            <br /><br />
             ✅ ¡Si adivinas correctamente en cualquier momento, ganas!
            <br /><br />
            🕹️ Tenes 5 oportunidades para adivinar el jugador oculto.
             </p>
            <button 
             className="font-semibold px-3 py-2 rounded-md text-black bg-[#F2B705] mt-4"
             onClick={handleStartGame}>
             Comenzar
             </button>
        </div>
      </div>

    </div>
    )
}