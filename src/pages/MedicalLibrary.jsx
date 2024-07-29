import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const medicalTreatments = {
  "First Aid": [
    { name: "CPR", content: "Step 1: Check the scene for safety. Step 2: Check for responsiveness. Step 3: Call for help. Step 4: Open the airway. Step 5: Check for breathing. Step 6: Begin chest compressions. Step 7: Provide rescue breaths if trained." },
    { name: "Heimlich Maneuver", content: "Step 1: Stand behind the person. Step 2: Wrap your arms around their waist. Step 3: Make a fist with one hand. Step 4: Position it above the navel. Step 5: Grasp the fist with the other hand. Step 6: Press hard into the abdomen with quick, upward thrusts." },
    { name: "Treating Burns", content: "For minor burns: Cool the burn under cold running water for at least 10 minutes. Cover with a clean, dry dressing. For severe burns: Call emergency services immediately. Do not remove stuck clothing. Cover the burn with a clean, dry sheet or blanket." },
  ],
  "Common Illnesses": [
    { name: "Common Cold", content: "Rest, stay hydrated, use over-the-counter pain relievers, decongestants, and throat lozenges as needed. Seek medical attention if symptoms worsen or persist beyond 10 days." },
    { name: "Influenza", content: "Rest, stay hydrated, use over-the-counter pain relievers. Antiviral medications may be prescribed if caught early. Seek medical attention if symptoms are severe or you're at high risk for complications." },
    { name: "Gastroenteritis", content: "Rest, stay hydrated with clear fluids. Gradually introduce bland foods. Avoid dairy, caffeine, and fatty foods. Seek medical attention if unable to keep fluids down or symptoms persist beyond a few days." },
  ],
  "Chronic Conditions": [
    { name: "Diabetes Management", content: "Monitor blood sugar levels regularly. Take prescribed medications as directed. Follow a balanced diet. Exercise regularly. Check feet daily for cuts or sores. Have regular check-ups with your healthcare provider." },
    { name: "Hypertension Management", content: "Take blood pressure medications as prescribed. Reduce sodium intake. Maintain a healthy weight. Exercise regularly. Limit alcohol consumption. Manage stress. Have regular check-ups with your healthcare provider." },
    { name: "Asthma Management", content: "Take long-term control medications as prescribed. Use quick-relief inhaler when needed. Identify and avoid triggers. Follow your asthma action plan. Have regular check-ups with your healthcare provider." },
  ],
};

const MedicalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
      <h1 className="text-3xl font-bold mb-6">Medical Treatment Library</h1>
      <Input
        type="text"
        placeholder="Search treatments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(filteredTreatments).map(([category, treatments]) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {treatments.map((treatment) => (
                  <AccordionItem value={treatment.name} key={treatment.name}>
                    <AccordionTrigger>{treatment.name}</AccordionTrigger>
                    <AccordionContent>{treatment.content}</AccordionContent>
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
