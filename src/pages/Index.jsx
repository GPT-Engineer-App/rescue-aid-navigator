import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import InteractiveAidMap from "./InteractiveAidMap";
import { Phone, VolumeX, Volume2 } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    emergencyType: "",
    contactNumber: "",
  });
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound preference from localStorage
    const soundPreference = localStorage.getItem("soundEnabled");
    if (soundPreference !== null) {
      setIsSoundEnabled(JSON.parse(soundPreference));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const playSound = () => {
    if (isSoundEnabled) {
      const audio = new Audio("/button-click.mp3");
      audio.play();
    }
  };

  const handleEmergencyCall = () => {
    playSound();
    toast("Calling emergency services...");
  };

  const toggleSound = () => {
    const newSoundState = !isSoundEnabled;
    setIsSoundEnabled(newSoundState);
    localStorage.setItem("soundEnabled", JSON.stringify(newSoundState));
    toast(newSoundState ? "Sound enabled" : "Sound disabled");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-10"
        variant="outline"
      >
        {isSoundEnabled ? <Volume2 /> : <VolumeX />}
      </Button>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Emergency Services</h2>
        <p className="mb-4 text-lg">
          Quickly provide essential information for emergency services.
        </p>
        <form className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-lg">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-lg p-3"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-lg">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Your Current Location"
              value={formData.location}
              onChange={handleInputChange}
              className="text-lg p-3"
            />
          </div>
          <div>
            <Label htmlFor="emergencyType" className="text-lg">Type of Emergency</Label>
            <Input
              id="emergencyType"
              name="emergencyType"
              placeholder="Describe the Emergency"
              value={formData.emergencyType}
              onChange={handleInputChange}
              className="text-lg p-3"
            />
          </div>
          <div>
            <Label htmlFor="contactNumber" className="text-lg">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="Your Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="text-lg p-3"
            />
          </div>
          <Button onClick={handleEmergencyCall} className="w-full text-xl py-6 bg-red-600 hover:bg-red-700">
            <Phone className="mr-2 h-6 w-6" /> Call Emergency Services
          </Button>
        </form>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Interactive Aid Suggestions</h2>
        <p className="mb-4 text-lg">
          Click on a body part to receive specific aid suggestions.
        </p>
        <InteractiveAidMap playSound={playSound} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Best Practice Aid Information</h2>
        <p className="mb-4 text-lg">
          Access quick guides for common emergency situations. Click on a topic to view details.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="cpr">
            <AccordionTrigger className="text-xl" onClick={playSound}>CPR</AccordionTrigger>
            <AccordionContent className="text-lg">
              Basic steps for CPR: Check for responsiveness, call for help, start chest compressions, give rescue breaths if trained.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="burn-treatment">
            <AccordionTrigger className="text-xl" onClick={playSound}>Burn Treatment</AccordionTrigger>
            <AccordionContent className="text-lg">
              For minor burns: Cool the burn with running water, cover with a clean, dry dressing. For severe burns, seek immediate medical attention.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="choking">
            <AccordionTrigger className="text-xl" onClick={playSound}>Choking</AccordionTrigger>
            <AccordionContent className="text-lg">
              Perform abdominal thrusts (Heimlich maneuver) for a conscious person who's choking. For an unconscious person, start CPR.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Medical Library</h2>
        <p className="mb-4 text-lg">
          Access our comprehensive medical library for detailed information on various treatments and conditions.
        </p>
        <Link to="/medical-library">
          <Button className="text-xl py-6" onClick={playSound}>Go to Medical Library</Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;