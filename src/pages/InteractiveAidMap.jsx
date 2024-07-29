import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  head: "For head injuries, keep the person still. If there's bleeding, apply gentle pressure with a clean cloth. Do not remove any object that's penetrating the skull.",
  chest: "For chest pain, help the person sit in a comfortable position and loosen tight clothing. If you suspect a heart attack, call emergency services immediately.",
  abdomen: "For abdominal pain, help the person lie down with knees bent. Do not give anything to eat or drink. If you suspect appendicitis, do not apply heat to the area.",
  leftArm: "For arm injuries, immobilize the arm using a sling or splint. Apply cold packs to reduce swelling. If you suspect a fracture, do not attempt to straighten the arm.",
  rightArm: "For arm injuries, immobilize the arm using a sling or splint. Apply cold packs to reduce swelling. If you suspect a fracture, do not attempt to straighten the arm.",
  leftLeg: "For leg injuries, help the person lie down and elevate the injured leg. Apply cold packs to reduce swelling. If you suspect a fracture, do not attempt to straighten the leg.",
  rightLeg: "For leg injuries, help the person lie down and elevate the injured leg. Apply cold packs to reduce swelling. If you suspect a fracture, do not attempt to straighten the leg.",
};

const InteractiveAidMap = () => {
  const [selectedPart, setSelectedPart] = useState(null);

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
              className="absolute w-12 h-12 rounded-full"
              style={{ top: part.top, left: part.left }}
              onClick={() => setSelectedPart(part.id)}
            >
              {part.name}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aid Suggestions for {part.name}</DialogTitle>
            </DialogHeader>
            <p>{aidSuggestions[part.id]}</p>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default InteractiveAidMap;