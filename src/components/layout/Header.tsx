export default function Header(){
    return(
      <header className="bg-[#040f1a] border-b border-gray-800">
        <div className="py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <button className="text-white text-2xl" aria-label="Stats">
                  <i className="bi bi-info-circle"></i>
                </button>
                <button className="text-white text-2xl" aria-label="Chart">
                  <i className="bi bi-bar-chart-line"></i>
                </button>
                </div>

                <a href="/" className="flex items-center">
                  <h1 className="flex items-center text-xl md:text-2xl font-bold">
                    <span className="">FUTBOL</span>
                    <span className="">11</span>
                  </h1>
                </a>

                <div className="flex items-center space-x-4">
                  <a  href="#" className="text-white text-xl">ig</a>
                  <a  href="#" className="text-white text-xl">twi</a>
                </div>
            </div>
        </div>
      </header>
    )

}