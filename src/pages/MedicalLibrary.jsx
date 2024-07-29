import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VolumeX, Volume2 } from "lucide-react";
import { toast } from "sonner";

const medicalTreatments = {
  "First Aid": [
    { name: "CPR", content: "Step 1: Check the scene for safety. Step 2: Check for responsiveness. Step 3: Call for help. Step 4: Open the airway. Step 5: Check for breathing. Step 6: Begin chest compressions. Step 7: Provide rescue breaths if trained." },
    { name: "Heimlich Maneuver", content: "Step 1: Stand behind the person. Step 2: Wrap your arms around their waist. Step 3: Make a fist with one hand. Step 4: Position it above the navel. Step 5: Grasp the fist with the other hand. Step 6: Press hard into the abdomen with quick, upward thrusts." },
    { name: "Treating Burns", content: "For minor burns: Cool the burn under cold running water for at least 10 minutes. Cover with a clean, dry dressing. For severe burns: Call emergency services immediately. Do not remove stuck clothing. Cover the burn with a clean, dry sheet or blanket." },
    { name: "Controlling Bleeding", content: "Step 1: Apply direct pressure with a clean cloth. Step 2: Elevate the injured area above the heart if possible. Step 3: If blood soaks through, add more cloth without removing the first layer. Step 4: For severe bleeding, call emergency services immediately." },
    { name: "Treating Shock", content: "Step 1: Have the person lie down on their back with feet elevated. Step 2: Keep the person warm and comfortable. Step 3: Loosen tight clothing. Step 4: Do not give anything to eat or drink. Step 5: Call emergency services." },
  ],
  "Common Illnesses": [
    { name: "Common Cold", content: "Rest, stay hydrated, use over-the-counter pain relievers, decongestants, and throat lozenges as needed. Seek medical attention if symptoms worsen or persist beyond 10 days." },
    { name: "Influenza", content: "Rest, stay hydrated, use over-the-counter pain relievers. Antiviral medications may be prescribed if caught early. Seek medical attention if symptoms are severe or you're at high risk for complications." },
    { name: "Gastroenteritis", content: "Rest, stay hydrated with clear fluids. Gradually introduce bland foods. Avoid dairy, caffeine, and fatty foods. Seek medical attention if unable to keep fluids down or symptoms persist beyond a few days." },
    { name: "Migraine", content: "Rest in a quiet, dark room. Apply cold or warm compresses to your head or neck. Take over-the-counter pain relievers. Stay hydrated. Consider prescription medications if migraines are frequent or severe." },
    { name: "Allergic Reactions", content: "For mild reactions, take an antihistamine. For severe reactions (anaphylaxis), use an epinephrine auto-injector if available and seek emergency medical help immediately." },
  ],
  "Chronic Conditions": [
    { name: "Diabetes Management", content: "Monitor blood sugar levels regularly. Take prescribed medications as directed. Follow a balanced diet. Exercise regularly. Check feet daily for cuts or sores. Have regular check-ups with your healthcare provider." },
    { name: "Hypertension Management", content: "Take blood pressure medications as prescribed. Reduce sodium intake. Maintain a healthy weight. Exercise regularly. Limit alcohol consumption. Manage stress. Have regular check-ups with your healthcare provider." },
    { name: "Asthma Management", content: "Take long-term control medications as prescribed. Use quick-relief inhaler when needed. Identify and avoid triggers. Follow your asthma action plan. Have regular check-ups with your healthcare provider." },
    { name: "Arthritis Management", content: "Take medications as prescribed. Engage in low-impact exercises. Use hot or cold therapy for pain relief. Maintain a healthy weight. Consider physical therapy. Consult with your healthcare provider regularly." },
    { name: "Heart Disease Management", content: "Take medications as prescribed. Follow a heart-healthy diet. Exercise regularly as advised by your doctor. Manage stress. Monitor blood pressure and cholesterol. Attend all scheduled check-ups." },
  ],
  "Emergency Procedures": [
    { name: "Stroke Response", content: "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Note the time symptoms started. Do not give the person anything to eat or drink." },
    { name: "Heart Attack Response", content: "Call emergency services immediately. Help the person sit or lie comfortably. Loosen tight clothing. If not allergic and if available, give one adult aspirin to chew. Be prepared to perform CPR if needed." },
    { name: "Seizure Management", content: "Clear the area around the person. Do not restrain them or put anything in their mouth. Time the seizure. After the seizure, help them onto their side. Stay with them until they are fully alert." },
    { name: "Severe Allergic Reaction", content: "Use an epinephrine auto-injector if available. Call emergency services. Help the person lie flat and elevate their legs. If they vomit, turn them on their side. Monitor their breathing and pulse." },
    { name: "Poisoning", content: "Call poison control or emergency services immediately. Do not induce vomiting unless instructed by a professional. If possible, keep a sample of the poison or the container to show emergency responders." },
  ],
};

const MedicalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound preference from localStorage
    const soundPreference = localStorage.getItem("soundEnabled");
    if (soundPreference !== null) {
      setIsSoundEnabled(JSON.parse(soundPreference));
    }
  }, []);

  const playSound = () => {
    if (isSoundEnabled) {
      const audio = new Audio("/button-click.mp3");
      audio.play();
    }
  };

  const toggleSound = () => {
    const newSoundState = !isSoundEnabled;
    setIsSoundEnabled(newSoundState);
    localStorage.setItem("soundEnabled", JSON.stringify(newSoundState));
    toast(newSoundState ? "Sound enabled" : "Sound disabled");
  };

  const filteredTreatments = Object.entries(medicalTreatments).reduce((acc, [category, treatments]) => {
    const filteredCategory = treatments.filter(treatment =>
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCategory.length > 0) {
      acc[category] = filteredCategory;
    }
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-10"
        variant="outline"
      >
        {isSoundEnabled ? <Volume2 /> : <VolumeX />}
      </Button>

      <h1 className="text-4xl font-bold mb-6">Medical Treatment Library</h1>
      <Input
        type="text"
        placeholder="Search treatments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 text-lg p-3"
      />
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(filteredTreatments).map(([category, treatments]) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger className="text-2xl" onClick={playSound}>{category}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {treatments.map((treatment) => (
                  <AccordionItem value={treatment.name} key={treatment.name}>
                    <AccordionTrigger className="text-xl" onClick={playSound}>{treatment.name}</AccordionTrigger>
                    <AccordionContent className="text-lg">{treatment.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MedicalLibrary;