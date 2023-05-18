import React from 'react';
import FotoFetched from '../content/fotosList/FotoFetched';
import "./main.css";
import Weather from '../content/weatherCiti/Weather';
const Main = (props) => {
    let selectedBook = props.selectedPage;

    let componentToDisplay;
  
    switch (selectedBook) {
      case "Unsplash":
        componentToDisplay = <FotoFetched />
        break;
      case "Weather":
        componentToDisplay = <Weather />
        break;
      default:
        componentToDisplay = null;
    }
  return <div className="main_info">{componentToDisplay}</div>;
}
export default Main;