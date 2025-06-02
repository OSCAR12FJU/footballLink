export default function Footer(){
 return(
    <footer className="bg-[#040f1a] border-t border-gray-800 py-8 mt-auto">
      <div className="container-futbol">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <h2 className="flex items-center text-xl font-bold">
                <span className="spanFutbol">FUTBOL</span>
                <span className="span11">11</span>
              </h2>
            </div>

            <p className="text-gray-400 text-sm">
              Futbol11 is a popular website where football fans can play football games daily.
              <br /><br />
              Futbol11 uses images of football players and teams for identification purposes, but does not possess any ownership rights over them.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-futbolGold text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="/futbol11" className="text-gray-300 hover:text-white">Futbol11</a>
              <a href="/futbol-grid" className="text-gray-300 hover:text-white">Futbol Grid</a>
              <a href="/futbol11-bingo" className="text-gray-300 hover:text-white">Futbol Bingo</a>
              <a href="/futbol11-clubs" className="text-gray-300 hover:text-white">Futbol11 Clubs</a>
              <a href="/privacypolicy" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="/settings" className="text-gray-300 hover:text-white">Settings</a>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-futbolGold text-lg font-semibold mb-4">Social Media Links</h3>
            <div className="social-icons mb-4">
              <a href="https://www.facebook.com/futbol11game/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/futbol11_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com/Futbol11game" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://www.tiktok.com/@futbol11daily" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="https://www.youtube.com/@futbol11daily" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://discord.gg/BEQVcxq6qb" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <i className="bi bi-discord"></i>
              </a>
            </div>
            <p className="text-gray-300">
              <strong className="text-futbolGold">Email:</strong> futbol11game@gmail.com
            </p>
          </div>
          
        </div>
      </div>

    </footer>

 )
}