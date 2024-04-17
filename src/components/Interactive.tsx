import { FC } from "react";

import Art from "./interactives/Art";
import Games from "./interactives/Games/Games";
import Lol from "./interactives/Lol";
import Music from "./interactives/Music/Music";
import News from "./interactives/News";
import Science from "./interactives/Science";
import Stonks from "./interactives/Stonks/Stonks";

interface InteractiveProps {
  subredditName: string
}

const Interactive: FC<InteractiveProps> = ({ subredditName }) => {

  const renderInteractiveComponent = () => {
    switch (subredditName) {
      case "art":
        return <Art />;
      case "games":
        return <Games />;
      case "lol":
        return <Lol />;
      case "music":
        return <Music />;
      case "news":
        return <News />;
      case "science":
        return <Science />;
      case "stonks":
        return <Stonks />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderInteractiveComponent()}
    </div>
  );
}

export default Interactive