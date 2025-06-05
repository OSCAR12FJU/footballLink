import type React from "react";
// import Header from "./Header";

export default function MainLayout({children}: {children: React.ReactNode}){
    return(
        <div className="flex flex-col min-h-screen ">
          {/* <Header /> */}

          <main className="min-h-screen flex flex-col bg-[#010B13]">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
    )

}