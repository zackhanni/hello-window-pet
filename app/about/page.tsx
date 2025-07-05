import { Button } from "@/components/ui/button";
import { Heart, Cat, Users, Camera, Shield } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="flex flex-col items-center justify-items-center p-8 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] items-center sm:items-start max-w-4xl">
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center sm:text-left">
                        About Window Pets
                    </h1>

                    <div className="flex flex-col gap-8 border-4 border-secondary rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Cat className="h-6 w-6" />
                                Our Story
                            </h2>
                            <p className="text-base leading-relaxed">
                                Window Pets was inspired by a simple desire: to share pictures of cats around the city
                                with their owners and to be able to check in on how my own cats are doing while I&apos;m away.
                                We believe every window pet deserves to be seen and appreciated by their community.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Camera className="h-6 w-6" />
                                What We Do
                            </h2>
                            <p className="text-base leading-relaxed">
                                Our platform connects pet lovers with the adorable window pets in their neighborhood.
                                Share photos of cats you spot in windows, or let others see your own pets through
                                your window. It&apos;s a community-driven way to celebrate the pets that brighten our days.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Users className="h-6 w-6" />
                                Current Status
                            </h2>
                            <p className="text-base leading-relaxed">
                                This app is still in progress and we&apos;re constantly working to make it better.
                                We love hearing from our community and welcome any feedback to help improve the experience
                                for everyone.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Heart className="h-6 w-6" />
                                Support Our Mission
                            </h2>
                            <p className="text-base leading-relaxed">
                                If you like this website, please consider donating to help keep it running.
                                Any excess money raised goes to local animal shelters for animals in need.
                                Your support helps both the platform and pets in your community.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Shield className="h-6 w-6" />
                                Privacy & Safety
                            </h2>
                            <p className="text-base leading-relaxed">
                                We&apos;re committed to protecting the privacy of both pets and their owners.
                                All photos are shared with consent, and we have strict guidelines to ensure
                                the safety and well-being of all animals featured on our platform.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <Link href="/" className="w-full sm:w-auto">
                            <Button variant="secondary" className="w-full">
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/pets" className="w-full sm:w-auto">
                            <Button variant="accent" className="w-full">
                                See All Pets <Cat className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
