import { Fab, getClient, Webchat, WebchatProvider } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";
import botImg from "../../assets/images/genie.png";
import "../../styles/pages/_chat-bot.scss";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#1F2937",
});

const configuration = {
    botName: "InfoGenie",
    botAvatar: botImg,
    botDescription: "Welcome InfoGenie, your book ninja! It’ll silently slice through your questions like a stealthy samurai in a sea of pages!",
    composerPlaceholder: "Got a question? I’m all ears!"
};
const clientId = "815528f3-d7a9-4b60-b52e-80c15d9fc65a";

export default function ChatBot() {
  const client = getClient({ clientId });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div className={`chat-bot ${isChatOpen? 'is-open': ''}`}>
      <style>{style}</style>

      <WebchatProvider
        theme={theme}
        client={client}
        isTyping={true}
        configuration={configuration}
        allowFileUpload={true}
        closeWindow={toggleWebchat}
      >

        <div className="fab">
            <Fab onClick={toggleWebchat} />
        </div>

        <div className="bot-webchat">
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
}