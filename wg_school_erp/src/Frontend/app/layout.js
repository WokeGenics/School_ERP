// app/layout.js
import './globals.css';
import LoginPage from "../app/login/page"
import Header from './Header/header';

export default async function RootLayout({ children }) {
let i =true;

    if (i !== true) {
        return (
            <html>
                <head></head>
                <body>
                   <LoginPage/>
                </body>
            </html>
        );
    } else {
    return (
        <html>
            <head></head>
          
            <body className='bg-orange-500'>  <Header />
                <div className='cont'>{children}</div> </body>
        </html>
    );
  }
}
