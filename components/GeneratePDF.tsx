"use client";

import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Button } from "./ui/button";

export const GeneratePDF = ({ pet }: { pet: Pet }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const { id, name, imageUrl, species } = pet;

    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(26);
    doc.text(`Say Hello!`, pageWidth / 2, 30, { align: "center" });

    doc.setFontSize(16);
    doc.text(
      `This is ${name}, a ${species ?? "mystery creature"} who lives here`,
      pageWidth / 2,
      45,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.text(
      `Scan the QR code below to share a photo or see photos others took.`,
      pageWidth / 2,
      55,
      { align: "center" }
    );

    // Pet Image
    if (imageUrl) {
      try {
        const imageData = await fetch(
          `https://ik.imagekit.io/assortfit/${imageUrl}`
        )
          .then((res) => res.blob())
          .then((blob) => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          });

        doc.addImage(imageData, "JPEG", 55, 70, 100, 100);
      } catch (err) {
        console.error("Failed to load pet image", err);
      }
    }

    // QR Code
    try {
      const qrCodeDataURL = await QRCode.toDataURL(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/pets/${id}`
      );
      doc.addImage(qrCodeDataURL, "PNG", 80, 180, 50, 50);
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }

    doc.save(`${name}-do_you_see_my_cat.pdf`);
  };

  return (
    <Button variant={"outline"} onClick={generatePDF}>
      Generate QR code PDF
    </Button>
  );
};
