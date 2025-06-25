interface ModalStatisticsProps{
    userLevel: number;
    maxSuccessStreack: number;
    successStreak: number;
    isOpenStatistics: boolean;
    handleClick: () => void;
}

export function ModalStatistics({userLevel, maxSuccessStreack, successStreak, isOpenStatistics, handleClick}:ModalStatisticsProps){
    return(
    <div className={`${isOpenStatistics ? 'flex': 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-xl shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex justify-center items-center w-full">
                <h3 className="text-2xl font-semibold text-gray-900 uppercase">
                  Estadisticas
                </h3>

              </div>
               <button 
               type="button" 
               className="bg-red-600 text-white rounded-full flex justify-center items-center z-10 p-2"
               onClick={handleClick}>
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 14"
                >
                    <path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                </svg>
                <span className="sr-only">Close modal</span>
               </button>
            </div>
            <div className="flex flex-col justify-center items-center ">
                <p className="text-2xl gametitlee font-bold text-gray-900 mb-2">Nivel {userLevel}</p>
                <ul>
                    <li className="flex items-center justify-center"><h4 className="text-base text-gray-800 font-medium">Mejor racha consecutiva:</h4><span className="text-sm text-gray-500 px-1">............................</span><p className="text-base text-gray-800 font-normal">{maxSuccessStreack}</p></li>
                    <li className="flex items-center justify-center"><h4 className="text-base text-gray-800 font-medium">Racha actual consecutiva:</h4><span className="text-sm text-gray-500 px-1">............................</span><p className="text-base text-gray-800 font-normal">{successStreak}</p></li>
                </ul>
            </div>

            {/* <div className="flex justify-center mt-4">
                    <button
                      className="bg-[#F2B705] text-black rounded-md border-2 border-[#F2B705] font-medium text-base p-2">
                      Seguir Jugando
                    </button>
                  </div> */}

        </div>
    </div>
</div>

    )

}