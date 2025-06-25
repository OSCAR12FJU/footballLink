interface SearchBarPayerProps{
    guessInput: string; 
    filteredOptions: string[]; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOptionClick: (option:string) => void;
    handleGuess: () => void;
}


export function SearchBarPayer({ filteredOptions,guessInput, handleChange, handleOptionClick, handleGuess}: SearchBarPayerProps){
    return(
    <div className="relative w-full transition-all duration-500">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="w-6 h-6 text-gray-500  hover:text-gray-900 "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" /><path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" /></svg>
      </div>
      <input 
      type="text" 
      value={guessInput}
      onChange={(e) => handleChange(e)}
      onTouchStart={(e) => {
      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });}}
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

    </div>
    )
}