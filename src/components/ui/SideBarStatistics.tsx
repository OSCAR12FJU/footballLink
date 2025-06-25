interface SideBarStatisticsProps{
    maxSuccessStreak: number,
    successStreak: number
}

export function SideBarStatistics({successStreak, maxSuccessStreak}: SideBarStatisticsProps){
    console.log(maxSuccessStreak, successStreak);
    return(
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">

            {/* //boton para cerra */}
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Approaching Full Capacity</h3>

                <h4></h4>
                {/* <p className="text-gray-500 dark:text-gray-400 mb-6">Choosing the right server storage solution is essential for maintaining data integrity.<p> */}

                <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                    <button data-modal-hide="progress-modal" type="button" className="text-white bg-blue-700 ">Upgrade to PRO</button>
                    <button data-modal-hide="progress-modal" type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    )
}