import requests
from typing import Text, Dict, Any, List
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionGetLocasl(Action):
  def name(self) -> Text:
    return "action_get_local"

  async def run(self, dispatcher, tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
    url = "http://localhost:8080/locals/" + tracker.get_slot("location") 
    response = requests.get(url)
    local = response.json()
    dispatcher.utter_message(text="Você pode encontrar esse local em:")
    dispatcher.utter_message(text=local['name'])
    dispatcher.utter_message(text=local['mapsLink'])
    return []
