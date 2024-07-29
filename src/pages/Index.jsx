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
import { Phone, VolumeX, Volume2, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const emergencyContacts = [
    { name: "Emergency Services", number: "911" },
    { name: "Poison Control", number: "1-800-222-1222" },
    { name: "Local Police (non-emergency)", number: "123-456-7890" },
    { name: "Local Fire Department (non-emergency)", number: "098-765-4321" },
    { name: "Nearest Hospital", number: "555-123-4567" },
  ];

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

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
        <p className="mb-4 text-lg">
          Quick access to important emergency contact numbers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button className="w-full text-lg py-4" variant="outline" onClick={playSound}>
                  <PhoneCall className="mr-2 h-5 w-5" /> {contact.name}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{contact.name}</DialogTitle>
                </DialogHeader>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4">{contact.number}</p>
                  <Button onClick={() => {
                    playSound();
                    toast(`Calling ${contact.name}...`);
                  }}>
                    <Phone className="mr-2 h-5 w-5" /> Call Now
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
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
              <ol className="list-decimal list-inside">
                <li>Check the scene for safety</li>
                <li>Check for responsiveness</li>
                <li>Call for help or ask someone to call 911</li>
                <li>Open the airway</li>
                <li>Check for breathing</li>
                <li>Begin chest compressions:
                  <ul className="list-disc list-inside ml-4">
                    <li>Place hands in the center of the chest</li>
                    <li>Push hard and fast, at least 2 inches deep and 100-120 compressions per minute</li>
                    <li>Allow full chest recoil between compressions</li>
                  </ul>
                </li>
                <li>Provide rescue breaths if trained and willing</li>
                <li>Continue CPR until professional help arrives or the person shows signs of life</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="burn-treatment">
            <AccordionTrigger className="text-xl" onClick={playSound}>Burn Treatment</AccordionTrigger>
            <AccordionContent className="text-lg">
              <h4 className="font-bold mb-2">For minor burns:</h4>
              <ol className="list-decimal list-inside mb-4">
                <li>Cool the burn under cold running water for at least 10 minutes</li>
                <li>Remove any jewelry or tight items from the burned area before it swells</li>
                <li>Apply a clean, dry dressing to protect the burn</li>
                <li>Consider over-the-counter pain relievers if needed</li>
              </ol>
              <h4 className="font-bold mb-2">For severe burns:</h4>
              <ol className="list-decimal list-inside">
                <li>Call emergency services immediately</li>
                <li>Do not remove stuck clothing</li>
                <li>Cover the burn area with a clean, dry sheet or blanket</li>
                <li>Elevate the burned body part if possible</li>
                <li>Monitor for signs of shock</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="choking">
            <AccordionTrigger className="text-xl" onClick={playSound}>Choking</AccordionTrigger>
            <AccordionContent className="text-lg">
              <h4 className="font-bold mb-2">For a conscious person who's choking:</h4>
              <ol className="list-decimal list-inside mb-4">
                <li>Encourage them to cough</li>
                <li>If coughing doesn't work, perform abdominal thrusts (Heimlich maneuver):
                  <ul className="list-disc list-inside ml-4">
                    <li>Stand behind the person and wrap your arms around their waist</li>
                    <li>Make a fist with one hand and place it just above the navel</li>
                    <li>Grasp your fist with the other hand and pull inward and upward</li>
                    <li>Perform quick, forceful thrusts until the object is expelled or the person becomes unconscious</li>
                  </ul>
                </li>
              </ol>
              <h4 className="font-bold mb-2">For an unconscious person:</h4>
              <ol className="list-decimal list-inside">
                <li>Call emergency services immediately</li>
                <li>Begin CPR, starting with chest compressions</li>
                <li>Before giving rescue breaths, look in the mouth for the obstructing object</li>
                <li>If you see the object, remove it with your fingers</li>
                <li>Continue CPR until professional help arrives or the person starts breathing on their own</li>
              </ol>
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