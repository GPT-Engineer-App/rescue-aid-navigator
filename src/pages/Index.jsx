import { useState } from "react";
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

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    emergencyType: "",
    contactNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmergencyCall = () => {
    toast("Calling emergency services...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Emergency Services</h2>
        <p className="mb-4">
          Use this section to quickly provide essential information for emergency services.
        </p>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Your Current Location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="emergencyType">Type of Emergency</Label>
            <Input
              id="emergencyType"
              name="emergencyType"
              placeholder="Describe the Emergency"
              value={formData.emergencyType}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="Your Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleEmergencyCall} className="w-full">
            Call Emergency Services
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Best Practice Aid Information</h2>
        <p className="mb-4">
          Access quick guides for common emergency situations. Click on a topic to view details.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="cpr">
            <AccordionTrigger>CPR</AccordionTrigger>
            <AccordionContent>
              Basic steps for CPR: Check for responsiveness, call for help, start chest compressions, give rescue breaths if trained.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="burn-treatment">
            <AccordionTrigger>Burn Treatment</AccordionTrigger>
            <AccordionContent>
              For minor burns: Cool the burn with running water, cover with a clean, dry dressing. For severe burns, seek immediate medical attention.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="choking">
            <AccordionTrigger>Choking</AccordionTrigger>
            <AccordionContent>
              Perform abdominal thrusts (Heimlich maneuver) for a conscious person who's choking. For an unconscious person, start CPR.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default Index;