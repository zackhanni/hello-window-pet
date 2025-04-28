// components/GenerateAnimalPDF.tsx
"use client";

import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Button } from "./ui/button";

interface Animal {
  id: string;
  name: string;
  city: string;
  photoUrl: string;
  species: string;
}

interface Props {
  animal: Animal;
}

export const GeneratePDF = ({ animal }: Props) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    const { id, name, city, photoUrl, species } = animal;

    // Generate QR code as a base64 image
    const qrCodeDataURL = await QRCode.toDataURL(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/cats/${id}`
    );

    console.log("TEST URL: ", qrCodeDataURL);

    // Add Animal Info
    doc.setFontSize(28);
    doc.text(`This is ${name}, a ${species} from ${city}.`, 20, 20);
    doc.setFontSize(20);
    doc.text(`Have you seen this cat?`, 20, 30);
    doc.text(`Use the QR code below to let it's owner know its ok!`, 20, 40);

    doc.text(`You can see other photos people have taken too!`, 20, 50);

    // Add QR Code Image
    doc.addImage(qrCodeDataURL, "PNG", 20, 50, 100, 100);

    // Save the PDF
    doc.save(`${animal.name}-do_you_see_my_cat.pdf`);
  };

  return <Button onClick={generatePDF}>Generate QR code PDF</Button>;
};
