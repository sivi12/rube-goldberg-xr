import axios from "axios";

const handleLedClick = async () => {
  try {
    await axios.post("https://192.168.1.136:5001/api/light");
    alert("Lampe wurde eingeschaltet!");
  } catch (error) {
    console.error("Fehler beim Senden der Nachricht:", error);
    alert("Fehler beim Senden der Nachricht");
  }
};

export default handleLedClick;
