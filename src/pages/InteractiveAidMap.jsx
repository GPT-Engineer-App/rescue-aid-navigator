import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const bodyParts = [
  { id: "head", name: "Head", top: "5%", left: "50%" },
  { id: "chest", name: "Chest", top: "25%", left: "50%" },
  { id: "abdomen", name: "Abdomen", top: "40%", left: "50%" },
  { id: "leftArm", name: "Left Arm", top: "30%", left: "30%" },
  { id: "rightArm", name: "Right Arm", top: "30%", left: "70%" },
  { id: "leftLeg", name: "Left Leg", top: "70%", left: "40%" },
  { id: "rightLeg", name: "Right Leg", top: "70%", left: "60%" },
];

const aidSuggestions = {
  head: {
    "Concussion": "1. Keep the person awake and lying down. 2. Apply cold pack to swelling areas. 3. Monitor for vomiting, seizures, or loss of consciousness. 4. Seek immediate medical attention.",
    "Severe Bleeding": "1. Apply direct pressure with a clean cloth. 2. If blood soaks through, add more cloth without removing the first layer. 3. Elevate the head if possible. 4. Call emergency services immediately.",
    "Eye Injury": "1. Do not rub or apply pressure to the eye. 2. For chemical exposure, flush with water for 15 minutes. 3. For cuts, cover the eye with a rigid shield without applying pressure. 4. Seek immediate medical attention."
  },
  chest: {
    "Heart Attack": "1. Call emergency services immediately. 2. Help the person sit or lie in a comfortable position. 3. Loosen tight clothing. 4. If the person is not allergic to aspirin and it's readily available, give them one adult aspirin to chew and swallow.",
    "Choking": "1. Encourage coughing. 2. If coughing is ineffective, perform abdominal thrusts (Heimlich maneuver). 3. If the person becomes unconscious, begin CPR. 4. Call emergency services if the obstruction is not cleared quickly.",
    "Pneumothorax": "1. Call emergency services immediately. 2. Help the person into a comfortable position, usually sitting up. 3. Do not give them anything to eat or drink. 4. Monitor breathing and consciousness until help arrives."
  },
  abdomen: {
    "Appendicitis": "1. Do not give the person anything to eat or drink. 2. Do not apply heat to the area. 3. Help them lie down with knees bent towards the chest if this relieves pain. 4. Seek immediate medical attention.",
    "Internal Bleeding": "1. Call emergency services immediately. 2. Help the person lie flat. 3. Keep them warm with a blanket. 4. Do not give them anything to eat or drink.",
    "Severe Abdominal Pain": "1. Help the person find a comfortable position. 2. Do not give them anything to eat or drink. 3. Note the location and nature of the pain. 4. Seek medical attention promptly."
  },
  leftArm: {
    "Fracture": "1. Do not attempt to straighten the arm. 2. Immobilize the injury using a splint or sling. 3. Apply cold packs to reduce swelling. 4. Seek immediate medical attention.",
    "Severe Bleeding": "1. Apply direct pressure with a clean cloth. 2. Elevate the arm above the heart if possible. 3. If blood soaks through, add more cloth without removing the first layer. 4. Call emergency services.",
    "Burns": "1. Run cool (not cold) water over the burn for at least 10 minutes. 2. Remove any jewelry or tight items from the burned area. 3. Cover with a clean, dry dressing. 4. For severe burns, call emergency services immediately."
  },
  rightArm: {
    "Fracture": "1. Do not attempt to straighten the arm. 2. Immobilize the injury using a splint or sling. 3. Apply cold packs to reduce swelling. 4. Seek immediate medical attention.",
    "Severe Bleeding": "1. Apply direct pressure with a clean cloth. 2. Elevate the arm above the heart if possible. 3. If blood soaks through, add more cloth without removing the first layer. 4. Call emergency services.",
    "Burns": "1. Run cool (not cold) water over the burn for at least 10 minutes. 2. Remove any jewelry or tight items from the burned area. 3. Cover with a clean, dry dressing. 4. For severe burns, call emergency services immediately."
  },
  leftLeg: {
    "Fracture": "1. Do not attempt to straighten the leg. 2. Immobilize the injury using a splint if available. 3. Apply cold packs to reduce swelling. 4. Seek immediate medical attention.",
    "Severe Bleeding": "1. Apply direct pressure with a clean cloth. 2. Elevate the leg above the heart if possible. 3. If blood soaks through, add more cloth without removing the first layer. 4. Call emergency services.",
    "Sprain": "1. Rest the injured area. 2. Apply ice for 20 minutes at a time. 3. Compress the area with an elastic bandage. 4. Elevate the leg above the heart. 5. Seek medical attention if pain is severe or persists."
  },
  rightLeg: {
    "Fracture": "1. Do not attempt to straighten the leg. 2. Immobilize the injury using a splint if available. 3. Apply cold packs to reduce swelling. 4. Seek immediate medical attention.",
    "Severe Bleeding": "1. Apply direct pressure with a clean cloth. 2. Elevate the leg above the heart if possible. 3. If blood soaks through, add more cloth without removing the first layer. 4. Call emergency services.",
    "Sprain": "1. Rest the injured area. 2. Apply ice for 20 minutes at a time. 3. Compress the area with an elastic bandage. 4. Elevate the leg above the heart. 5. Seek medical attention if pain is severe or persists."
  },
};

const InteractiveAidMap = ({ playSound }) => {
  const [selectedPart, setSelectedPart] = useState(null);

  const handlePartClick = (partId) => {
    setSelectedPart(partId);
    playSound();
  };

  return (
    <div className="relative w-full h-[500px] border border-gray-300 rounded-lg">
      <img
        src="/human-body-outline.png"
        alt="Human body outline"
        className="w-full h-full object-contain"
      />
      {bodyParts.map((part) => (
        <Dialog key={part.id}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute w-16 h-16 rounded-full text-lg font-bold"
              style={{ top: part.top, left: part.left }}
              onClick={() => handlePartClick(part.id)}
            >
              {part.name}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">{part.name} Aid Suggestions</DialogTitle>
            </DialogHeader>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(aidSuggestions[part.id]).map(([condition, steps]) => (
                <AccordionItem value={condition} key={condition}>
                  <AccordionTrigger>{condition}</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal list-inside">
                      {steps.split(". ").map((step, index) => (
                        <li key={index} className="mb-2">{step}</li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default InteractiveAidMap;